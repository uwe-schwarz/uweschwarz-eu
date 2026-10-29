import template from "./contact-email.html.txt" with { type: "text" };
import { invalidContactFields, type ContactValues } from "@/lib/contact-validation";

function escapeHtml(value: string) {
  return value.replaceAll(
    /[&<>"']/g,
    (character) =>
      ({
        "'": "&#39;",
        '"': "&quot;",
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
      })[character] ?? character,
  );
}

export async function sendMail(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { headers: { Allow: "POST" }, status: 405 });
  }
  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > 50_000) {
      return Response.json({ error: "Message is too large" }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || !("verify" in body) || body.verify !== "") {
    return Response.json({ error: "Invalid submission" }, { status: 400 });
  }
  const values = body as ContactValues;
  const invalid = invalidContactFields(values);
  if (invalid.length > 0) {
    return Response.json(
      { error: `Invalid ${invalid[0] === "email" ? "email address" : invalid[0]}` },
      { status: 400 },
    );
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Mail delivery is not configured" }, { status: 500 });
  }
  const submittedAt = new Date();
  const headerName =
    values.name
      .replaceAll(/[\r\n"<>]/g, "")
      .replaceAll(/\s+/g, " ")
      .trim() || "Website visitor";
  const replacements: Record<string, string> = {
    "2099": String(submittedAt.getUTCFullYear()),
    CONTACT_EMAIL_TOKEN: escapeHtml(values.email),
    CONTACT_MESSAGE_TOKEN: escapeHtml(values.message).replaceAll(/\r?\n/g, "<br />"),
    CONTACT_NAME_TOKEN: escapeHtml(values.name),
  };
  const html = template.replaceAll(/CONTACT_(?:EMAIL|NAME|MESSAGE)_TOKEN|2099/g, (token) => replacements[token]);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      body: JSON.stringify({
        from: `${headerName} <uweschwarz-eu@oldman.cloud>`,
        html,
        reply_to: [values.email],
        subject: `Contact Form Submission from ${headerName} on ${submittedAt.toISOString()}`,
        to: ["mail@uweschwarz.eu"],
      }),
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      method: "POST",
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) {
      console.error("Mail provider rejected delivery:", response.status);
      return Response.json({ error: "Failed to send email" }, { status: 502 });
    }
    return Response.json({ success: true });
  } catch {
    console.error("Mail provider could not be reached");
    return Response.json({ error: "Failed to send email" }, { status: 502 });
  }
}

export default { fetch: sendMail };
