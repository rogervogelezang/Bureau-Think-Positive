import { NextResponse } from "next/server";
import path from "path";
import { getPayloadClient } from "@/lib/payload";
import { dienstenContent as dienstenContentNl } from "@/lib/dienstenContent";
import { dienstenContent as dienstenContentEn } from "@/lib/dienstenContent.en";
import { doelgroepDetails as doelgroepDetailsNl } from "@/lib/doelgroepDetails";
import { doelgroepDetails as doelgroepDetailsEn } from "@/lib/doelgroepDetails.en";
import { mainNav as mainNavNl, diensten as dienstenNl, doelgroepen as doelgroepenNl } from "@/lib/nav";
import { mainNav as mainNavEn, diensten as dienstenEn, doelgroepen as doelgroepenEn } from "@/lib/nav.en";

// One-time Phase 1 content migration: reads the same hardcoded data the old
// static pages used to import and creates the matching Payload documents
// (both locales) via the Local API, so the CMS launches with the site's
// real content instead of empty collections. Meant to be hit once against a
// fresh database (including production's, once its Postgres is
// provisioned) — see the Phase 1 plan's "Migration" section. Guarded off in
// production so it can't be re-run by accident once real content exists.

function richText(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: paragraphs.map((text) => ({
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr" as const,
        children: [{ type: "text", detail: 0, format: 0, mode: "normal", style: "", text, version: 1 }],
      })),
    },
  };
}

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "disabled in production" }, { status: 403 });
  }

  const payload = await getPayloadClient();
  const publicDir = path.join(process.cwd(), "public");
  const log: string[] = [];

  // ---------------------------------------------------------------- Media
  const media: Record<string, number> = {};
  async function uploadMedia(key: string, relPath: string, altNl: string, altEn: string) {
    const doc = await payload.create({
      collection: "media",
      locale: "nl",
      data: { alt: altNl },
      filePath: path.join(publicDir, relPath),
    });
    await payload.update({ collection: "media", id: doc.id, locale: "en", data: { alt: altEn } });
    media[key] = doc.id as number;
  }

  await uploadMedia("logo", "logo.svg", "Bureau Think Positive", "Bureau Think Positive");
  await uploadMedia("heroGezin", "hero-gezin.jpg", "Gezin samen — moeder, vader en tiener", "Family together — mother, father and teenager");
  await uploadMedia("onzeFilosofie", "onze-filosofie.jpg", "Een jongen groeit op van baby tot jongvolwassene", "A boy grows up from baby to young adult");
  await uploadMedia("rogerPhoto", "kernteam/roger-vogelezang.jpg", "Roger Vogelezang", "Roger Vogelezang");
  await uploadMedia("markPhoto", "kernteam/mark-van-onselen.jpg", "Mark van Onselen", "Mark van Onselen");
  await uploadMedia("silviaPhoto", "kernteam/silvia-de-brabander.jpg", "Silvia de Brabander", "Silvia de Brabander");
  await uploadMedia("dianaPhoto", "kernteam/diana-eskens-lodder.jpg", "Diana Eskens Lodder", "Diana Eskens Lodder");
  await uploadMedia("keurmerkLeerbedrijf", "keurmerken/erkend-leerbedrijf.avif", "Erkend leerbedrijf — Wij leiden vakmensen op", "Recognised training company — we train future professionals");
  await uploadMedia("keurmerkIso", "keurmerken/iso9001.avif", "ISO 9001 gecertificeerd", "ISO 9001 certified");
  await uploadMedia("keurmerkVgct", "keurmerken/vgct.avif", "VGCt", "VGCt");
  await uploadMedia("keurmerkSkj", "keurmerken/skj.avif", "SKJ Kwaliteitsregister Jeugd", "SKJ Quality Register for Youth Professionals");
  log.push(`media: ${Object.keys(media).length}`);

  // ------------------------------------------------------------- Services
  for (let i = 0; i < dienstenNl.length; i++) {
    const nl = dienstenNl[i];
    const en = dienstenEn[i];
    const doc = await payload.create({
      collection: "services",
      locale: "nl",
      data: {
        slug: nl.slug,
        label: nl.label,
        summary: nl.summary,
        body: richText(dienstenContentNl[nl.slug] ?? []),
        order: i,
      },
    });
    await payload.update({
      collection: "services",
      id: doc.id,
      locale: "en",
      data: {
        label: en.label,
        summary: en.summary,
        body: richText(dienstenContentEn[en.slug] ?? []),
      },
    });
  }
  log.push(`services: ${dienstenNl.length}`);

  // --------------------------------------------------------- Target groups
  for (let i = 0; i < doelgroepenNl.length; i++) {
    const nl = doelgroepenNl[i];
    const en = doelgroepenEn[i];
    const detailNl = doelgroepDetailsNl[nl.slug];
    const detailEn = doelgroepDetailsEn[nl.slug];
    const doc = await payload.create({
      collection: "target-groups",
      locale: "nl",
      data: {
        slug: nl.slug,
        label: nl.label,
        summary: nl.summary,
        intro: detailNl.intro,
        bullets: detailNl.bullets.map((text) => ({ text })),
        order: i,
      },
    });
    // bullets isn't itself localized (only its "text" subfield is), so row
    // structure/ids are shared across locales — the en update must reuse
    // the ids the nl create() just returned, or Payload replaces the rows
    // outright and the nl text is lost (see the header.navItems fix above).
    const savedBullets = (doc.bullets ?? []) as { id: string }[];
    await payload.update({
      collection: "target-groups",
      id: doc.id,
      locale: "en",
      data: {
        label: en.label,
        summary: en.summary,
        intro: detailEn.intro,
        bullets: detailEn.bullets.map((text, j) => ({ id: savedBullets[j].id, text })),
      },
    });
  }
  log.push(`target-groups: ${doelgroepenNl.length}`);

  // ---------------------------------------------------------- Team members
  const team = [
    {
      name: "Roger Vogelezang",
      roleNl: "Oprichter & zorg coördinator",
      roleEn: "Founder & care coordinator",
      photo: media.rogerPhoto,
      email: "info@bureauthinkpositive.com",
      bioNl:
        "Hbo Culturele en Maatschappelijke Vorming (Haagse Hogeschool, 1995). Werkte jarenlang als interim agressiecoach, sociotherapeut en specialistisch psychiatrisch begeleider voordat hij in 2011 Bureau Think Positive oprichtte. Case manager, agressiecoach, crisismanager en specialistisch ambulant begeleider ineen — met een trackrecord dat onder meer de Van der Hoeven Kliniek (TBS) in Utrecht omvat.",
      bioEn:
        "Bachelor's degree in Cultural and Social Development (Haagse Hogeschool, 1995). Worked for many years as an interim aggression coach, socio-therapist and specialist psychiatric support worker before founding Bureau Think Positive in 2011. Case manager, aggression coach, crisis manager and specialist in-home support worker all in one — with a track record that includes the Van der Hoeven Kliniek (TBS) in Utrecht.",
    },
    {
      name: "Mark van Onselen",
      roleNl: "Lid kernteam",
      roleEn: "Core team member",
      photo: media.markPhoto,
      email: "m.vanonselen@bureauthinkpositive.com",
    },
    {
      name: "Silvia de Brabander",
      roleNl: "Lid kernteam",
      roleEn: "Core team member",
      photo: media.silviaPhoto,
      email: "s.debrabander@bureauthinkpositive.com",
    },
    {
      name: "Diana Eskens Lodder",
      roleNl: "Lid kernteam",
      roleEn: "Core team member",
      photo: media.dianaPhoto,
      email: "d.eskes-lodder@bureauthinkpositive.com",
    },
  ];
  for (let i = 0; i < team.length; i++) {
    const m = team[i];
    const doc = await payload.create({
      collection: "team-members",
      locale: "nl",
      data: { name: m.name, role: m.roleNl, email: m.email, bio: m.bioNl, photo: m.photo, order: i },
    });
    await payload.update({
      collection: "team-members",
      id: doc.id,
      locale: "en",
      data: { role: m.roleEn, bio: m.bioEn },
    });
  }
  log.push(`team-members: ${team.length}`);

  // --------------------------------------------------------- Site settings
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      logo: media.logo,
      siteName: "Bureau Think Positive",
      street: "Stationsweg 59",
      postalCodeAndCity: "2681 SM Honselersdijk",
      phone: "06 48 25 21 66",
    },
  });
  log.push("site-settings");

  // -------------------------------------------------------------- Header
  const headerNl = await payload.updateGlobal({
    slug: "header",
    locale: "nl",
    data: {
      navItems: mainNavNl.map((item) => ({
        label: item.label,
        href: item.href,
        children: ("children" in item ? item.children : undefined)?.map((c) => ({ label: c.label, href: c.href })) ?? [],
      })),
      contactCtaLabel: "Neem contact op",
      contactCtaHref: "/contact",
    },
  });
  type SavedNavChild = { id: string; label: string; href: string };
  type SavedNavItem = { id: string; label: string; href: string; children?: SavedNavChild[] | null };
  const savedNavItems = (headerNl.navItems ?? []) as SavedNavItem[];
  await payload.updateGlobal({
    slug: "header",
    locale: "en",
    data: {
      navItems: savedNavItems.map((saved, i) => {
        const en = mainNavEn[i];
        const enChildren = "children" in en ? en.children : undefined;
        return {
          id: saved.id,
          label: en.label,
          href: en.href,
          children: (saved.children ?? []).map((sc, j) => ({
            id: sc.id,
            label: enChildren?.[j]?.label ?? sc.label,
            href: enChildren?.[j]?.href ?? sc.href,
          })),
        };
      }),
      contactCtaLabel: "Get in touch",
      contactCtaHref: "/en/contact",
    },
  });
  log.push("header");

  // -------------------------------------------------------------- Footer
  const bureauLinksNl = [
    { label: "Het kernteam", href: "/over-ons/kernteam" },
    { label: "Kennisbank", href: "/kennisbank" },
    { label: "Algemene voorwaarden", href: "/voorwaarden" },
    { label: "Klachtenprocedure", href: "/klachtenprocedure" },
  ];
  const bureauLinksEn = [
    { label: "The core team", href: "/en/over-ons/kernteam" },
    { label: "Knowledge base", href: "/en/kennisbank" },
    { label: "Terms and conditions", href: "/en/voorwaarden" },
    { label: "Complaints procedure", href: "/en/klachtenprocedure" },
  ];
  const keurmerkenNl = [
    { image: media.keurmerkLeerbedrijf, alt: "Erkend leerbedrijf — Wij leiden vakmensen op" },
    { image: media.keurmerkIso, alt: "ISO 9001 gecertificeerd" },
    { image: media.keurmerkVgct, alt: "VGCt" },
    { image: media.keurmerkSkj, alt: "SKJ Kwaliteitsregister Jeugd" },
  ];
  const keurmerkenEnAlt = [
    "Recognised training company — we train future professionals",
    "ISO 9001 certified",
    "VGCt",
    "SKJ Quality Register for Youth Professionals",
  ];

  const footerNl = await payload.updateGlobal({
    slug: "footer",
    locale: "nl",
    data: {
      intro:
        "Specialistische ambulante begeleiding, crisisinterventie en coaching voor jongeren en hun gezin. Kleinschalig, korte lijnen, hart voor de jongeren.",
      dienstenHeading: "Diensten",
      doelgroepHeading: "Doelgroep",
      bureauHeading: "Bureau",
      bureauLinks: bureauLinksNl,
      keurmerkenHeading: "Keurmerken",
      keurmerken: keurmerkenNl,
    },
  });
  type SavedLink = { id: string; label: string; href: string };
  type SavedKeurmerk = { id: string; image: number | { id: number }; alt: string };
  const savedBureauLinks = (footerNl.bureauLinks ?? []) as SavedLink[];
  const savedKeurmerken = (footerNl.keurmerken ?? []) as SavedKeurmerk[];
  await payload.updateGlobal({
    slug: "footer",
    locale: "en",
    data: {
      intro:
        "Specialist outreach support, crisis intervention and coaching for young people and their families. Small-scale, short lines of communication, a heart for young people.",
      dienstenHeading: "Services",
      doelgroepHeading: "Who we help",
      bureauHeading: "About",
      bureauLinks: savedBureauLinks.map((saved, i) => ({ id: saved.id, ...bureauLinksEn[i] })),
      keurmerkenHeading: "Certifications",
      keurmerken: savedKeurmerken.map((saved, i) => ({
        id: saved.id,
        image: typeof saved.image === "object" ? saved.image.id : saved.image,
        alt: keurmerkenEnAlt[i],
      })),
    },
  });
  log.push("footer");

  // --------------------------------------------------------------- Pages
  async function createPage(
    slug: string,
    titleNl: string,
    titleEn: string,
    layoutNl: Record<string, unknown>[],
    layoutEnFn: (saved: Record<string, unknown>[]) => Record<string, unknown>[],
    metaNl?: { title?: string; description?: string },
    metaEn?: { title?: string; description?: string },
  ) {
    const doc = await payload.create({
      collection: "pages",
      locale: "nl",
      data: {
        title: titleNl,
        slug,
        metaTitle: metaNl?.title,
        metaDescription: metaNl?.description,
        layout: layoutNl,
      },
    });
    const savedLayout = (doc.layout ?? []) as Record<string, unknown>[];
    await payload.update({
      collection: "pages",
      id: doc.id,
      locale: "en",
      data: {
        title: titleEn,
        metaTitle: metaEn?.title,
        metaDescription: metaEn?.description,
        layout: layoutEnFn(savedLayout),
      },
    });
    log.push(`page: ${slug}`);
  }

  // ---- Home ----
  await createPage(
    "home",
    "Home",
    "Home",
    [
      {
        blockType: "hero",
        eyebrow: "Bureau Think Positive · Jeugdzorg",
        heading: "Werken aan vastgelopen ontwikkeling, met een positieve aanpak",
        highlightText: "positieve",
        intro:
          "Wij zijn een team van specialisten in de complexe jeugdzorg. Van crisissituaties rondom jeugd & gezin tot ambulante begeleiding en coaching — wij zorgen voor stabiliteit, veiligheid en perspectief.",
        primaryCtaLabel: "Vraag een gratis oriënterend gesprek aan",
        primaryCtaHref: "/contact",
        secondaryCtaLabel: "Ontdek ons verhaal",
        secondaryCtaHref: "/over-ons",
        image: media.heroGezin,
      },
      {
        blockType: "richText",
        eyebrow: "Onze filosofie",
        title: "Ga mee op ontdekkingsreis en word wie je bent",
        body: richText([
          "Opgroeien is niet makkelijk. Voor de meeste jongeren voelt het eerder als een hindernisbaan vol obstakels — soms zo zwaar dat je er alleen voor lijkt te staan. Daarom richtten we Bureau Think Positive op: om te helpen op een manier die bij jou aanslaat, zodat je voorbij de zware periode komt en er weer zin in krijgt.",
          "We beloven niet dat het makkelijk gaat — werken aan jezelf kost moeite. Maar we staan naast je bij elke hindernis, en leren je focussen op wat wél werkt. Think Positive is geen slogan, het is een way of life.",
        ]),
        linkLabel: "Lees ons volledige verhaal →",
        linkHref: "/over-ons",
        image: media.onzeFilosofie,
        imagePosition: "left",
      },
      {
        blockType: "serviceGrid",
        eyebrow: "Wat we doen",
        title: "Een integraal pakket aan zorgdiensten",
        intro: "Van gespecialiseerde ambulante begeleiding tot trajecten voor gestrande jongeren — projectmatig en oplossingsgericht.",
        limit: 6,
        showAllLabel: "Bekijk alle diensten",
        showAllHref: "/diensten",
      },
      {
        blockType: "whyUs",
        eyebrow: "Waarom Bureau Think Positive",
        title: "Waarom zou je voor ons kiezen?",
        items: [
          { title: "Bekwaam", body: "Jarenlange ervaring in de complexe jeugdzorg, van crisis tot dagelijkse begeleiding." },
          { title: "Bevoegd", body: "SKJ-geregistreerd en werkend volgens de professionele standaarden in de jeugdhulp." },
          { title: "Betrouwbaar", body: "Kleinschalig, korte lijnen en een no-nonsensmentaliteit — je weet altijd waar je aan toe bent." },
        ],
      },
      {
        blockType: "cta",
        title: "Klaar om kennis te maken?",
        buttonLabel: "Vraag een gratis oriënterend gesprek aan",
        buttonHref: "/contact",
        background: "dark",
      },
    ],
    (saved) => {
      const whyUsItems = (saved[3] as { items?: { id: string }[] }).items as { id: string }[];
      return [
        {
          id: saved[0].id,
          blockType: "hero",
          eyebrow: "Bureau Think Positive · Youth Care",
          heading: "Helping stalled development move forward, with a positive approach",
          highlightText: "positive",
          intro:
            "We're a team of specialists in complex youth care. From crisis situations around young people & families to in-home support and coaching — we provide stability, safety and perspective.",
          primaryCtaLabel: "Request a free introductory conversation",
          primaryCtaHref: "/en/contact",
          secondaryCtaLabel: "Discover our story",
          secondaryCtaHref: "/en/over-ons",
          image: media.heroGezin,
        },
        {
          id: saved[1].id,
          blockType: "richText",
          eyebrow: "Our philosophy",
          title: "Join us on a journey of discovery and become who you are",
          body: richText([
            "Growing up isn't easy. For most young people, it can feel more like an obstacle course — sometimes so tough that you feel like you're facing it alone. That's why we founded Bureau Think Positive: to help in a way that actually works for you, so you can move past the hard times and find your enthusiasm again.",
            "We won't promise it's easy — working on yourself takes effort. But we stand beside you at every hurdle, and help you focus on what does work. Think Positive is not a slogan, it's a way of life.",
          ]),
          linkLabel: "Read our full story →",
          linkHref: "/en/over-ons",
          image: media.onzeFilosofie,
          imagePosition: "left",
        },
        {
          id: saved[2].id,
          blockType: "serviceGrid",
          eyebrow: "What we do",
          title: "A comprehensive range of care services",
          intro:
            "From specialised in-home support to programmes for young people who have hit a dead end — project-based and solution-focused.",
          limit: 6,
          showAllLabel: "View all services",
          showAllHref: "/en/diensten",
        },
        {
          id: saved[3].id,
          blockType: "whyUs",
          eyebrow: "Why Bureau Think Positive",
          title: "Why choose us?",
          items: [
            { id: whyUsItems[0].id, title: "Skilled", body: "Years of experience in complex youth care, from crisis intervention to day-to-day support." },
            { id: whyUsItems[1].id, title: "Qualified", body: "SKJ-registered and working to the professional standards in youth care." },
            {
              id: whyUsItems[2].id,
              title: "Reliable",
              body: "Small-scale, short lines of communication and a no-nonsense mentality — you always know where you stand.",
            },
          ],
        },
        {
          id: saved[4].id,
          blockType: "cta",
          title: "Ready to get in touch?",
          buttonLabel: "Request a free introductory conversation",
          buttonHref: "/en/contact",
          background: "dark",
        },
      ];
    },
    {
      title: "Bureau Think Positive — Jeugdzorg met een positieve aanpak",
      description: "Specialistische ambulante begeleiding, crisisinterventie en coaching voor jongeren en hun gezin.",
    },
    {
      title: "Bureau Think Positive — Youth care with a positive approach",
      description: "Specialist outreach support, crisis intervention and coaching for young people and their families.",
    },
  );

  // ---- Diensten hub ----
  await createPage(
    "diensten",
    "Diensten",
    "Services",
    [
      {
        blockType: "serviceGrid",
        eyebrow: "Wat we doen",
        title: "Onze diensten",
        intro:
          "Wij bieden een integraal pakket: van gespecialiseerde ambulante begeleiding en opvoedingsondersteuning tot crisisinterventie en coaching. Projectmatig en oplossingsgericht, met als doel de jongere en zijn/haar systeem zo snel mogelijk weer te laten functioneren.",
        limit: 100,
      },
    ],
    (saved) => [
      {
        id: saved[0].id,
        blockType: "serviceGrid",
        eyebrow: "What we do",
        title: "Our services",
        intro:
          "We offer an integrated package: from specialised in-home support and parenting support to crisis intervention and coaching. Project-based and solution-focused, with the goal of getting the young person and their system functioning again as quickly as possible.",
        limit: 100,
      },
    ],
    { description: "Van ambulante begeleiding en opvoedingsondersteuning tot crisisinterventie en coaching — het complete dienstenpakket van Bureau Think Positive." },
    { description: "From in-home support and parenting support to crisis intervention and coaching — the complete range of services from Bureau Think Positive." },
  );

  // ---- Doelgroep hub ----
  await createPage(
    "doelgroep",
    "Doelgroep",
    "Who We Help",
    [
      {
        blockType: "targetGroupGrid",
        eyebrow: "Voor wie zijn wij",
        title: "Wij zijn er voor...",
        intro: "Van particuliere gezinnen tot zorginstellingen en scholen — ontdek hoe we per doelgroep ondersteunen.",
      },
    ],
    (saved) => [
      {
        id: saved[0].id,
        blockType: "targetGroupGrid",
        eyebrow: "Who we're here for",
        title: "We are here for...",
        intro: "From individual families to care institutions and schools — discover how we support each target group.",
      },
    ],
    { description: "Voor wie is Bureau Think Positive er? Ontdek onze doelgroepen, van gezinnen tot zorg- en onderwijsinstellingen." },
    { description: "Who is Bureau Think Positive here for? Discover our target groups, from families to care and education institutions." },
  );

  // ---- Kernteam ----
  await createPage(
    "kernteam",
    "Het kernteam",
    "The core team",
    [
      {
        blockType: "teamGrid",
        eyebrow: "Het kernteam",
        title: "De mensen achter Bureau Think Positive",
        intro:
          "Oprichter en zorg coördinator, aangevuld met een team van zeer gedreven en ervaren zorgprofessionals — elk met hun eigen expertise en skills.",
      },
    ],
    (saved) => [
      {
        id: saved[0].id,
        blockType: "teamGrid",
        eyebrow: "The core team",
        title: "The people behind Bureau Think Positive",
        intro: "Founder and care coordinator, joined by a team of highly driven and experienced care professionals — each with their own expertise and skills.",
      },
    ],
    { description: "Maak kennis met het kernteam van Bureau Think Positive — ervaren zorgprofessionals met ieder hun eigen expertise." },
    { description: "Meet the core team at Bureau Think Positive — experienced care professionals, each with their own area of expertise." },
  );

  return NextResponse.json({ ok: true, log });
}
