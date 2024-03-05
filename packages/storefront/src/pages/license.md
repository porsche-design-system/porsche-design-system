# License

By accessing, using or contributing to the Design System of Porsche ('**Porsche Design System**'), you agree to the
following licensing agreement ('**Agreement**') with Dr. Ing. h.c. F. Porsche AG, Germany ('**Porsche AG**'). Porsche
reserves the right to change and update this licensing agreement at any time.

<TableOfContents></TableOfContents>

## Agreement

<Markdown>
  <component :is="license"></component>
</Markdown>

## General Notices

Further information regarding license terms and – where required by license – source codes are available at
<p-link-pure :theme="this.$store.getters.storefrontTheme" icon="none" target="_blank" href="https://porsche.com/softwareinfo">www.porsche.com/softwareinfo</p-link-pure>
free of charge. Some licenses, however, require the provision of physical copies of source or object code. In this case,
you may obtain a copy of the source codes by contacting us at
<p-link-pure :theme="this.$store.getters.storefrontTheme" icon="none" target="_blank" href="https://porsche.com/softwareinfo">www.porsche.com/softwareinfo</p-link-pure>.
Furthermore, please contact us at the foregoing URL in case you need assistance regarding the exercise of rights
guaranteed by an Open Source License. A nominal fee (i.e., the cost of physically performing the distribution) will be
charged for these services.

**Note:** your copy of this product may not contain code covered by one or more of the licenses listed here, depending
on the exact product and version you choose.

## Open Source Software Notice

This software may or may not contain the following specific Open Source Software:

<p-link-pure :theme="this.$store.getters.storefrontTheme" icon="download" href="assets/compulsory-statement.txt" download>Download
Compulsory Statement</p-link-pure>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Markdown from '@/components/Markdown.vue';

@Component({
  components: {
    Markdown,
  },
})
export default class Code extends Vue {
  license = '';

  async mounted() {
    this.license = (await import('@/../../../LICENSE.md')).default; 
  }
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  // override nested Markdown component's `p:first-child: { margin-top: 0 }`  
  :deep(#agreement) {
    margin-bottom: $pds-spacing-fluid-small;
  }
</style>
