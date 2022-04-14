/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// eslint-disable-next-line import/no-unresolved
import Components from 'unplugin-vue-components/vite';
import Markdown from 'vite-plugin-md';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Components(),
    Markdown()],
});
