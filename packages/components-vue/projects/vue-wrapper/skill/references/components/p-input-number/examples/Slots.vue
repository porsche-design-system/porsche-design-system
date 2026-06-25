<script setup lang="ts">
  import { PButtonPure, PIcon, PInputNumber, PPopover } from '@porsche-design-system/components-vue';
</script>

<template>
  <PInputNumber state="error">
    <span slot="label">
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
    <span slot="description">
      Some description with a 
      <a href="https://designsystem.porsche.com" class="underline">
        link
      </a>
      .
    </span>
    <PIcon slot="start" name="shopping-cart" color="contrast-medium" :aria-hidden="true"></PIcon>
    <PButtonPure slot="end" icon="delete" :hideLabel="true" class="p-(--ref-p-input-slotted-padding) m-(--ref-p-input-slotted-margin)" :aria="{'aria-label': 'Delete'}"></PButtonPure>
    <span slot="message">
      Some error message with a 
      <a href="https://designsystem.porsche.com" class="underline">
        link
      </a>
      .
    </span>
  </PInputNumber>
</template>
