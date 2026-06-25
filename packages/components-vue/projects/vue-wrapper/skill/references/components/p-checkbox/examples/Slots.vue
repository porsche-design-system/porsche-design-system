<script setup lang="ts">
  import { PCheckbox, PPopover } from '@porsche-design-system/components-vue';
</script>

<template>
  <div class="flex flex-col gap-static-sm">
    <PCheckbox name="some-name">
      <span slot="label">
        <img src="assets/911.png" alt="" class="object-contain inline-block align-middle -mt-2 me-static-sm w-[70px]" />
        Some slotted label with custom content and a "label-after" slot
      </span>
      <PPopover slot="label-after">
        Some label with a 
        <a href="https://designsystem.porsche.com" class="underline">
          link
        </a>
      </PPopover>
    </PCheckbox>
    <PCheckbox name="some-name">
      <span slot="label">
        Some slotted label
      </span>
    </PCheckbox>
    <PCheckbox name="some-name" disabled="true">
      <span slot="label">
        Disabled slotted label, a nested 
        <a href="https://www.porsche.com" class="underline" tabindex="-1">
          link
        </a>
         and a label-after slot.
      </span>
      <PPopover slot="label-after">
        Some information about the disabled state.
      </PPopover>
    </PCheckbox>
    <PCheckbox name="some-name" state="error">
      <span slot="label">
        Some slotted label with a nested 
        <a href="https://www.porsche.com" class="underline">
          link
        </a>
      </span>
      <span slot="message">
        Some slotted error message with a 
        <a href="https://designsystem.porsche.com" class="underline">
          link
        </a>
      </span>
    </PCheckbox>
  </div>
</template>
