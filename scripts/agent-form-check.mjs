#!/usr/bin/env bun

/**
 * Agent simulation check for the contact form (issue #247).
 *
 * Drives the form exclusively through accessibility roles and labels — the
 * same interface accessibility-driven agent browsers use — and asserts that
 * submitting produces a correct POST /api/send-mail payload.
 *
 * The send-mail request is intercepted and fulfilled locally, so no real
 * email is sent and the check is safe to run against any environment
 * (dev server, preview deployment, or production).
 *
 * Usage:
 *   bun run agent-form-check
 *   AGENT_FORM_CHECK_URL=https://uweschwarz.eu/de bun run agent-form-check
 *
 * The default target is a local dev server (`bun run dev`). The URL should
 * point at the German locale, because the accessible field labels asserted
 * here ("Name", "E-Mail", "Nachricht") are the German ones.
 */

import assert from "node:assert/strict";
import process from "node:process";

import { chromium } from "playwright";

const DEFAULT_URL = "http://127.0.0.1:3000/de";
// Small viewport: mirrors the mobile-sized AX agent sessions where the
// name-field issue was originally observed (issue #247).
const VIEWPORT = { height: 770, width: 397 };
const NAME = "Uwe Schwarz";
const EMAIL = "mail@uweschwarz.eu";
const MESSAGE = "Agent-Form-Check: Bitte um Rueckruf morgen Nachmittag wegen einer KI-Schulung. Danke!";

const url = process.env.AGENT_FORM_CHECK_URL ?? DEFAULT_URL;

let browser;

try {
  browser = await chromium.launch({ headless: true });

  const page = await browser.newPage({ viewport: VIEWPORT });

  const sendMailRequests = [];
  await page.route("**/api/send-mail", async (route) => {
    sendMailRequests.push(route.request());
    await route.fulfill({
      body: JSON.stringify({ data: { id: "agent-form-check" }, error: null }),
      contentType: "application/json",
      status: 200,
    });
  });

  await page.goto(url, { waitUntil: "networkidle" });

  // 1. Exactly one form instance (guards against duplicate/hidden renders).
  assert.equal(await page.locator("form").count(), 1, "expected exactly one <form> on the page");

  // 2. Fill exclusively via accessibility roles/labels, the way AX-based
  //    agent browsers do. Keystroke typing on the name field specifically
  //    covers the regression observed with macOS accessibility insertion.
  const nameBox = page.getByRole("textbox", { exact: true, name: "Name" });
  assert.equal(await nameBox.count(), 1, "name textbox must be reachable via its accessible label");
  await nameBox.click();
  await page.keyboard.type(NAME, { delay: 20 });
  assert.equal(await nameBox.inputValue(), NAME, "name field must retain typed value");

  await page.getByRole("textbox", { exact: true, name: "E-Mail" }).fill(EMAIL);
  await page.getByRole("textbox", { exact: true, name: "Nachricht" }).fill(MESSAGE);

  // 3. Submit and verify the payload the form sends for the agent flow.
  await page.getByRole("button", { name: /Nachricht senden/u }).click();
  await page.waitForTimeout(1500);
  assert.equal(sendMailRequests.length, 1, "submit must fire exactly one send-mail request");

  const payload = JSON.parse(sendMailRequests[0].postData() ?? "{}");
  assert.equal(payload.name, NAME, "submitted name must match");
  assert.equal(payload.email, EMAIL, "submitted email must match");
  assert.equal(payload.message, MESSAGE, "submitted message must match");
  assert.equal(payload.verify, "", "honeypot field must stay empty");

  // 4. Success feedback must be announced to the user.
  await page.getByText("Nachricht gesendet").waitFor({ timeout: 5000 });

  process.stdout.write(`agent-form-check: OK (${url}) — payload captured, no email sent (request intercepted).\n`);
} catch (error) {
  if (error instanceof Error && /Executable doesn't exist/u.test(error.message)) {
    process.stderr.write(
      "agent-form-check: Playwright browser missing. Run `bun run deps:visual:install-browser` first.\n",
    );
  } else {
    process.stderr.write(`agent-form-check: FAILED\n${error}\n`);
  }
  process.exitCode = 1;
} finally {
  await browser?.close();
}
