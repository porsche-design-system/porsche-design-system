<script setup lang="ts">
  import { PCheckbox, PPopover } from '@porsche-design-system/components-vue';

  const onClick = () => {
    checked.value = true;
  }
</script>

<template>
  <div class="flex items-start w-64 border-2 border-contrast-lower rounded-md hover:border-primary transition-colors">
    <label class="inline-flex flex-col p-fluid-xs gap-static-xs prose-text-sm cursor-pointer hover:[--p-checkbox-border-color:var(--color-primary)]" @click="onClick">
      <span>
        Some wrapped custom label besides a popover
      </span>
      <PCheckbox :checked="false"></PCheckbox>
    </label>
    <PPopover class="mr-static-xs mt-static-xs">
      Some additional content.
    </PPopover>
  </div>
</template>
