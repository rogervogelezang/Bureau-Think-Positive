import { getPayloadClient } from "@/lib/payload";
import type { HeaderGlobal, FooterGlobal, SiteSettingsGlobal, Service, TargetGroup } from "@/lib/payloadTypes";

// Fetched once per request in each root layout, passed down as props to
// the (client-component) Header/Footer instead of those components
// importing static data files directly — this is what makes the logo,
// nav items, and footer content editable through the admin.
export async function getSiteData(locale: "nl" | "en") {
  const payload = await getPayloadClient();
  const [siteSettings, header, footer, servicesRes, targetGroupsRes] = await Promise.all([
    payload.findGlobal({ slug: "site-settings", locale }),
    payload.findGlobal({ slug: "header", locale }),
    payload.findGlobal({ slug: "footer", locale }),
    payload.find({ collection: "services", locale, limit: 100, sort: "order" }),
    payload.find({ collection: "target-groups", locale, limit: 100, sort: "order" }),
  ]);
  return {
    siteSettings: siteSettings as unknown as SiteSettingsGlobal,
    header: header as unknown as HeaderGlobal,
    footer: footer as unknown as FooterGlobal,
    services: servicesRes.docs as unknown as Service[],
    targetGroups: targetGroupsRes.docs as unknown as TargetGroup[],
  };
}
