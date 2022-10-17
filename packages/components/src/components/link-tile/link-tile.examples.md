# Link Tile

<Playground :markup="temp" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  config = { themeable: true };
  
  temp = `<div class="container">
<p-link-tile
  label="Some label"
  description="Default"
  href="#"
>
  <img slot="image" src="${require('../../assets/porsche_beach.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Size inherit"
  href="#"
  size="inherit"
>
  <img slot="image" src="${require('../../assets/porsche_factory.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Size medium"
  href="#"
  size="medium"
>
  <img slot="image" src="${require('../../assets/porsche_office.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Size large"
  href="#"
  size="large"
>
  <img slot="image" src="${require('../../assets/porsche_white_background.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Weight bold"
  href="#"
  weight="bold"
>
  <img slot="image" src="${require('../../assets/surfer.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Aspect ratio 1:1"
  href="#"
  aspect-ratio="1:1"
>
  <img slot="image" src="${require('../../assets/porsche_beach.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Aspect ratio 3:4"
  href="#"
  aspect-ratio="3:4"
>
  <img slot="image" src="${require('../../assets/porsche_factory.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Aspect ratio 16:9"
  href="#"
  aspect-ratio="16:9"
>
  <img slot="image" src="${require('../../assets/porsche_office.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Aspect ratio 9:16"
  href="#"
  aspect-ratio="9:16"
>
  <img slot="image" src="${require('../../assets/porsche_white_background.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Compact align top"
  href="#"
  align="top"
  compact="true"
>
  <img slot="image" src="${require('../../assets/surfer.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Gradient false"
  href="#"
  gradient="false"
>
  <img slot="image" src="${require('../../assets/porsche_beach.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Compact"
  href="#"
  compact="true"
>
  <img slot="image" src="${require('../../assets/porsche_office.jpg')}" />
</p-link-tile>

</div>`
}
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: 22% 22% 22% 22%;
    grid-template-rows: auto;
    grid-template-areas: 'one two three four';
    column-gap: 1.33333%;
    row-gap: 10px;
  }
</style>
