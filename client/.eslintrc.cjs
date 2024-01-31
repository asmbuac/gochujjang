module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "no-console": ["error"],
    "react/no-unescaped-entities": ["off"],
    "react-hooks/exhaustive-deps": ["off"],
    "react/display-name": ["off"],
    "react-hooks/rules-of-hooks": ["off"],
    "react/prop-types": ["off"],
    "react-refresh/only-export-components": ["off"],
  },
};
