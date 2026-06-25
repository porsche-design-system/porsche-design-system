<script setup lang="ts">
  import { PIcon, PInputSearch } from '@porsche-design-system/components-vue';
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-static-xs self-start [&>p-input-search]:min-w-0">
    <PInputSearch label="Search" name="aria-sketch" :indicator="true" :clear="true" :aria="{'role': 'combobox', 'aria-expanded': 'true', 'aria-haspopup': 'listbox', 'aria-autocomplete': 'list', 'aria-controls': 'listbox'}"></PInputSearch>
    <div id="listbox" role="listbox" :tabIndex="0" aria-label="Search options" class="max-h-48 p-static-sm overflow-y-auto rounded-xl border-thin border-contrast-lower bg-background-base shadow-md ">
      <div role="option" aria-selected="false" class="px-static-sm py-static-sm cursor-pointer bg-background-base hover:bg-frosted transition-colors duration-300 rounded-sm">
        718
      </div>
      <div role="option" aria-selected="false" class="px-static-sm py-static-sm cursor-pointer bg-background-base hover:bg-frosted transition-colors duration-300 rounded-sm">
        911
      </div>
      <div role="option" aria-selected="true" class="flex px-static-sm py-static-sm cursor-pointer bg-background-base hover:bg-frosted transition-colors duration-300 rounded-sm">
        <span>
          Cayenne
        </span>
        <PIcon name="check" color="primary" :aria-hidden="true" class="ms-auto"></PIcon>
      </div>
      <div role="option" aria-selected="false" class="px-static-sm py-static-sm cursor-pointer bg-background-base hover:bg-frosted transition-colors duration-300 rounded-sm">
        Macan
      </div>
      <div role="option" aria-selected="false" class="px-static-sm py-static-sm cursor-pointer bg-background-base hover:bg-frosted transition-colors duration-300 rounded-sm">
        Panamera
      </div>
      <div role="option" aria-selected="false" class="px-static-sm py-static-sm cursor-pointer bg-background-base hover:bg-frosted transition-colors duration-300 rounded-sm">
        Taycan
      </div>
    </div>
  </div>
</template>
