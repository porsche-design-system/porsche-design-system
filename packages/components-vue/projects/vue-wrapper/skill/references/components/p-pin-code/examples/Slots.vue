<script setup lang="ts">
  import { PPinCode, PPopover } from '@porsche-design-system/components-vue';
</script>

<template>
  <PPinCode state="error">
    <span slot="label" id="some-label-id">
      Some label with a 
      <a href="https://designsystem.porsche.com" class="underline">
        link
      </a>
       and a "label-after" slot.
    </span>
    <PPopover slot="label-after">
      Some Popover content with a 
      <a href="https://designsystem.porsche.com" class="underline">
        link
      </a>
      .
    </PPopover>
    <span slot="description" id="some-description-id">
      Some description with a 
      <a href="https://designsystem.porsche.com" class="underline">
        link
      </a>
      .
    </span>
    <span slot="message" id="some-message-id">
      Some error message with a 
      <a href="https://designsystem.porsche.com" class="underline">
        link
      </a>
      .
    </span>
  </PPinCode>
</template>
