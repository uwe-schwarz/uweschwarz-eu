import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { URL } from "node:url";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import ContactFormCard from "./ContactFormCard";
import { PageFrame } from "../app/PageFrame";

const contactFormSource = readFileSync(new URL("./ContactFormCard.tsx", import.meta.url), "utf8");

const formMarkup = renderToString(
  createElement(PageFrame, { language: "en", pathname: "/" }, createElement(ContactFormCard)),
);

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
  for (const field of ["name", "email", "message"]) {
    assert.match(formMarkup, new RegExp(`name="${field}"[^>]*required=""|required=""[^>]*name="${field}"`, "u"));
  }
  assert.match(formMarkup, /minLength="2"/iu);
  assert.match(formMarkup, /minLength="10"/iu);
});

test("returns a structured result for agent-invoked submissions", () => {
  assert.match(contactFormSource, /submitEvent\.agentInvoked/u);
  assert.match(contactFormSource, /submitEvent\.respondWith\(response\)/u);
  assert.match(contactFormSource, /success: true/u);
  assert.match(contactFormSource, /failed validation/u);
});

test("assigns stable, agent-friendly ids to the contact form items", () => {
  // Accessibility-driven agent browsers resolve fields by their label/id
  // association; generated :r1: ids are not stable across renders/servers.
  for (const field of ["name", "email", "message"]) {
    assert.ok(formMarkup.includes(`id="contact-${field}-form-item"`));
    assert.ok(formMarkup.includes(`for="contact-${field}-form-item"`));
  }
});
