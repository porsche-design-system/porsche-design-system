<script setup lang="ts">
  import { PAiTag, PCheckbox, PFieldset, PText } from '@porsche-design-system/components-vue';
</script>

<template>
  <PFieldset label="Pick your favorite Fruits" labelSize="small" class="flex flex-col gap-static-sm">
    <PText class="-mt-static-md mb-static-sm">
      Slotted description with optional link
    </PText>
    <div class="flex flex-col gap-static-sm">
      <PCheckbox>
        <span slot="label">
          Banana
          <PAiTag variant="generated" class="ms-static-sm"></PAiTag>
        </span>
      </PCheckbox>
      <PCheckbox label="Apple"></PCheckbox>
      <PCheckbox :checked="true">
        <span slot="label">
          Melon
          <PAiTag variant="abbreviation" class="ms-static-sm"></PAiTag>
        </span>
      </PCheckbox>
      <PCheckbox label="Grapefruit"></PCheckbox>
    </div>
  </PFieldset>
</template>
