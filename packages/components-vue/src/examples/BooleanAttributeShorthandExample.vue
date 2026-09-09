<script setup lang="ts">
  import { PInputText } from '../../dist/vue-wrapper';
</script>
<template>
  <div>
    <PInputText id="shorthand" name="shorthand" label="Some label" hide-label />
    <PInputText id="explicit-true" name="explicit-true" label="Some label" :hide-label="true" />
    <PInputText id="explicit-false" name="explicit-false" label="Some label" :hide-label="false" />
    <PInputText id="omitted" name="omitted" label="Some label" />
  </div>
</template>
