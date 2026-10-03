import { defineConfig, globalIgnores } from "eslint/config";
import { fixupConfigRules } from "@eslint/compat";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  // Official bridge for legacy rule context APIs in Next's React/import plugins.
  ...fixupConfigRules([...nextVitals, ...nextTs]),
  globalIgnores([".next/**", "out/**", "next-env.d.ts", "verification/**"]),
]);
