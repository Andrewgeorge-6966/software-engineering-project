// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [
      'dist/*',
      'App.js',
      'src/navigation/**',
      'src/screens/**',
      'src/services/**',
      'src/components/IssueComment.jsx',
      'src/components/StatusBadge.jsx',
      'src/theme/colors.js',
    ],
  },
]);
