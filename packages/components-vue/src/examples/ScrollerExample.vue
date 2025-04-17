<script setup lang="ts">
import {
  PButton,
  PScroller,
  PTagDismissible,
  type ScrollerScrollToPosition,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const scrollToPosition = ref<ScrollerScrollToPosition>({
  scrollPosition: 220,
  isSmooth: false,
});
const onClick = (scrollPosition: number): void => {
  scrollToPosition.value = { scrollPosition: scrollPosition, isSmooth: true };
};
</script>

<template v-html="style">
  <PButton type="button" @click="onClick(0)" :compact="true">Scroll to start</PButton>
  <PButton type="button" @click="onClick(220)" :compact="true">Scroll to middle</PButton>
  <PButton type="button" @click="onClick(720)" :compact="true">Scroll to end</PButton>

  <div :style="{ maxWidth: '400px', whiteSpace: 'nowrap' }">
    <PScroller :scrollToPosition="scrollToPosition">
      <PTagDismissible>START - some tag content</PTagDismissible>
      <PTagDismissible>MIDDLE - some tag content</PTagDismissible>
      <PTagDismissible>END - some tag content</PTagDismissible>
    </PScroller>
  </div>
</template>

<style scoped>
  p-scroller > *:not(:last-child) {
    margin-right: 1rem;
  }

  button {
    margin: 0 1rem 1rem 0;
  }
</style>
