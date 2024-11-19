<template>
  <div>
    <Teaser class="teaser" />
    <Intro class="intro" />
    <Masonry class="masonry" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Teaser from '@/components/Teaser.vue';
import Intro from '@/components/Intro.vue';
import Masonry from '@/components/Masonry.vue';

@Component({
  components: { Teaser, Intro, Masonry },
})
export default class HomeView extends Vue {}
</script>

<style scoped lang="scss">
  @use '~@/styles/internal.variables.scss' as *;
  @use '@porsche-design-system/components-js/styles' as *;

  .teaser {
    margin-top: calc((#{$header-height} + #{$pds-spacing-fluid-x-large}) * -1);
  }

  .intro {
    margin-top: $pds-spacing-fluid-x-large;
  }

  .masonry {
    margin-top: $pds-spacing-fluid-large;
  }
</style>
