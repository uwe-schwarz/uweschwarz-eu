import { describe, expect, test } from "bun:test";

import { OpenAiIcon } from "@/components/icons/openai";
import { skillsWithIcons } from "@/content/skills-with-icons";

describe("skillsWithIcons", () => {
  test("uses the OpenAI brand icon for OpenAI / ChatGPT", () => {
    const skill = skillsWithIcons.find((item) => item.name.en === "OpenAI / ChatGPT");

    expect(skill?.icon).toBe(OpenAiIcon);
  });
});
