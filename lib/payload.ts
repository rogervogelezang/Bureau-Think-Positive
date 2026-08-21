import { getPayload } from "payload";
import config from "@payload-config";

// Cached per server-request-lifetime by Payload itself — safe to call
// from every server component that needs the Local API.
export async function getPayloadClient() {
  return getPayload({ config });
}
