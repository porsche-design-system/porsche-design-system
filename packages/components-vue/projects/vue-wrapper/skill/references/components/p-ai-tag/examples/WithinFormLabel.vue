<script setup lang="ts">
  import { PAiTag, POptgroup, PSelect, PSelectOption } from '@porsche-design-system/components-vue';
</script>

<template>
  <PSelect name="options" description="Some description">
    <span slot="label">
      Pick your favorite Fruits
      <PAiTag variant="abbreviation" class="ms-static-sm"></PAiTag>
    </span>
    <POptgroup label="Some optgroup label 1">
      <PSelectOption value="a">
        Option A
      </PSelectOption>
      <PSelectOption value="b">
        Option B
      </PSelectOption>
      <PSelectOption value="c">
        Option C
      </PSelectOption>
    </POptgroup>
    <POptgroup label="Some optgroup label 2">
      <PSelectOption value="d">
        Option D
      </PSelectOption>
      <PSelectOption value="e">
        Option E
      </PSelectOption>
      <PSelectOption value="f">
        Option F
      </PSelectOption>
    </POptgroup>
  </PSelect>
</template>
