# Carousel

The `p-carousel` is...

<TableOfContents></TableOfContents>

## Basic

<Playground :markup="basic"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  basic = `<p-carousel slides-per-page="{base: 3, s: 1, m: 3}">
  <div>slide 1</div>
  <div>slide 2</div>
  <div>slide 3</div>
  <div>slide 4</div>
  <div>slide 5</div>
  <div>slide 6</div>
</p-carousel>`;
}
</script>

<style scoped lang="scss">
  :deep(p-carousel div) {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #00b0f4;
    height: 200px;
  }
</style>
