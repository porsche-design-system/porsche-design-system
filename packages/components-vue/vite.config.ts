import { viteStaticCopy } from 'vite-plugin-static-copy';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

const rootDir = '../..';
const projectDir = 'projects/vue-wrapper';
const outputDir = 'dist/vue-wrapper';
const input = `${projectDir}/src/public-api.ts`;

// https://vitejs.dev/config/
export default defineConfig({
  // optimizeDeps: {
  //   include: ['@porsche-design-system/components-js'],
  // },
  plugins: [
    vue(),
    vueJsx(),
    viteStaticCopy({
      targets: [
        { src: path.resolve(projectDir, 'package.json'), dest: path.resolve(outputDir) },
        { src: path.resolve(rootDir, 'LICENSE'), dest: path.resolve(outputDir) },
        { src: path.resolve(rootDir, 'OSS_NOTICE'), dest: path.resolve(outputDir) },
        { src: path.resolve(projectDir, 'README.md'), dest: path.resolve(outputDir) },
        { src: path.resolve(projectDir, 'package.json'), dest: path.resolve(outputDir) },
        { src: path.resolve(`${rootDir}/packages/components`, 'CHANGELOG.md'), dest: path.resolve(outputDir) },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: path.resolve(input),
      name: '@porsche-design-system/components-vue',
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ['vue', '@porsche-design-system/components-js'],
      output: {
        dir: path.resolve(outputDir),
        preserveModules: true,
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
