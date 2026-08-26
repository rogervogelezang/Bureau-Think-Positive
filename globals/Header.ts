import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

// Drives the nav bar. navItems is what lets the client add a new page to
// navigation herself once she's created it — no developer needed.
export const Header: GlobalConfig = {
  slug: "header",
  label: { nl: "Header (menu)", en: "Header" },
  admin: {
    group: { nl: "Instellingen", en: "Settings" },
  },
  fields: [
    {
      name: "navItems",
      type: "array",
      labels: {
        singular: { nl: "Menu-item", en: "Menu item" },
        plural: { nl: "Menu-items", en: "Menu items" },
      },
      label: "Hoofdmenu",
      admin: {
        description: "De knoppen die bovenaan elke pagina staan, van links naar rechts in deze volgorde. Sleep een item omhoog of omlaag om de volgorde te wijzigen.",
        initCollapsed: true,
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          localized: true,
          label: "Tekst op de knop",
          admin: { description: "Wat de bezoeker in het menu ziet staan, bijv. \"Diensten\" of \"Over ons\"." },
        },
        {
          name: "href",
          type: "text",
          required: true,
          localized: true,
          label: "Link (waar de knop naartoe gaat)",
          admin: {
            description: "Het pad naar de pagina, beginnend met een schuine streep. Bijv. /diensten voor de Diensten-pagina. Geen volledige webadressen (https://...) invullen.",
          },
        },
        {
          name: "children",
          type: "array",
          labels: {
            singular: { nl: "Sub-item", en: "Sub item" },
            plural: { nl: "Sub-items", en: "Sub items" },
          },
          label: "Uitklapmenu (sub-items)",
          admin: {
            description: "Alleen invullen als dit hoofdmenu-item een uitklapmenu moet krijgen, met eigen links eronder — bijv. bij \"Diensten\" een lijstje met de losse diensten. Niets invullen als dit een gewone knop moet blijven, zonder uitklapmenu.",
            initCollapsed: true,
          },
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
              localized: true,
              label: "Tekst van het sub-item",
              admin: { description: "Wat de bezoeker in het uitklapmenu ziet staan." },
            },
            {
              name: "href",
              type: "text",
              required: true,
              localized: true,
              label: "Link van het sub-item",
              admin: { description: "Het pad naar de pagina waar dit sub-item naartoe verwijst, bijv. /diensten/ambulante-begeleiding." },
            },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "contactCtaLabel",
          type: "text",
          localized: true,
          label: "Tekst contactknop",
          admin: { description: "De knop rechts in het menu waarmee bezoekers snel naar het contactformulier gaan, bijv. \"Neem contact op\"." },
        },
        {
          name: "contactCtaHref",
          type: "text",
          localized: true,
          label: "Link contactknop",
          admin: { description: "Het pad naar de contactpagina, bijv. /contact." },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      () => {
        revalidatePath("/", "layout");
        revalidatePath("/en", "layout");
      },
    ],
  },
};
