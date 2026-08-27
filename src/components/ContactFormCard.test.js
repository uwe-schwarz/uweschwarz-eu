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
  assert.equal(contactFormSource.match(/toolparamdescription:/gu)?.length, 3);
});
