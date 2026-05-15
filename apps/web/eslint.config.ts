import eslintPluginAstro from "eslint-plugin-astro";
import commonLintConfig from "@repo/eslint-config/lint";

export default [
  ...commonLintConfig,
  { ignores: ["**/eslint.config.ts", "./dist/**", "./.astro/**"] },
  {
    files: ["**/*.astro"],
    plugins: {
      astro: eslintPluginAstro,
    },
    languageOptions: {
      parser: eslintPluginAstro,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },
  ...eslintPluginAstro.configs.recommended,
];
