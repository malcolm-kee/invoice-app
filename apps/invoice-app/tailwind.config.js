module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/ui/dist/ui.es.js',
  ],
  presets: [require('ui/tailwind.config')],
};
