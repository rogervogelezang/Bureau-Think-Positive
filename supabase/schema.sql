-- Bureau Think Positive — ouderportaal schema
-- How to run: Supabase dashboard > SQL Editor > New query > paste this
-- whole file > Run. Safe to re-run (uses "if not exists" / "drop ... if
-- exists" throughout).
--
-- Scope note: full client dossiers (zorgplan, rapportages, etc.) already
-- live in ONS — this schema is deliberately NOT a dossier replacement.
-- It only covers the practical, day-to-day layer the portal adds on top:
-- a 0-100 voortgangsscore, a doelen tracker, an agenda (individual +
-- group sessions), and broadcast updates.
--
-- Two account types share the same auth.users table:
--   - "ouder": no extra row anywhere — just an auth user, linked to a
--     kinderen row via kinderen.ouder_id once a trajectleider connects them.
--   - "trajectleider": a row in the trajectleiders table below. Its mere
--     existence is the role marker (same pattern as the sibling
--     datafacilitator project's `admins` table / `is_admin()` function).
--     is_coordinator=true trajectleiders (e.g. Roger) can see/manage every
--     gezin; regular trajectleiders only see gezinnen assigned to them.
--
-- Bootstrapping the first coordinator: every other trajectleider account
-- gets created through the in-app invite flow at /portaal/team/beheer, but
-- that page itself is coordinator-only, so the very first one has to be
-- created by hand, once, after running this file:
--   1. Supabase dashboard > Authentication > Users > Invite user, using
--      info@bureauthinkpositive.com (double-check this is the right
--      address before sending the invite).
--   2. Table Editor > trajectleiders > Insert row: id = the new user's id
--      (copy it from the Users list), naam = e.g. "Roger Vogelezang",
--      is_coordinator = true.
-- From then on, this account can invite every other trajectleider/
-- coordinator via /portaal/team/beheer — no more manual steps needed.

create extension if not exists pgcrypto;

-- ============================================================
-- Roles
-- ============================================================

create table if not exists trajectleiders (
  id uuid primary key references auth.users(id) on delete cascade,
  naam text not null,
  is_coordinator boolean not null default false,
  created_at timestamptz not null default now()
);
alter table trajectleiders enable row level security;

-- SECURITY DEFINER so these can be called from any authenticated user's own
-- session (including inside other tables' RLS policies) without needing a
-- select policy on trajectleiders that would otherwise be circular.
create or replace function public.is_trajectleider(check_user_id uuid default auth.uid())
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (select 1 from trajectleiders where id = check_user_id);
$$;

create or replace function public.is_coordinator(check_user_id uuid default auth.uid())
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (select 1 from trajectleiders where id = check_user_id and is_coordinator);
$$;

-- Lets a trajectleider look up an ouder account by exact email (to link it
-- to a kind) without ever handing the caller a bulk user listing. Gated to
-- staff only, and returns nothing beyond the single matching id — a much
-- narrower exposure than admin.auth.admin.listUsers(), which would dump up
-- to 1000 platform accounts (emails + ids) into any trajectleider's hands.
create or replace function public.find_ouder_id_by_email(email_input text)
returns uuid
language plpgsql
security definer set search_path = public
stable
as $$
begin
  if not is_trajectleider() then
    return null;
  end if;
  return (select id from auth.users where lower(email) = lower(email_input) limit 1);
end;
$$;

drop policy if exists "trajectleiders can view own row, coordinators view all" on trajectleiders;
create policy "trajectleiders can view own row, coordinators view all" on trajectleiders
  for select using (auth.uid() = id or is_coordinator());

-- Only coordinators can edit trajectleider rows (e.g. toggling
-- is_coordinator on someone else). Inserts happen server-side via the
-- service role key from the invite flow (app/portaal/team/beheer/actions.ts),
-- which bypasses RLS entirely, so no insert policy is needed here.
drop policy if exists "coordinators can update trajectleiders" on trajectleiders;
create policy "coordinators can update trajectleiders" on trajectleiders
  for update using (is_coordinator()) with check (is_coordinator());

-- ============================================================
-- Kinderen (the minimal per-child link — not a dossier)
-- ============================================================

create table if not exists kinderen (
  id uuid primary key default gen_random_uuid(),
  naam text not null,
  ouder_id uuid references auth.users(id) on delete set null,
  -- Deliberately NOT "on delete cascade": deleting a trajectleider's login
  -- must never silently delete the gezinnen/kinderen data they managed.
  -- Postgres's default (no action) blocks the delete until a coordinator
  -- reassigns those kinderen to someone else — see deleteTrajectleiderAction
  -- in app/portaal/team/beheer/actions.ts.
  trajectleider_id uuid not null references auth.users(id),
  voortgang_score integer check (voortgang_score between 0 and 100),
  created_at timestamptz not null default now()
);
alter table kinderen enable row level security;
create index if not exists kinderen_ouder_id_idx on kinderen(ouder_id);
create index if not exists kinderen_trajectleider_id_idx on kinderen(trajectleider_id);

drop policy if exists "ouders, eigen trajectleider en coordinatoren kunnen kinderen zien" on kinderen;
create policy "ouders, eigen trajectleider en coordinatoren kunnen kinderen zien" on kinderen
  for select using (
    auth.uid() = ouder_id or auth.uid() = trajectleider_id or is_coordinator()
  );

drop policy if exists "trajectleiders kunnen eigen kinderen aanmaken" on kinderen;
create policy "trajectleiders kunnen eigen kinderen aanmaken" on kinderen
  for insert with check (
    is_trajectleider() and (trajectleider_id = auth.uid() or is_coordinator())
  );

-- The with-check's is_trajectleider(trajectleider_id) guards against ever
-- reassigning a kind to a user id that isn't a real trajectleider (e.g. an
-- ouder's own id) — without it, that account's auth.uid() would start
-- matching trajectleider_id = auth.uid() on this and every child table's
-- policies, silently granting it staff-level access to that one gezin.
drop policy if exists "trajectleiders en coordinatoren kunnen kinderen bewerken" on kinderen;
create policy "trajectleiders en coordinatoren kunnen kinderen bewerken" on kinderen
  for update using (auth.uid() = trajectleider_id or is_coordinator())
  with check ((auth.uid() = trajectleider_id or is_coordinator()) and is_trajectleider(trajectleider_id));

drop policy if exists "coordinatoren kunnen kinderen verwijderen" on kinderen;
create policy "coordinatoren kunnen kinderen verwijderen" on kinderen
  for delete using (is_coordinator());

-- ============================================================
-- Voortgangsscore geschiedenis
-- ============================================================
-- kinderen.voortgang_score is a denormalized "latest value" for cheap
-- reads; every change goes through this history table and the trigger
-- below keeps the two in sync, so there's always an audit trail of who
-- set what score and when (and an optional toelichting).

create table if not exists voortgang_scores (
  id uuid primary key default gen_random_uuid(),
  kind_id uuid not null references kinderen(id) on delete cascade,
  score integer not null check (score between 0 and 100),
  toelichting text,
  trajectleider_id uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);
alter table voortgang_scores enable row level security;
create index if not exists voortgang_scores_kind_id_idx on voortgang_scores(kind_id);

create or replace function public.sync_kind_voortgang_score()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  update kinderen set voortgang_score = new.score where id = new.kind_id;
  return new;
end;
$$;

drop trigger if exists on_voortgang_score_insert on voortgang_scores;
create trigger on_voortgang_score_insert
  after insert on voortgang_scores
  for each row execute function public.sync_kind_voortgang_score();

drop policy if exists "betrokkenen kunnen voortgangsscores zien" on voortgang_scores;
create policy "betrokkenen kunnen voortgangsscores zien" on voortgang_scores
  for select using (
    exists (
      select 1 from kinderen
      where kinderen.id = voortgang_scores.kind_id
        and (kinderen.ouder_id = auth.uid() or kinderen.trajectleider_id = auth.uid())
    ) or is_coordinator()
  );

drop policy if exists "eigen trajectleider en coordinatoren kunnen score toevoegen" on voortgang_scores;
create policy "eigen trajectleider en coordinatoren kunnen score toevoegen" on voortgang_scores
  for insert with check (
    trajectleider_id = auth.uid()
    and exists (
      select 1 from kinderen
      where kinderen.id = kind_id
        and (kinderen.trajectleider_id = auth.uid() or is_coordinator())
    )
  );

-- ============================================================
-- Doelen
-- ============================================================

create table if not exists doelen (
  id uuid primary key default gen_random_uuid(),
  kind_id uuid not null references kinderen(id) on delete cascade,
  titel text not null,
  status text not null default 'open' check (status in ('open', 'bezig', 'behaald')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table doelen enable row level security;
create index if not exists doelen_kind_id_idx on doelen(kind_id);

drop policy if exists "betrokkenen kunnen doelen zien" on doelen;
create policy "betrokkenen kunnen doelen zien" on doelen
  for select using (
    exists (
      select 1 from kinderen
      where kinderen.id = doelen.kind_id
        and (kinderen.ouder_id = auth.uid() or kinderen.trajectleider_id = auth.uid())
    ) or is_coordinator()
  );

drop policy if exists "eigen trajectleider en coordinatoren beheren doelen" on doelen;
create policy "eigen trajectleider en coordinatoren beheren doelen" on doelen
  for all using (
    exists (
      select 1 from kinderen
      where kinderen.id = doelen.kind_id
        and (kinderen.trajectleider_id = auth.uid() or is_coordinator())
    )
  ) with check (
    exists (
      select 1 from kinderen
      where kinderen.id = kind_id
        and (kinderen.trajectleider_id = auth.uid() or is_coordinator())
    )
  );

-- ============================================================
-- Agenda (individuele afspraken + midweek/weekend groepsbegeleiding)
-- ============================================================

create table if not exists agenda_items (
  id uuid primary key default gen_random_uuid(),
  titel text not null,
  type text not null check (type in ('individueel', 'midweek_groep', 'weekend_groep')),
  start_at timestamptz not null,
  end_at timestamptz,
  beschrijving text,
  trajectleider_id uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);
alter table agenda_items enable row level security;
create index if not exists agenda_items_start_at_idx on agenda_items(start_at);

-- Which gezinnen (kinderen) see a given agenda item. An "individueel" item
-- has exactly one row; a "_groep" item can have several — set by the
-- trajectleider via the AudiencePicker when creating the item.
create table if not exists agenda_deelnemers (
  agenda_item_id uuid not null references agenda_items(id) on delete cascade,
  kind_id uuid not null references kinderen(id) on delete cascade,
  primary key (agenda_item_id, kind_id)
);
alter table agenda_deelnemers enable row level security;
create index if not exists agenda_deelnemers_kind_id_idx on agenda_deelnemers(kind_id);

drop policy if exists "eigen trajectleider en coordinatoren zien agenda items" on agenda_items;
create policy "eigen trajectleider en coordinatoren zien agenda items" on agenda_items
  for select using (trajectleider_id = auth.uid() or is_coordinator());

drop policy if exists "ouders zien agenda items van hun kind" on agenda_items;
create policy "ouders zien agenda items van hun kind" on agenda_items
  for select using (
    exists (
      select 1 from agenda_deelnemers
      join kinderen on kinderen.id = agenda_deelnemers.kind_id
      where agenda_deelnemers.agenda_item_id = agenda_items.id
        and kinderen.ouder_id = auth.uid()
    )
  );

drop policy if exists "trajectleiders maken agenda items aan" on agenda_items;
create policy "trajectleiders maken agenda items aan" on agenda_items
  for insert with check (is_trajectleider() and trajectleider_id = auth.uid());

drop policy if exists "eigenaar en coordinatoren bewerken agenda items" on agenda_items;
create policy "eigenaar en coordinatoren bewerken agenda items" on agenda_items
  for update using (trajectleider_id = auth.uid() or is_coordinator())
  with check (trajectleider_id = auth.uid() or is_coordinator());

drop policy if exists "eigenaar en coordinatoren verwijderen agenda items" on agenda_items;
create policy "eigenaar en coordinatoren verwijderen agenda items" on agenda_items
  for delete using (trajectleider_id = auth.uid() or is_coordinator());

drop policy if exists "betrokkenen zien deelnemers" on agenda_deelnemers;
create policy "betrokkenen zien deelnemers" on agenda_deelnemers
  for select using (
    exists (
      select 1 from kinderen
      where kinderen.id = agenda_deelnemers.kind_id
        and (kinderen.ouder_id = auth.uid() or kinderen.trajectleider_id = auth.uid())
    )
    or is_coordinator()
    or exists (
      select 1 from agenda_items
      where agenda_items.id = agenda_deelnemers.agenda_item_id
        and agenda_items.trajectleider_id = auth.uid()
    )
  );

-- Both the agenda item AND the kind being attached to it must belong to
-- the caller (or a coordinator) — checking only the agenda item would let
-- a trajectleider attach a kind_id they don't manage (any guessable UUID)
-- to their own item, leaking that unrelated gezin's pairing to its real
-- ouder/trajectleider via the "betrokkenen zien deelnemers" select policy.
drop policy if exists "eigenaar van agenda item beheert deelnemers" on agenda_deelnemers;
create policy "eigenaar van agenda item beheert deelnemers" on agenda_deelnemers
  for all using (
    exists (
      select 1 from agenda_items
      where agenda_items.id = agenda_deelnemers.agenda_item_id
        and (agenda_items.trajectleider_id = auth.uid() or is_coordinator())
    )
    and exists (
      select 1 from kinderen
      where kinderen.id = agenda_deelnemers.kind_id
        and (kinderen.trajectleider_id = auth.uid() or is_coordinator())
    )
  ) with check (
    exists (
      select 1 from agenda_items
      where agenda_items.id = agenda_item_id
        and (agenda_items.trajectleider_id = auth.uid() or is_coordinator())
    )
    and exists (
      select 1 from kinderen
      where kinderen.id = kind_id
        and (kinderen.trajectleider_id = auth.uid() or is_coordinator())
    )
  );

-- ============================================================
-- Updates (broadcast berichten)
-- ============================================================

create table if not exists updates (
  id uuid primary key default gen_random_uuid(),
  titel text not null,
  bericht text not null,
  trajectleider_id uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);
alter table updates enable row level security;
create index if not exists updates_created_at_idx on updates(created_at desc);

-- Same targeting pattern as agenda_deelnemers, reused for consistency.
create table if not exists update_ontvangers (
  update_id uuid not null references updates(id) on delete cascade,
  kind_id uuid not null references kinderen(id) on delete cascade,
  primary key (update_id, kind_id)
);
alter table update_ontvangers enable row level security;
create index if not exists update_ontvangers_kind_id_idx on update_ontvangers(kind_id);

drop policy if exists "eigen trajectleider en coordinatoren zien updates" on updates;
create policy "eigen trajectleider en coordinatoren zien updates" on updates
  for select using (trajectleider_id = auth.uid() or is_coordinator());

drop policy if exists "ouders zien updates gericht aan hun kind" on updates;
create policy "ouders zien updates gericht aan hun kind" on updates
  for select using (
    exists (
      select 1 from update_ontvangers
      join kinderen on kinderen.id = update_ontvangers.kind_id
      where update_ontvangers.update_id = updates.id
        and kinderen.ouder_id = auth.uid()
    )
  );

drop policy if exists "trajectleiders maken updates aan" on updates;
create policy "trajectleiders maken updates aan" on updates
  for insert with check (is_trajectleider() and trajectleider_id = auth.uid());

drop policy if exists "eigenaar en coordinatoren beheren updates" on updates;
create policy "eigenaar en coordinatoren beheren updates" on updates
  for update using (trajectleider_id = auth.uid() or is_coordinator())
  with check (trajectleider_id = auth.uid() or is_coordinator());

drop policy if exists "eigenaar en coordinatoren verwijderen updates" on updates;
create policy "eigenaar en coordinatoren verwijderen updates" on updates
  for delete using (trajectleider_id = auth.uid() or is_coordinator());

drop policy if exists "betrokkenen zien update ontvangers" on update_ontvangers;
create policy "betrokkenen zien update ontvangers" on update_ontvangers
  for select using (
    exists (
      select 1 from kinderen
      where kinderen.id = update_ontvangers.kind_id
        and (kinderen.ouder_id = auth.uid() or kinderen.trajectleider_id = auth.uid())
    )
    or is_coordinator()
    or exists (
      select 1 from updates
      where updates.id = update_ontvangers.update_id
        and updates.trajectleider_id = auth.uid()
    )
  );

-- Same reasoning as agenda_deelnemers above: both the update AND the kind
-- being targeted must belong to the caller (or a coordinator).
drop policy if exists "eigenaar van update beheert ontvangers" on update_ontvangers;
create policy "eigenaar van update beheert ontvangers" on update_ontvangers
  for all using (
    exists (
      select 1 from updates
      where updates.id = update_ontvangers.update_id
        and (updates.trajectleider_id = auth.uid() or is_coordinator())
    )
    and exists (
      select 1 from kinderen
      where kinderen.id = update_ontvangers.kind_id
        and (kinderen.trajectleider_id = auth.uid() or is_coordinator())
    )
  ) with check (
    exists (
      select 1 from updates
      where updates.id = update_id
        and (updates.trajectleider_id = auth.uid() or is_coordinator())
    )
    and exists (
      select 1 from kinderen
      where kinderen.id = kind_id
        and (kinderen.trajectleider_id = auth.uid() or is_coordinator())
    )
  );
