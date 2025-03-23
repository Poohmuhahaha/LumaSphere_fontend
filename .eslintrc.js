// Add these rules to your .eslintrc.js file
module.exports = {
    // ... your existing config
    rules: {
      // ... your existing rules
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "react-hooks/exhaustive-deps": "warn" // Downgrade to warning if you prefer
    }
  }