<script setup lang="ts">
  import { type LinkTileProductLikeUpdateEvent, PLinkTileProduct, PTag } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const liked = ref(false);

  const handleLike = (e: LinkTileProductLikeUpdateEvent): void => {
    liked.value = !e.liked;
  };
</script>

<template>
  <PLinkTileProduct
    :heading="'Some product name'"
    :price="'1.911,00 €'"
    :description="'Some info'"
    :href="'https://www.porsche.com'"
    :liked="liked"
    @like="handleLike"
  >
    <slot name="header">
      <PTag :color="'background-base'">New</PTag>
    </slot>
    <img src="/assets/placeholder_800x900.svg" width="3000" height="2000" alt="Some alt text" />
  </PLinkTileProduct>
</template>
