<script setup lang="ts">
  import { PPopover, PTextarea } from '@porsche-design-system/components-vue';
</script>

<template>
  <PTextarea name="some-name" state="error">
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
  </PTextarea>
</template>
