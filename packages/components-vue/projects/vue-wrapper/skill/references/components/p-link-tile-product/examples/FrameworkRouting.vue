<script setup lang="ts">
  import { ref } from 'vue';
  import { PLinkTileProduct, type LinkTileProductLikeEvent } from '@porsche-design-system/components-vue';

  const liked = ref(false);

  const onLike = (e: CustomEvent<LinkTileProductLikeEvent>) => {
    liked.value = !e.detail.liked;
  }
</script>

<template>
  <PLinkTileProduct :liked="liked" heading="Some product" price="718,00 €" priceOriginal="911,00 €" description="Some description" href="https://porsche.com" @like="onLike">
    <a slot="anchor" href="https://porsche.com">
      Weekender, sale price 718,00 €, original price 
      <s>
        911,00 €
      </s>
    </a>
    <img src="assets/placeholder_800x900.svg" :width="800" :height="900" alt="Some alt text" />
  </PLinkTileProduct>
</template>
