import Link from "next/link";

// Replaces Payload's default wordmark on the /admin login screen with the
// site's own logo. Rendered outside our app's Tailwind layout (the (payload)
// route group only loads @payloadcms/next/css), so sizing is inline rather
// than via utility classes. Linked back to the public homepage — since
// (payload) and (nl) are separate root layouts, Next falls back to a full
// navigation automatically here regardless.
export function AdminLogo() {
  return (
    <Link href="/" aria-label="Terug naar de website">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="Bureau Think Positive" style={{ height: "90px", width: "auto" }} />
    </Link>
  );
}
