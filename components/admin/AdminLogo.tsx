// Replaces Payload's default wordmark on the /admin login screen with the
// site's own logo. Rendered outside our app's Tailwind layout (the (payload)
// route group only loads @payloadcms/next/css), so sizing is inline rather
// than via utility classes.
export function AdminLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo.svg" alt="Bureau Think Positive" style={{ height: "90px", width: "auto" }} />
  );
}
