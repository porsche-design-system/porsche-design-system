<script setup lang="ts">
import { type LinkTileProductLikeEventDetail, PLinkTileProduct, PTag } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const liked = ref(false);

const handleLike = (e: CustomEvent<LinkTileProductLikeEventDetail>): void => {
  liked.value = !e.detail.liked;
};
</script>

<template>
  <PLinkTileProduct
    :heading="'Some product name'"
    :price="'1.911,00 €'"
    :description="'Some description'"
    :href="'https://porsche.com'"
    :liked="liked"
    @like="handleLike"
  >
    <slot name="header">
      <PTag :color="'background-base'">New</PTag>
    </slot>
    <img src="http://localhost:3002/placeholder_800x900.svg" width="800" height="900" alt="Some alt text" />
  </PLinkTileProduct>
</template>
