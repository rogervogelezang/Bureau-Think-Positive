import { Resend } from "resend";

let client: Resend | null = null;

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL ?? "Bureau Think Positive <onboarding@resend.dev>";
const ADMIN_ALERT_EMAIL = process.env.ADMIN_ALERT_EMAIL ?? "info@bureauthinkpositive.nl";

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** Forwards a contact form submission (see app/contact/actions.ts) to the admin inbox, with reply-to set so replying goes straight to the sender. */
export async function sendContactFormEmail(params: { name: string; email: string; phone?: string; message: string }): Promise<void> {
  const resend = getResendClient();
  if (!resend) return;
  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: ADMIN_ALERT_EMAIL,
      subject: `Contactformulier: ${params.name}`,
      html: `<p><strong>Van:</strong> ${escapeHtml(params.name)} (${escapeHtml(params.email)})</p>
      ${params.phone ? `<p><strong>Telefoon:</strong> ${escapeHtml(params.phone)}</p>` : ""}
      <p>${escapeHtml(params.message).replace(/\n/g, "<br>")}</p>`,
      replyTo: params.email,
    });
    if (error) console.error("Kon contactformulier-e-mail niet versturen:", error.message);
  } catch (err) {
    console.error("Kon contactformulier-e-mail niet versturen:", err);
  }
}
