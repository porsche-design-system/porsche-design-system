<template>
  <div class="partial-docs">
    <Playground :frameworkMarkup="frameworkMarkup" :showCodeEditor="false"></Playground>
    <p-text :theme="$store.getters.storefrontTheme">
      You can find an implemented example in our
      <a href="https://github.com/porsche-design-system/sample-integration-vanillajs">Sample Integration Vanilla JS</a>,
      <a href="https://github.com/porsche-design-system/sample-integration-angular">Sample Integration Angular</a>,
      <a href="https://github.com/porsche-design-system/sample-integration-react">Sample Integration React</a> and
      <a href="https://github.com/porsche-design-system/sample-integration-nextjs">Sample Integration NextJS</a>
    </p-text>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { camelCase, constantCase } from 'change-case';
import type { Framework, FrameworkMarkup } from '@/models';

type Param = {
  value: string;
  comment?: string;
};

type PartialPackageName = 'components-js' | 'browser-notification';

@Component
export default class PartialDocs extends Vue {
  @Prop({ default: '' }) public name!: string;
  @Prop({ default: () => [{ value: '' }] }) public params!: Param[];
  @Prop({ default: 'body' }) public location!: string;
  @Prop({ default: 'components-js' }) public partialPackageName!: PartialPackageName;

  public get activeFramework(): Framework {
    return this.$store.getters.selectedFramework;
  }

