import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["node_modules", "dist", "build"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: reactPlugin,
      "react-hooks": reactHooks,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // prettier formatting
      "prettier/prettier": [
        "error",
        { singleQuote: true, semi: true, trailingComma: "all", endOfLine: "auto" },
      ],

      // base rules
      "no-console": "warn",
      "no-debugger": "error",

      // ts rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        { allowExpressions: true },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "warn",

      // react
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-boolean-value": ["error", "always"],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "always", children: "never" },
      ],

      // hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // import
      "import/order": [
        "error",
        { "newlines-between": "always", alphabetize: { order: "asc" } },
      ],
      "import/no-unresolved": "error",
      "import/no-duplicates": "error",
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    rules: {
      // JS ფაილებში ცოტა უფრო თვრიენტული ვარიანტი
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
];
