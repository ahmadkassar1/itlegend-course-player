import assert from "node:assert/strict";
import { ESLint } from "eslint";

// Exercise the compatibility bridge against real rules, without writing bad app code.
const eslint = new ESLint();
const [result] = await eslint.lintText(
  `import { useState } from "react";
   export default function LintProbe() {
     if (Date.now() > 0) useState(0);
     return <img src="/missing-alt.png" />;
   }`,
  { filePath: "src/lint-verification.tsx" },
);
const activeRules = new Set(result.messages.map((message) => message.ruleId));
for (const rule of [
  "react-hooks/rules-of-hooks",
  "jsx-a11y/alt-text",
  "@next/next/no-img-element",
]) {
  assert.ok(
    activeRules.has(rule),
    `Expected lint guard did not report: ${rule}`,
  );
}
console.log("Next.js, React Hooks and accessibility lint guards are active.");