  public get frameworkMarkup(): FrameworkMarkup {
    let partialPackage = `@porsche-design-system/${this.partialPackageName}`;
    if (this.partialPackageName === 'components-js') {
      partialPackage = `${partialPackage}/partials`.replace('js', this.activeFramework);
    }

    const glue = '\n  ';

    const angularPartials = this.params
      .map(({ value, comment }, i) =>
        [
          comment && `// ${i > 0 ? 'Alternative: ' : ''}${comment}`,
          `${i === 0 ? 'let ' : ''}partialContent = ${this.name}(${value});`,
        ]
          .filter(Boolean)
          .join(glue)
      )
      .join('\n\n  ');

    const exampleAngular = `<!-- prerequisite -->
<!-- docs: https://github.com/just-jeb/angular-builders/tree/master/packages/custom-webpack#index-transform -->
yarn add --dev @angular-builders/custom-webpack

<!-- angular.json -->
...
"architect": {
  "build": {
-   "builder": "@angular-devkit/build-angular:browser",
+   "builder": "@angular-builders/custom-webpack:browser",
    "options": {
      "outputPath": "dist/components-angular",
+     "indexTransform": "./scripts/injectPartials.ts",
    }
  }
  "serve": {
-   "builder": "@angular-devkit/build-angular:dev-server",
+   "builder": "@angular-builders/custom-webpack:dev-server",

<!-- ./scripts/injectPartials.ts -->
import type { TargetOptions } from '@angular-builders/custom-webpack';
import { ${this.name} } from '${partialPackage}';

export default (targetOptions: TargetOptions, indexHtml: string): string => {
  ${angularPartials}

  return indexHtml.replace(/<\\/${this.location}>/, \`\${partialContent}$&\`);
};`;

    const partialRequirePath = `require('${partialPackage}').${this.name}`;
    const partialRequirePathJs = partialRequirePath.replace('vanilla-js', 'js');

    const exampleReact =
      `<${this.location}>\n  ` +
      this.params
        .map(({ value, comment }, i) =>
          [comment && `<!-- ${i > 0 ? 'Alternative: ' : ''}${comment} -->`, `<%= ${partialRequirePath}(${value}) %>`]
            .filter(Boolean)
            .join(glue)
        )
        .join('\n\n  ') +
      `\n</${this.location}>`;

    const placeholder = `PLACEHOLDER_${constantCase(this.name.replace('get', ''))}`;
    const jsPartials = this.params
      .map(({ value, comment }, i) => {
        const partialCall = `${partialRequirePathJs}(${value})`.replace(/'/g, '\\"'); // transform quotes
        return [
          comment && `<!-- ${i > 0 ? 'Alternative: ' : ''}${comment} -->`,
          `"replace": "placeholder='<!--${placeholder}-->' && partial=$placeholder$(node -e 'console.log(${partialCall})') && regex=$placeholder'.*' && sed -i '' -E -e \\"s^$regex^$partial^\\" index.html"`,
        ]
          .filter(Boolean)
          .join(glue);
      })
      .join(glue);

    const exampleJs = `<!-- index.html -->
<${this.location}>
  <!--${placeholder}-->
</${this.location}>

<!-- package.json (tested on macOS, the script may need to be adjusted depending on the operating system used) -->
<!-- make sure to adjust the path to the index.html file -->
"scripts": {
  "prestart": "yarn replace",
  ${jsPartials}
}`;

    const exampleVue =
      `<!-- prerequisite -->
<!-- docs: https://github.com/vbenjs/vite-plugin-html -->
yarn add --dev vite-plugin-html

<!-- index.html -->
<${this.location}>
  <%- ${camelCase(this.name.replace('get', ''))} %>
</${this.location}>

<!-- vite.config.ts -->
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      inject: {
        data: {\n  ` +
      this.params
        .map(({ value, comment }, i) =>
          [
            comment && `        // ${i > 0 ? 'Alternative: ' : ''}${comment}`,
            `        ${camelCase(this.name.replace('get', ''))}: ${partialRequirePath}(${value}),`,
          ]
            .filter(Boolean)
            .join(glue)
        )
        .join('\n\n  ') +
      `\n        },
      },
    }),
  ],
})`;

    const nextExamples: { [key: string]: string } = {
      getMetaTagsAndIconLinks: `/* ./app/layout.tsx */
import type { Metadata, Viewport } from "next";
import { getMetaTagsAndIconLinks } from '@porsche-design-system/components-react/partials';

const { themeColor, appleWebApp, icons, manifest } = getMetaTagsAndIconLinks({
  appTitle: 'TITLE_OF_YOUR_APP',
  format: 'js',
  /* cdn: 'cn' // Alternative: force using China CDN */
});

export const viewport: Viewport = {
  themeColor,
};

export const metadata: Metadata = {
  appleWebApp,
  icons,
  /* Next.js currently automatically sets crossorigin="use-credentials" on the manifest link which causes cors problems */
  /* manifest */
};`,
      getComponentChunkLinks: `/* ./app/layout.tsx */
import React from 'react';
import { preload } from 'react-dom';
import { getComponentChunkLinks } from '@porsche-design-system/components-react/partials';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

getComponentChunkLinks({ format: 'js', components: ['button', 'marque'] }).forEach(
    ({ href, options }) => preload(href, options)
);

/* Alternative: force using China CDN */
getComponentChunkLinks({ format: 'js', components: ['button', 'marque'], cdn: 'cn' }).forEach(
    ({ href, options }) => preload(href, options)
);

/* root layout... */
`,
      getFontLinks: `/* ./app/layout.tsx */
import React from 'react';
import { preload } from 'react-dom';
import { getFontLinks } from '@porsche-design-system/components-react/partials';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

getFontLinks({ format: 'js' }).forEach(
    ({ href, options }) => preload(href, options)
);

/* Alternative: force using China CDN */
getFontLinks({ format: 'js', cdn: 'cn' }).forEach(
    ({ href, options }) => preload(href, options)
);

/* root layout... */`,
      getIconLinks: `/* ./app/layout.tsx */
import React from 'react';
import { prefetchDNS } from 'react-dom';
import { getIconLinks } from '@porsche-design-system/components-react/partials';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

getIconLinks({ format: 'js', icons: ['arrow-head-right', 'plus'] }).forEach(({ href }) => prefetchDNS(href));

/* Alternative: force using China CDN */
getIconLinks({ format: 'js', icons: ['arrow-head-right', 'plus'], cdn: 'cn' }).forEach(({ href }) => prefetchDNS(href));

/* root layout... */`,
      getInitialStyles: `/* ./components/partials.tsx */
"use client";
import { useServerInsertedHTML } from "next/navigation";
import { useRef } from 'react';
import { getInitialStyles } from "@porsche-design-system/components-react/partials";

export const Partials = () => {
  const isServerInserted = useRef(false);

  useServerInsertedHTML(() => {
    // There seems to be some strange behavior where Next calls this multiple times
    // To ensure this is only called once we use a ref
    if (!isServerInserted.current) {
      isServerInserted.current = true;
      return <>
        {getInitialStyles({ format: 'jsx' })}
        <!-- Alternative: force using China CDN -->
        {getInitialStyles({ format: 'jsx', cdn: 'cn' })}
      </>
    }
  });

  return null;
}

/* render </Partials> component in root layout */`,
      getFontFaceStylesheet: `/* ./components/partials.tsx */
"use client";
import { useServerInsertedHTML } from "next/navigation";
import { useRef } from 'react';
import { getFontFaceStylesheet } from "@porsche-design-system/components-react/partials";

export const Partials = () => {
  const isServerInserted = useRef(false);

  useServerInsertedHTML(() => {
    // There seems to be some strange behavior where Next calls this multiple times
    // To ensure this is only called once we use a ref
    if (!isServerInserted.current) {
      isServerInserted.current = true;
      return <>
          {getFontFaceStylesheet({ format: 'jsx' })}
          <!-- Alternative: force using China CDN -->
          {getFontFaceStylesheet({ format: 'jsx', cdn: 'cn' })}
      </>
    }
  });

  return null;
}

/* render </Partials> component in root layout */`,
      getFontFaceStyles: `/* ./components/partials.tsx */
"use client";
import { useServerInsertedHTML } from "next/navigation";
import { useRef } from 'react';
import { getFontFaceStyles } from "@porsche-design-system/components-react/partials";

export const Partials = () => {
  const isServerInserted = useRef(false);

  useServerInsertedHTML(() => {
    // There seems to be some strange behavior where Next calls this multiple times
    // To ensure this is only called once we use a ref
    if (!isServerInserted.current) {
      isServerInserted.current = true;
      return <>
          {getFontFaceStyles({ format: 'jsx' })}
          <!-- Alternative: force using China CDN -->
          {getFontFaceStyles({ format: 'jsx', cdn: 'cn' })}
      </>
    }
  });

  return null;
}

/* render </Partials> component in root layout */`,
    };

    return {
      'vanilla-js': exampleJs,
      angular: exampleAngular,
      react: exampleReact,
      vue: exampleVue,
      next: nextExamples[this.name],
    };
  }
}
</script>

<style scoped lang="scss">
  .partial-docs,
  p-text {
    margin-top: 1rem;
  }
</style>
