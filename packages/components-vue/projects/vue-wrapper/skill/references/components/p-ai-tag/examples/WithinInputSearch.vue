<script setup lang="ts">
  import { PAiTag, PInputSearch } from '@porsche-design-system/components-vue';
</script>

<template>
  <PInputSearch label="What's your favorite Fruit" description="Search for fruits" name="search">
    <PAiTag slot="end" variant="abbreviation"></PAiTag>
  </PInputSearch>
</template>
