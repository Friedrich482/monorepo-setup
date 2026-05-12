import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

import js from "@eslint/js";
import commonLintConfig from "@repo/eslint-config/lint";

export default [
  ...commonLintConfig,
  ...tseslint.configs.recommended,
  js.configs.recommended,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,

  { ignores: ["./dist/**"] },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
];
