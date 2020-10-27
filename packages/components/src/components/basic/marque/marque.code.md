# Marque

Porsche marque component for visualizing the main Porsche logo.

## Variants

### Marque with registered trademark (®)

<Playground :markup="marqueWithTM"></Playground>

### Marque without registered trademark (®)
<Playground :markup="marqueWithoutTM"></Playground>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class Code extends Vue {
    marqueWithTM = `<p-marque></p-marque>`;
    marqueWithoutTM = `<p-marque trademark="false"></p-marque>`;
  }
</script>