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

      const examplesReact =
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

      const examplesJs = `// index.html
<${this.location}>
  <!--${placeholder}-->
</${this.location}>

// package.json (tested on macOS, the script may need to be adjusted depending on the operating system used)
// make sure to adjust the path to the index.html file
"scripts": {
  "prestart": "yarn replace",
  "replace": "placeholder='<!--${placeholder}-->' && partial=$placeholder$(node -e 'console.log(${partialImportPathJs}(${paramsJs}))') && regex=$placeholder'.*' && sed -i '' -E -e \\"s@$regex@$partial@\\" index.html"
}`;

      return {
        'vanilla-js': examplesJs,
        react: examplesReact,
        angular: `coming soon`,
      };
    }
  }
</script>
