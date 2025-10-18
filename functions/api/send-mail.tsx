import { Resend } from 'resend';
import { render } from '@react-email/render';
import * as React from 'react';
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
} from '@react-email/components';

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// eslint-disable-next-line react-refresh/only-export-components
const EmailTemplate = ({ name, email, message }: { name: string; email: string; message: string }) => {
  // Inverted colors that will look good when your client inverts them back
  const colors = {
    background: 'hsl(210, 40%, 98%)', // Light background (will become dark)
    foreground: 'hsl(225, 25%, 12%)', // Dark text (will become light)
    card: 'hsl(210, 40%, 95%)', // Light card (will become dark card)
    cardForeground: 'hsl(225, 25%, 12%)', // Dark text (will become light)
    primary: 'hsl(333, 65%, 35%)', // Inverted teal to magenta/red
    primaryForeground: 'hsl(0, 0%, 70%)', // Light gray (will become dark)
    accent: 'hsl(82, 61%, 26%)', // Inverted purple to yellow-green
    accentForeground: 'hsl(225, 25%, 12%)', // Dark text (will become light)
    muted: 'hsl(37.8, 32.6%, 82.5%)', // Light muted (will become dark)
    mutedForeground: 'hsl(35, 20.2%, 34.9%)', // Dark muted text (will become light)
    border: 'hsl(37.8, 32.6%, 82.5%)', // Light border (will become dark)
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
        <Body className="py-[40px] font-sans" style={{ backgroundColor: colors.background, fontFamily: 'Inter, Arial, sans-serif' }}>
          <Container className="mx-auto p-[20px] max-w-[600px] rounded-[8px]" style={{ backgroundColor: colors.card }}>
            <Section>
              {/* Gradient border around heading */}
              <div style={{
                background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
                padding: '2px',
                borderRadius: '12px',
                marginBottom: '24px',
                marginTop: '24px'
              }}>
                <div style={{
                  backgroundColor: colors.card,
                  borderRadius: '10px',
                  padding: '16px 20px'
                }}>
                  <Heading className="text-[24px] font-bold m-0" style={{ color: colors.foreground }}>
                    New Contact Form Submission
                  </Heading>
                </div>
              </div>

              <Text className="text-[16px] mb-[16px]" style={{ color: colors.mutedForeground }}>
                You have received a new message from your website contact form.
              </Text>

              <Section className="rounded-[8px] p-[16px] my-[24px]" style={{ backgroundColor: colors.muted }}>
                <Text className="text-[14px] font-bold mb-[4px]" style={{ color: colors.primary }}>From:</Text>
                <Text className="text-[16px] mb-[16px]" style={{ color: colors.foreground }}>{email}</Text>

                <Text className="text-[14px] font-bold mb-[4px]" style={{ color: colors.primary }}>Name:</Text>
                <Text className="text-[16px] mb-[16px]" style={{ color: colors.foreground }}>{name}</Text>

                <Text className="text-[14px] font-bold mb-[4px]" style={{ color: colors.primary }}>Message:</Text>
                <Text className="text-[16px]" style={{ color: colors.foreground }}>
                  {message}
                </Text>
              </Section>

              {/* Button with gradient border */}
              <div style={{
                background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
                padding: '2px',
                borderRadius: '8px',
                marginBottom: '16px',
                display: 'inline-block',
                width: '100%',
                boxSizing: 'border-box'
              }}>
                <a
                  href={`mailto:${email}`}
                  style={{
                    display: 'block',
                    padding: '12px 20px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    color: colors.foreground,
                    backgroundColor: colors.card,
                    textAlign: 'center',
                    boxSizing: 'border-box',
                    fontSize: '16px'
                  }}
                >
                  Reply to this message
                </a>
              </div>

              <Text className="text-[14px] mt-[32px]" style={{ color: colors.mutedForeground }}>
                This email was sent to you because you received a submission from the contact form on your website.
              </Text>
            </Section>

            <Section className="mt-[32px] pt-[32px]" style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: colors.border }}>
              <Text className="text-[12px] m-0" style={{ color: colors.mutedForeground }}>
                © {new Date().getFullYear()} Uwe Schwarz. All rights reserved.
              </Text>
              <Text className="text-[12px] m-0" style={{ color: colors.mutedForeground }}>
                Berlin, Germany
              </Text>
              <Text className="text-[12px] mt-[8px]" style={{ color: colors.mutedForeground }}>
                <a href="#" style={{ color: colors.accent, textDecoration: 'none' }}>Unsubscribe</a> from these alerts.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export async function onRequestPost(context) {
  const { request } = context;
  const body = await request.json();
  const resend = new Resend(context.env.RESEND_API_KEY);

  if (body.verify !== '') {
    return Response.json({ error: 'Error' }, { status: 400 });
  }

  const safeName = escapeHtml(body.name);
  const safeEmail = escapeHtml(body.email);
  const safeMessage = escapeHtml(body.message).replace(/\n/g, '<br>');

  const html = await render(EmailTemplate({
    name: safeName,
    email: safeEmail,
    message: safeMessage
  }));

  try {
    const data = await resend.emails.send({
      from: `${safeName} <uweschwarz-eu@oldman.cloud>`,
      replyTo: [body.email],
      to: ['mail@uweschwarz.eu'],
      subject: `Contact Form Submission from ${safeName} on ${new Date().toISOString()}`,
      html: html,
    });
    return Response.json(data);
  } catch (err) {
    return Response.json({ error: 'Failed to send email', details: err.message }, { status: 500 });
  }
}
