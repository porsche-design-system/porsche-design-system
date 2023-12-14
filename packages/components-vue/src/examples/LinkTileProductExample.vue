<script setup lang="ts">
  import { type LinkTileProductLikeEvent, PLinkTileProduct, PTag } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const liked = ref(false);

  const handleLike = (e: LinkTileProductLikeEvent): void => {
    liked.value = !e.liked;
  };
</script>

<template>
  <PLinkTileProduct
    :heading="'Some product name'"
    :price="'1.911,00 €'"
    :description="'Some description'"
    :href="'https://www.porsche.com'"
    :liked="liked"
    @like="handleLike"
  >
    <slot name="header">
      <PTag :color="'background-base'">New</PTag>
    </slot>
    <img
      src="https://porsche-design-system.github.io/porsche-design-system/placeholder_800x900.svg"
      width="800"
      height="900"
      alt="Some alt text"
    />
  </PLinkTileProduct>
</template>
