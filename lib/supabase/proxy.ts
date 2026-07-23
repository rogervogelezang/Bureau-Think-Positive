import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const OUDER_PROTECTED_PREFIXES = ["/portaal/dashboard"];
const OUDER_AUTH_PAGES = ["/portaal/login", "/portaal/registreren"];

// Staff area — separate namespace, separate login/redirect targets. Only
// checks "is someone logged in" here; whether they're actually a
// trajectleider (vs. an ouder who wandered in) is checked per-page against
// the trajectleiders table, since that needs a DB query RLS already gates.
const TEAM_PROTECTED_PREFIXES = [
  "/portaal/team/dashboard",
  "/portaal/team/kinderen",
  "/portaal/team/agenda",
  "/portaal/team/updates",
  "/portaal/team/beheer",
];
const TEAM_AUTH_PAGES = ["/portaal/team/login"];

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  // The ouderportaal's Supabase project isn't provisioned in every
  // environment yet (see .env.local.example) — fall through instead of
  // crashing every single page on the site over an unconfigured portal.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Required: refreshes the session — skipping it causes intermittent logouts.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  if (!user && TEAM_PROTECTED_PREFIXES.some((prefix) => path.startsWith(prefix))) {
    const url = request.nextUrl.clone();
    url.pathname = "/portaal/team/login";
    return NextResponse.redirect(url);
  }

  if (!user && OUDER_PROTECTED_PREFIXES.some((prefix) => path.startsWith(prefix))) {
    const url = request.nextUrl.clone();
    url.pathname = "/portaal/login";
    return NextResponse.redirect(url);
  }

  if (user && TEAM_AUTH_PAGES.includes(path)) {
    const url = request.nextUrl.clone();
    url.pathname = "/portaal/team/dashboard";
    return NextResponse.redirect(url);
  }

  if (user && OUDER_AUTH_PAGES.includes(path)) {
    const url = request.nextUrl.clone();
    url.pathname = "/portaal/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}
