import react from '@vitejs/plugin-react';
import * as path from 'node:path';
import { defineConfig } from 'vite';

const pkgJson = require('./package.json');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Ui',
      fileName: (format) => `ui.${format}.js`,
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: Object.keys(pkgJson.dependencies),
    },
  },
});
