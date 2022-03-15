<template>
  <div>
    <Playground :frameworkMarkup="frameworkMarkup"></Playground>
    <br /><br />
    <p-text>
      You can find an implemented example in our
      <a href="https://github.com/porscheui/sample-integration-vanillajs">Sample VanillaJS Integration</a>,
      <a href="https://github.com/porscheui/sample-integration-angular">Sample Angular Integration</a>,
      <a href="https://github.com/porscheui/sample-integration-react">Sample React Integration</a> or
      <a href="https://github.com/porscheui/sample-integration-nextjs">Sample NextJS Integration</a>
    </p-text>
  </div>
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
        .map(({ value, comment }, index) =>
          [
            comment && `// Alternative: ${comment}`,
            (index !== 0 ? 'partialContent = ' : '') + `${this.name}(${value});`,
          ]
            .filter((x) => x)
            .join(glue)
        )
        .join('\n\n  ');

      const exampleAngular = `<!-- prerequisite -->
  <!-- docs: https://github.com/just-jeb/angular-builders/tree/master/packages/custom-webpack#index-transform -->
  npm install --save-dev @angular-builders/custom-webpack
  <!-- or via yarn -->
  yarn add --dev @angular-builders/custom-webpack

  <!-- angular.json -->
  ...
  "architect": {
    "build": {
  -   "builder": "@angular-devkit/build-angular:browser",
  +   "builder": "@angular-builders/custom-webpack:browser",
      "options": {
        "outputPath": "dist/components-angular",
  +     "indexTransform": "./scripts/transformIndexHtml.ts",
        ...

  <!-- ./scripts/transformIndexHtml.ts -->
  import type { TargetOptions } from '@angular-builders/custom-webpack';
  import { ${this.name} } from '${partialPackage}';

  export default (targetOptions: TargetOptions, indexHtml: string): string => {
    let partialContent = ${angularPartials}

    return indexHtml.replace(/(<\\/${this.location}>)/, \`\\n\${partialContent}$1\`);
  };`;

      const partialRequirePath = `require('${partialPackage}').${this.name}`;
      const partialRequirePathJs = partialRequirePath.replace('vanilla-js', 'js');

      const exampleReact =
        `<${this.location}>\n  ` +
        this.params
          .map(({ value, comment }) =>
            [comment && `<!-- Alternative: ${comment} -->`, `<%= ${partialRequirePath}(${value}) %>`]
              .filter((x) => x)
              .join(glue)
          )
          .join('\n\n  ') +
        `\n</${this.location}>`;

      const placeholder = `PLACEHOLDER_${constantCase(this.name.replace('get', ''))}`;
      const jsPartials = this.params
        .map(({ value, comment }) => {
          const partialCall = `${partialRequirePathJs}(${value})`.replace(/'/g, '\\"'); // transform quotes
          return [
            comment && `<!-- Alternative: ${comment} -->`,
            `"replace": "placeholder='<!--${placeholder}-->' && partial=$placeholder$(node -e 'console.log(${partialCall})') && regex=$placeholder'.*' && sed -i '' -E -e \\"s^$regex^$partial^\\" index.html"`,
          ]
            .filter((x) => x)
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

      return {
        'vanilla-js': exampleJs,
        angular: exampleAngular,
        react: exampleReact,
      };
    }
  }
</script>
