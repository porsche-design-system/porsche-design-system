<script setup lang="ts">
  import { type LinkTileProductUpdateEvent, PLinkTileProduct, PTag } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const liked = ref(false);

  const handleLikeChange = (e: LinkTileProductUpdateEvent): void => {
    liked.value = !e.liked;
  };
</script>

<template>
  <PLinkTileProduct
    :heading="'Some product name'"
    :price="'911€'"
    :info="'Some info'"
    :href="'https://www.porsche.com'"
    :liked="liked"
    @likeChange="handleLikeChange"
  >
    <slot name="header">
      <PTag :color="'background-base'">New</PTag>
    </slot>
    <img src="/assets/image-grid.png" width="3000" height="2000" alt="Some alt text" />
  </PLinkTileProduct>
</template>
