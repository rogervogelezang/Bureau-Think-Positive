// Hand-written types matching payload.config.ts's collections/blocks.
// Normally Payload auto-generates these (`payload generate:types`), but
// that CLI command currently hits a Node 24 + tsx ESM/CJS interop limit
// unrelated to this project's config (a top-level-await module can't be
// require()'d synchronously — a Node constraint, not a bug here). Runtime
// behavior (admin panel, Local API, storage) is unaffected; only this
// optional codegen step is. Revisit once tsx/Payload's loader catches up.

export type Media = {
  id: number;
  url?: string | null;
  alt: string;
};

export type LinkFields = {
  label?: string | null;
  href?: string | null;
};

export type HeroBlock = {
  blockType: "hero";
  eyebrow?: string | null;
  heading: string;
  highlightText?: string | null;
  intro?: string | null;
  primaryCtaLabel?: string | null;
  primaryCtaHref?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaHref?: string | null;
  image?: Media | number | null;
};

export type RichTextBlockType = {
  blockType: "richText";
  eyebrow?: string | null;
  title?: string | null;
  body?: unknown;
  linkLabel?: string | null;
  linkHref?: string | null;
  image?: Media | number | null;
  imagePosition?: "left" | "right" | "none" | null;
};

export type ServiceGridBlockType = {
  blockType: "serviceGrid";
  eyebrow?: string | null;
  title?: string | null;
  intro?: string | null;
  limit?: number | null;
  showAllLabel?: string | null;
  showAllHref?: string | null;
};

export type TargetGroupGridBlockType = {
  blockType: "targetGroupGrid";
  eyebrow?: string | null;
  title?: string | null;
  intro?: string | null;
  showAllLabel?: string | null;
  showAllHref?: string | null;
};

export type TeamGridBlockType = {
  blockType: "teamGrid";
  eyebrow?: string | null;
  title?: string | null;
  intro?: string | null;
};

export type WhyUsBlockType = {
  blockType: "whyUs";
  eyebrow?: string | null;
  title?: string | null;
  items?: { title: string; body: string }[] | null;
};

export type CTABlockType = {
  blockType: "cta";
  eyebrow?: string | null;
  title: string;
  body?: string | null;
  buttonLabel?: string | null;
  buttonHref?: string | null;
  background?: "light" | "dark" | null;
};

export type PageBlock =
  | HeroBlock
  | RichTextBlockType
  | ServiceGridBlockType
  | TargetGroupGridBlockType
  | TeamGridBlockType
  | WhyUsBlockType
  | CTABlockType;

export type Page = {
  id: number;
  title: string;
  slug: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  layout?: PageBlock[] | null;
};

export type Service = {
  id: number;
  slug: string;
  label: string;
  summary: string;
  body?: unknown;
  order?: number | null;
};

export type TargetGroup = {
  id: number;
  slug: string;
  label: string;
  summary: string;
  intro: string;
  bullets?: { text: string }[] | null;
  order?: number | null;
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  email?: string | null;
  bio?: string | null;
  photo?: Media | number | null;
  order?: number | null;
};

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] | null };

export type HeaderGlobal = {
  navItems?: NavItem[] | null;
  contactCtaLabel?: string | null;
  contactCtaHref?: string | null;
};

export type FooterLink = { label: string; href: string };
export type Keurmerk = { image: Media | number | null; alt: string };

export type FooterGlobal = {
  intro: string;
  dienstenHeading: string;
  doelgroepHeading: string;
  bureauHeading: string;
  bureauLinks?: FooterLink[] | null;
  keurmerkenHeading?: string | null;
  keurmerken?: Keurmerk[] | null;
};

export type SiteSettingsGlobal = {
  logo: Media | number;
  siteName?: string | null;
  street: string;
  postalCodeAndCity: string;
  phone: string;
};
