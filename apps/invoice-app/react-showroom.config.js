// @ts-check
const { defineConfig } = require('react-showroom');
const path = require('path');

module.exports = defineConfig({
  require: ['./src/index.css'],
  componentsEntry: {
    name: '~/components',
    path: path.resolve(__dirname, 'src/components/index.ts'),
  },
  webpackConfig: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src/'),
      },
    },
  },
});
