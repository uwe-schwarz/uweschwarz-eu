import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { Body, Container, Head, Heading, Html, Preview, Section, Text, Tailwind } from "@react-email/components";

function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const EmailTemplate = ({ email, message, name }: { email: string; message: string; name: string }) => {
  const colors = {
    accent: "hsl(82, 61%, 26%)",
    accentForeground: "hsl(225, 25%, 12%)",
    background: "hsl(210, 40%, 98%)",
    border: "hsl(215, 25%, 85%)",
    card: "hsl(220, 30%, 92%)",
    cardForeground: "hsl(225, 25%, 12%)",
    foreground: "hsl(225, 25%, 12%)",
    muted: "hsl(215, 25%, 85%)",
    mutedForeground: "hsl(215, 20%, 35%)",
    primary: "hsl(333, 65%, 35%)",
    primaryForeground: "hsl(0, 0%, 70%)",
  };

  return (
    <Html>
      <Head />
      <Preview>New contact form submission</Preview>
      <Tailwind>
        <Body
          className="py-[40px] font-sans"
          style={{ backgroundColor: colors.background, fontFamily: "Geist, Arial, sans-serif" }}
        >
          <Container className="mx-auto max-w-[600px] rounded-[8px] p-[20px]" style={{ backgroundColor: colors.card }}>
            <Section>
              <div
                style={{
                  background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
                  borderRadius: "12px",
                  marginBottom: "24px",
                  marginTop: "24px",
                  padding: "2px",
                }}
              >
                <div
                  style={{
                    backgroundColor: colors.card,
                    borderRadius: "10px",
                    padding: "16px 20px",
                  }}
                >
                  <Heading className="m-0 text-[24px] font-bold" style={{ color: colors.foreground }}>
                    New Contact Form Submission
                  </Heading>
                </div>
              </div>

              <Text className="text-[16px]" style={{ color: colors.mutedForeground, marginBottom: "16px" }}>
                You have received a new message from your website contact form.
              </Text>

              <Section className="my-[24px] rounded-[8px] p-[16px]" style={{ backgroundColor: colors.muted }}>
                <Text className="mb-[4px] text-[14px] font-bold" style={{ color: colors.primary }}>
                  From:
                </Text>
                <Text className="mb-[16px] text-[16px]" style={{ color: colors.foreground }}>
                  {email}
                </Text>

                <Text className="mb-[4px] text-[14px] font-bold" style={{ color: colors.primary }}>
                  Name:
                </Text>
                <Text className="mb-[16px] text-[16px]" style={{ color: colors.foreground }}>
                  {name}
                </Text>

                <Text className="mb-[4px] text-[14px] font-bold" style={{ color: colors.primary }}>
                  Message:
                </Text>
                <Text className="text-[16px]" style={{ color: colors.foreground }}>
                  <span dangerouslySetInnerHTML={{ __html: message }} />
                </Text>
              </Section>

              <div
                style={{
                  background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
                  borderRadius: "8px",
                  boxSizing: "border-box",
                  display: "inline-block",
                  marginBottom: "16px",
                  padding: "2px",
                  width: "100%",
                }}
              >
                <a
                  href={`mailto:${email}`}
                  style={{
                    backgroundColor: colors.card,
                    borderRadius: "6px",
                    boxSizing: "border-box",
                    color: colors.foreground,
                    display: "block",
                    fontSize: "16px",
                    fontWeight: "600",
                    padding: "12px 20px",
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                >
                  Reply to this message
                </a>
              </div>

              <Text className="mt-[32px] text-[14px]" style={{ color: colors.mutedForeground }}>
                This email was sent to you because you received a submission from the contact form on your website.
              </Text>
            </Section>

            <Section
              className="mt-[32px] border-t pt-[32px]"
              style={{ borderColor: colors.border, borderTopStyle: "solid", borderTopWidth: "1px" }}
            >
              <Text className="m-0 text-[12px]" style={{ color: colors.mutedForeground }}>
                © {new Date().getFullYear()} Uwe Schwarz. All rights reserved.
              </Text>
              <Text className="m-0 text-[12px]" style={{ color: colors.mutedForeground }}>
                Berlin, Germany
              </Text>
              <Text className="mt-[8px] text-[12px]" style={{ color: colors.mutedForeground }}>
                <a href="#" style={{ color: colors.accent, textDecoration: "none" }}>
                  Unsubscribe
                </a>{" "}
                from these alerts.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export async function POST(request: Request) {
  const body = await request.json();

  if (body.verify !== "") {
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing RESEND_API_KEY" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const safeName = escapeHtml(body.name);
  const safeEmail = escapeHtml(body.email);
  const safeMessage = escapeHtml(body.message).replaceAll("\n", "<br>");

  const html = await render(
    EmailTemplate({
      email: safeEmail,
      message: safeMessage,
      name: safeName,
    }),
  );

  try {
    const data = await resend.emails.send({
      from: `${safeName} <uweschwarz-eu@oldman.cloud>`,
      html,
      replyTo: [body.email],
      subject: `Contact Form Submission from ${safeName} on ${new Date().toISOString()}`,
      to: ["mail@uweschwarz.eu"],
    });
    return NextResponse.json(data);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ details: err.message, error: "Failed to send email" }, { status: 500 });
  }
}
