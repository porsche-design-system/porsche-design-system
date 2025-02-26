import type { PartialCall, PartialLocation, Partials } from '@/models/partials';
import { formatPartialParams } from '@/utils/partials/formatPartialParams';
import { camelCase } from 'change-case';

export const getVuePartialExample = (name: Partials, location: PartialLocation, partialCalls: PartialCall[]) => {
  const partialImportPath = '@porsche-design-system/components-vue/partials';
  const partialRequirePath = `require('${partialImportPath}').${name}`;
  const glue = '\n  ';

  const vuePartials = partialCalls
    .map(({ params, comment }) => {
      return [
        comment && `        // ${comment}`,
        `        ${camelCase(name.replace('get', ''))}: ${partialRequirePath}({ ${formatPartialParams(params)} }),`,
      ]
        .filter(Boolean)
        .join(glue);
    })
    .join('\n\n  ');

  return `<!-- prerequisite -->
<!-- docs: https://github.com/vbenjs/vite-plugin-html -->
yarn add --dev vite-plugin-html

<!-- index.html -->
<${location}>
  <%- ${camelCase(name.replace('get', ''))} %>
</${location}>

<!-- vite.config.ts -->
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      inject: {
        data: {
  ${vuePartials}
        },
      },
    }),
  ],
})`;
};
