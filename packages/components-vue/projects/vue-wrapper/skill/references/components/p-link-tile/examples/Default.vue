<script setup lang="ts">
  import { PLinkTile, PTag, PText } from '@porsche-design-system/components-vue';
</script>

<template>
  <PLinkTile href="https://porsche.com" label="Some label" description="Some Description" :gradient="true">
    <PTag slot="header" color="background-frosted" :compact="true">
      Some tag
    </PTag>
    <img src="assets/lights.jpg" alt="Some image description" />
    <PText slot="footer">
      Some footer text
    </PText>
  </PLinkTile>
</template>
