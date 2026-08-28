import process from "node:process";

import { describe, expect, mock, test } from "bun:test";

// The route module resolves Resend lazily (per request), so the environment
// and the mocked transport can be switched between tests in this file.
// mock.module must be registered before the first route import.

process.env.RESEND_API_KEY = "test-key";

const sentPayloads = [];

mock.module("resend", () => ({
  Resend: class {
    emails = {
      async send(payload) {
        sentPayloads.push(payload);
        return { data: { id: "test-email-id" }, error: null };
      },
    };
  },
}));

const postJson = (body) =>
  new globalThis.Request("https://uweschwarz.eu/api/send-mail", {
    body: typeof body === "string" ? body : JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

describe("send-mail route", () => {
  test("rejects invalid JSON with a 400 response", async () => {
    const { POST } = await import("@/app/api/send-mail/route");

    const response = await POST(postJson("{not-json"));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Invalid JSON" });
  });

  test("rejects submissions that fill the honeypot field", async () => {
    const { POST } = await import("@/app/api/send-mail/route");

    const response = await POST(
      postJson({ email: "jane@example.com", message: "Hello there, agent caller!", name: "Jane Doe", verify: "bot" }),
    );

    expect(response.status).toBe(400);
  });

  test("validates email before any other field and before transport setup", async () => {
    const { POST } = await import("@/app/api/send-mail/route");

    const response = await POST(
      postJson({ email: "not-an-email", message: "Hello there, agent caller!", name: "Jane Doe", verify: "" }),
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Invalid email address" });
  });

  test("mirrors the client-side minimum name length", async () => {
    const { POST } = await import("@/app/api/send-mail/route");

    const response = await POST(
      postJson({ email: "jane@example.com", message: "Hello there, agent caller!", name: "J", verify: "" }),
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Invalid name" });
  });

  test("mirrors the client-side minimum message length", async () => {
    const { POST } = await import("@/app/api/send-mail/route");

    const response = await POST(
      postJson({ email: "jane@example.com", message: "too short", name: "Jane Doe", verify: "" }),
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Invalid message" });
  });

  test("sends a sanitized, replyable email for valid submissions", async () => {
    const { POST } = await import("@/app/api/send-mail/route");

    const response = await POST(
      postJson({
        email: "jane@example.com",
        message: "Hello there, this message is long enough for the client schema.",
        name: 'Jane "Doe"\n<Rival> Co',
        verify: "",
      }),
    );

    expect(response.status).toBe(200);
    expect(sentPayloads).toHaveLength(1);

    const payload = sentPayloads[0];
    expect(payload.to).toEqual(["mail@uweschwarz.eu"]);
    expect(payload.replyTo).toEqual(["jane@example.com"]);
    // The display name must be header-safe: no quotes, line breaks, or angle brackets.
    expect(payload.from).toBe("Jane Doe Rival Co <uweschwarz-eu@oldman.cloud>");
    expect(payload.subject).toContain("Contact Form Submission from Jane Doe Rival Co");
  });

  test("reports a missing transport configuration after input validation passed", async () => {
    delete process.env.RESEND_API_KEY;
    const { POST } = await import("@/app/api/send-mail/route");

    const response = await POST(
      postJson({ email: "jane@example.com", message: "Hello there, agent caller!", name: "Jane Doe", verify: "" }),
    );

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: "Missing RESEND_API_KEY" });
  });
});
