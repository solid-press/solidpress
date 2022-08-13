import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import windicssPlugin from 'vite-plugin-windicss';

export default defineConfig({
  plugins: [solidPlugin(), windicssPlugin({
    scan: {
      fileExtensions: ['html', 'js', 'ts', 'jsx', 'tsx'],
    },
  })],
  server: {
    port: 3456,
  },
  build: {
    target: 'esnext',
  },
});
