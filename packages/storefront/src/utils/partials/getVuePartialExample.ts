import { camelCase } from 'change-case';
import type { PartialCall, PartialLocation, Partials } from '@/models/partials';
import { formatPartialParams } from '@/utils/partials/formatPartialParams';

export const getVuePartialExample = (name: Partials, location: PartialLocation, partialCalls: PartialCall[]) => {
  const partialImportPath = '@porsche-design-system/components-vue/partials';
  const partialRequirePath = `require('${partialImportPath}').${name}`;
  const glue = '\n  ';

  const vuePartials = partialCalls
    .map(({ params, comment }) => {
      return [
        comment && `        // ${comment}`,
        `        ${camelCase(name.replace('get', ''))}: ${partialRequirePath}(${formatPartialParams(params)}),`,
      ]
        .filter(Boolean)
        .join(glue);
    })
    .join('\n\n  ');

  return `<!-- prerequisite -->
<!-- docs: https://github.com/vbenjs/vite-plugin-html -->
npm instal vite-plugin-html -D

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
