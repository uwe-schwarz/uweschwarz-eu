import assert from "node:assert/strict";
import test from "node:test";

import { extractVercelBuildLog } from "../.agents/skills/deps-upgrade-autopilot/scripts/extract-vercel-build-log.mjs";
import {
  deploymentHostFromUrl,
  deploymentIdFromInspectorUrl,
  selectFailedVercelDeploymentUrl,
  validateVercelDeploymentInspectorUrl,
} from "../.agents/skills/deps-upgrade-autopilot/scripts/select-vercel-deployment-url.mjs";

const inspectorUrl = "https://vercel.com/e38383/uweschwarz-eu/BsGS93bz1YraC6BihJLrLLSDpbYK";

test("converts a validated Vercel inspector URL to the CLI deployment ID", () => {
  assert.equal(validateVercelDeploymentInspectorUrl(inspectorUrl), inspectorUrl);
  assert.equal(deploymentIdFromInspectorUrl(inspectorUrl), "dpl_BsGS93bz1YraC6BihJLrLLSDpbYK");
});

test("selects exactly one failed Vercel check as a deployment ID", () => {
  assert.equal(
    selectFailedVercelDeploymentUrl({
      statusCheckRollup: [
        { __typename: "StatusContext", context: "CodeRabbit", state: "SUCCESS" },
        { __typename: "StatusContext", context: "Vercel", state: "FAILURE", targetUrl: inspectorUrl },
      ],
    }),
    "dpl_BsGS93bz1YraC6BihJLrLLSDpbYK",
  );
});

test("rejects ambiguous or malformed inspector targets", () => {
  assert.throws(() => deploymentIdFromInspectorUrl("https://example.com/e38383/uweschwarz-eu/value"));
  assert.throws(() => deploymentIdFromInspectorUrl(`${inspectorUrl}/extra`));
  assert.throws(() =>
    selectFailedVercelDeploymentUrl({
      statusCheckRollup: [
        { __typename: "StatusContext", context: "Vercel", state: "FAILURE", targetUrl: inspectorUrl },
        { __typename: "CheckRun", conclusion: "FAILURE", detailsUrl: inspectorUrl, name: "Vercel" },
      ],
    }),
  );
});

test("validates a fresh deployment URL and returns only its hostname", () => {
  assert.equal(
    deploymentHostFromUrl("https://uweschwarz-qj7p8jr1s-e38383.vercel.app"),
    "uweschwarz-qj7p8jr1s-e38383.vercel.app",
  );
  assert.throws(() => deploymentHostFromUrl("https://vercel.app"));
  assert.throws(() => deploymentHostFromUrl("https://preview.vercel.app/path"));
  assert.throws(() => deploymentHostFromUrl("https://preview.vercel.app/?token=value"));
});

test("extracts only bounded stdout and stderr build text", () => {
  assert.equal(
    extractVercelBuildLog([
      { text: "Installing dependencies", type: "stdout" },
      { text: "ignored", type: "delimiter" },
      { text: "Command failed", type: "stderr" },
    ]),
    "Installing dependencies\nCommand failed\n",
  );
  assert.throws(() => extractVercelBuildLog({ events: [] }));
  assert.throws(() => extractVercelBuildLog([{ text: "ignored", type: "delimiter" }]));
});
