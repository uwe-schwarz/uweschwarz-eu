import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { URL } from "node:url";

const contactFormSource = readFileSync(new URL("./ContactFormCard.tsx", import.meta.url), "utf8");

test("exposes the contact form as an auto-submitting WebMCP tool", () => {
  assert.match(contactFormSource, /toolname: "contact_uwe"/u);
  assert.match(contactFormSource, /"Send a professional inquiry/u);
  assert.match(contactFormSource, /toolautosubmit: ""/u);
  assert.match(contactFormSource, /explicitly wants agents to submit this form/u);
});

test("describes every user-provided WebMCP parameter", () => {
  assert.match(contactFormSource, /name: \{ toolparamdescription: "Full name/u);
  assert.match(contactFormSource, /email: \{ toolparamdescription: "Email address/u);
  assert.match(contactFormSource, /message: \{\s+toolparamdescription: "The complete inquiry/su);
  assert.match(contactFormSource, /\.\.\.webMcpParameterDescriptions\.name/u);
  assert.match(contactFormSource, /\.\.\.webMcpParameterDescriptions\.email/u);
  assert.match(contactFormSource, /\.\.\.webMcpParameterDescriptions\.message/u);
  assert.equal(contactFormSource.match(/^\s+required$/gmu)?.length, 3);
  assert.match(contactFormSource, /minLength=\{2\}/u);
  assert.match(contactFormSource, /minLength=\{10\}/u);
});

test("returns a structured result for agent-invoked submissions", () => {
  assert.match(contactFormSource, /submitEvent\.agentInvoked/u);
  assert.match(contactFormSource, /submitEvent\.respondWith\(response\)/u);
  assert.match(contactFormSource, /success: true/u);
  assert.match(contactFormSource, /failed validation/u);
});
