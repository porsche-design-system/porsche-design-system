<template>
  <div>
    <PSelect name="options" label="Some Label" value="a">
      <PSelectOption title="visible" value="a"> Option should be visible (no hidden attribute) </PSelectOption>
      <PSelectOption title="hidden" value="b" hidden>
        Option shouldn't be visible (hidden attribute without value)
      </PSelectOption>
      <PSelectOption title="hidden" value="c" :hidden="true">
        Option shouldn't be visible (hidden attribute with boolean true)
      </PSelectOption>
      <PSelectOption title="visible" value="d" :hidden="false">
        Option should be visible (hidden attribute with boolean false)
      </PSelectOption>
    </PSelect>

    <PButton title="visible" name="option" value="A" type="submit">
      Button should be visible (no hidden attribute)
    </PButton>
    <PButton title="hidden" name="option" value="A" type="submit" hidden>
      Button shouldn't be visible (hidden attribute without value)
    </PButton>
    <PButton title="hidden" name="option" value="B" type="submit" :hidden="true">
      Button shouldn't be visible (hidden attribute with boolean true)
    </PButton>
    <PButton title="visible" name="option" value="B" type="submit" :hidden="false">
      Button should be visible (hidden attribute with boolean false)
    </PButton>
  </div>
</template>
<script setup lang="ts">
  import { PButton, PSelect, PSelectOption } from '../../dist/vue-wrapper';
</script>
