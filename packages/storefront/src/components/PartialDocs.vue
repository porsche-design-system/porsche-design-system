<template>
  <Playground :frameworkMarkup="frameworkMarkup"></Playground>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import { constantCase } from 'change-case';
  import { Framework, FrameworkMarkup } from '@/models';

  type Param = {
    value: string;
    comment?: string;
    usage?: string;
  };

  @Component
  export default class PartialDocs extends Vue {
    @Prop({ default: '' }) public name!: string;
    @Prop({ default: [{ value: '' }] }) public params!: Param[];
    @Prop({ default: 'body' }) public location!: string;

    public get activeFramework(): Framework {
      return this.$store.getters.selectedFramework;
    }

    public get frameworkMarkup(): FrameworkMarkup {
      const partialImportPath = `require('@porsche-design-system/components-js/partials').${this.name}`.replace(
        'js',
        this.activeFramework
      );
      const partialImportPathJs = partialImportPath.replace('vanilla-js', 'js').replace(/'/g, '\\"');
      const paramsJs = this.params.map(({ value }) => value.replace(/'/g, '\\"'))[0];
      const placeholder = `PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_${constantCase(this.name.replace('get', ''))}`;
      const scriptTag = 'script';

      const angularPartials = this.params
        .filter(({ value }) => !value.includes('withoutTags'))
        .map(({ value, comment }, index) =>
          [, comment && `// ${comment}`, (index !== 0 ? 'partialContent = ' : '') + `${this.name}(${value});`]
            .filter((x) => x)
            .join('\n  ')
        )
        .join('\n\n  ');

      const exampleAngular = `<!-- prerequisite -->
  <!-- docs: https://github.com/just-jeb/angular-builders/tree/master/packages/custom-webpack#index-transform -->
  npm i -D @angular-builders/custom-webpack

  <!-- angular.json -->
  ...
  "architect": {
    "build": {
  -   "builder": "@angular-devkit/build-angular:browser",
  +   "builder": "@angular-builders/custom-webpack:browser",
      "options": {
        "outputPath": "dist/components-angular",
  +     "indexTransform": "./scripts/transformIndexHtml.ts"
        ...

  <!-- ./scripts/transformIndexHtml.ts -->
  import type { TargetOptions } from '@angular-builders/custom-webpack';
  import { ${this.name} } from '@porsche-design-system/components-angular/partials';

  export default (targetOptions: TargetOptions, indexHtml: string): string => {
    let partialContent = ${angularPartials}

    return indexHtml.replace(/(<\\/${this.location}>)/, \`\\n\${partialContent}$1\`);
  };`;

      const exampleReact =
        `<${this.location}>\n  ` +
        this.params
          .map(({ value, comment, usage }, index, array) => {
            const needsTag = value.includes('withoutTags');
            const openingScriptTag = needsTag ? `<${scriptTag}>` : '';
            const closingScriptTag = needsTag ? `</${scriptTag}>` : '';
            const isFirstWithoutTags =
              needsTag && index <= array.findIndex(({ value }) => value.includes('withoutTags'));

            return [
              isFirstWithoutTags && '<!-- Without tags -->',
              comment && `<!-- ${comment} -->`,
              usage?.replace('$$$PARTIAL$$$', `${partialImportPath}(${value})`) ||
                `${openingScriptTag}<%= ${partialImportPath}(${value}) %>${closingScriptTag}`,
            ]
              .filter((x) => x)
              .join('\n  ');
          })
          .join('\n\n  ') +
        `\n</${this.location}>`;

      const exampleJs = `<!-- index.html -->
  <${this.location}>
    <!--${placeholder}-->
  </${this.location}>

  <!-- package.json (tested on macOS, the script may need to be adjusted depending on the operating system used) -->
  <!-- make sure to adjust the path to the index.html file -->
  "scripts": {
    "prestart": "yarn replace",
    "replace": "placeholder='<!--${placeholder}-->' && partial=$placeholder$(node -e 'console.log(${partialImportPathJs}(${paramsJs}))') && regex=$placeholder'.*' && sed -i '' -E -e \\"s@$regex@$partial@\\" index.html"
  }`;

      return {
        'vanilla-js': exampleJs,
        angular: exampleAngular,
        react: exampleReact,
      };
    }
  }
</script>
