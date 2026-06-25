<script setup lang="ts">
  import { PTextList, PTextListItem } from '@porsche-design-system/components-vue';
</script>

<template>
  <PTextList>
    <PTextListItem>
      The quick brown fox jumps over the lazy dog
    </PTextListItem>
    <PTextListItem>
      The quick brown fox jumps over the lazy dog
      <PTextList>
        <PTextListItem>
          The quick brown fox jumps over the lazy dog
        </PTextListItem>
        <PTextListItem>
          The quick brown fox jumps over the lazy dog
        </PTextListItem>
      </PTextList>
    </PTextListItem>
    <PTextListItem>
      The quick brown fox jumps over the lazy dog
    </PTextListItem>
  </PTextList>
</template>
