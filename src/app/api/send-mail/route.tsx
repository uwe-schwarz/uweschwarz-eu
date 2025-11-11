import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Font,
} from "@react-email/components";

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const EmailTemplate = ({ name, email, message }: { name: string; email: string; message: string }) => {
  const colors = {
    background: "hsl(210, 40%, 98%)",
    foreground: "hsl(225, 25%, 12%)",
    card: "hsl(220, 30%, 92%)",
    cardForeground: "hsl(225, 25%, 12%)",
    primary: "hsl(333, 65%, 35%)",
    primaryForeground: "hsl(0, 0%, 70%)",
    accent: "hsl(82, 61%, 26%)",
    accentForeground: "hsl(225, 25%, 12%)",
    muted: "hsl(215, 25%, 85%)",
    mutedForeground: "hsl(215, 20%, 35%)",
    border: "hsl(215, 25%, 85%)",
  };

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>New contact form submission</Preview>
      <Tailwind>
        <Body className="py-[40px] font-sans" style={{ backgroundColor: colors.background, fontFamily: "Inter, Arial, sans-serif" }}>
          <Container className="mx-auto max-w-[600px] rounded-[8px] p-[20px]" style={{ backgroundColor: colors.card }}>
            <Section>
              <div
                style={{
                  background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
                  padding: "2px",
                  borderRadius: "12px",
                  marginBottom: "24px",
                  marginTop: "24px",
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
                  padding: "2px",
                  borderRadius: "8px",
                  marginBottom: "16px",
                  display: "inline-block",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <a
                  href={`mailto:${email}`}
                  style={{
                    display: "block",
                    padding: "12px 20px",
                    borderRadius: "6px",
                    fontWeight: "600",
                    textDecoration: "none",
                    color: colors.foreground,
                    backgroundColor: colors.card,
                    textAlign: "center",
                    boxSizing: "border-box",
                    fontSize: "16px",
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
              style={{ borderColor: colors.border, borderTopWidth: "1px", borderTopStyle: "solid" }}
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
  const safeMessage = escapeHtml(body.message).replace(/\n/g, "<br>");

  const html = await render(
    EmailTemplate({
      name: safeName,
      email: safeEmail,
      message: safeMessage,
    })
  );

  try {
    const data = await resend.emails.send({
      from: `${safeName} <uweschwarz-eu@oldman.cloud>`,
      replyTo: [body.email],
      to: ["mail@uweschwarz.eu"],
      subject: `Contact Form Submission from ${safeName} on ${new Date().toISOString()}`,
      html,
    });
    return NextResponse.json(data);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: "Failed to send email", details: err.message },
      { status: 500 }
    );
  }
}
