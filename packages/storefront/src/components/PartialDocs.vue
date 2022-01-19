<template>
  <Playground :frameworkMarkup="frameworkMarkup"></Playground>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import { constantCase } from 'change-case';
  import { Framework, FrameworkMarkup } from '@/models';

  @Component
  export default class PartialDocs extends Vue {
    @Prop({ default: '' }) public name!: string;
    @Prop({ default: '' }) public params!: string;
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
      const paramsJs = this.params.replace(/'/g, '\\"');
      const placeholder = `PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_${constantCase(this.name.replace('get', ''))}`;
      const scriptTag = 'script';

      return {
        'vanilla-js': `// index.html
  <${this.location}>
    <!--${placeholder}-->
  </${this.location}>

  // package.json (tested on macOS, the script may need to be adjusted depending on the operating system used)
  // make sure to adjust the path to the index.html file
  "scripts": {
    "prestart": "yarn replace",
    "replace": "placeholder='<!--${placeholder}-->' && partial=$placeholder$(node -e 'console.log(${partialImportPathJs}(${paramsJs}))') && regex=$placeholder'.*' && sed -i '' -E -e \\"s@$regex@$partial@\\" index.html"
  }`,
        react: `// index.html

  <${this.location}>
    <%= ${partialImportPath}(${this.params}) %>

    // With custom prefix
    <%= ${partialImportPath}({ prefix: 'my-prefix' }) %>

    // With multiple custom prefixes
    <%= ${partialImportPath}({ prefix: ['my-prefix', 'another-prefix'] }) %>
  </${this.location}>

  <${this.location}>
    // without script tag
    <${scriptTag}><%= ${partialImportPath}({ withoutTags: true }) %></${scriptTag}>
  </${this.location}>`,
        angular: `ok`,
      };
    }
  }
</script>
