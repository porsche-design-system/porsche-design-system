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
    :price="'199,99€'"
    :info="'Some info'"
    :href="'/'"
    :liked="liked"
    @likeChange="handleLikeChange"
  >
    <PTag slot="tags" :color="'background-base'">New</PTag>
    <img src="/assets/link-tile-product-example-01.webp" alt="Some alt text" />
  </PLinkTileProduct>
</template>
