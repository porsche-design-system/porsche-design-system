<script setup lang="ts">
  import { PAiTag, PHeading, PRadioGroup, PRadioGroupOption } from '@porsche-design-system/components-vue';
</script>

<template>
  <PHeading size="small" tag="h3">
    Pick your favorite Fruits
  </PHeading>

  <PRadioGroup label="Some Label" name="fruit" value="banana" class="mt-static-sm">
    <PRadioGroupOption value="banana">
      <span slot="label">
        Banana
        <PAiTag variant="generated" class="ms-static-sm"></PAiTag>
      </span>
    </PRadioGroupOption>
    <PRadioGroupOption value="apple" label="Apple"></PRadioGroupOption>
    <PRadioGroupOption value="melon">
      <span slot="label">
        Melon
        <PAiTag variant="abbreviation" class="ms-static-sm"></PAiTag>
      </span>
    </PRadioGroupOption>
    <PRadioGroupOption value="grapefruit" label="Grapefruit"></PRadioGroupOption>
  </PRadioGroup>
</template>
