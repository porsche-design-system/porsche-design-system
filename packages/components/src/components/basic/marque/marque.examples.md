# Marque

The marque gives the Porsche brand a distinctive look, sets it apart from others within the overall external image and represents the quality of the product. 

## Variants

### Marque with registered trademark (®)
In web applications for the United States and/or Canada as well as with international purpose *including* United States and/or Canada, the Porsche marque must always be used with the ®. The ® is optimized to match the respective crest size.

<Playground :markup="marqueWithTM"></Playground>

### Marque without registered trademark (®)
This variant is to be used whenever the United States and/or Canada are not part of the web application's target markets.
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