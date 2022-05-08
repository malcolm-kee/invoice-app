// @ts-check
const { defineConfig } = require('react-showroom');
const path = require('path');

module.exports = defineConfig({
  require: ['tailwindcss/tailwind.css'],
  componentsEntry: {
    name: 'ui',
    path: path.resolve(__dirname, 'src/index.ts'),
  },
  webpackConfig: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src/'),
      },
    },
  },
});
