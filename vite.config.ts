import path from 'node:path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import react from '@vitejs/plugin-react';

import { manifestForPlugIn } from './manifest';

export default defineConfig(({ mode }) => ({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: mode === 'development',
  },
}));
