<script setup lang="ts">
  import { PTextFieldWrapper } from '@porsche-design-system/components-vue';
  import { IMask, useIMask } from 'vue-imask';

  const isDeLocale = Intl.NumberFormat().resolvedOptions().locale.startsWith('de');
  const dateFormat = isDeLocale ? 'dd.mm.yyyy' : 'mm/dd/yyyy';
  const dateRange = isDeLocale ? '01.01.1900, 01.01.2100' : '01/01/1900, 01/01/2100';
  const description = `'${dateFormat}' in range [${dateRange}]`;
  const opts = {
    lazy: false,
    mask: dateFormat,
    blocks: {
      dd: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 31,
        placeholderChar: 'd',
      },
      mm: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
        placeholderChar: 'm',
      },
      yyyy: {
        mask: IMask.MaskedRange,
        from: 1900,
        to: 2100,
        placeholderChar: 'y',
      },
    },
  };

  const { el } = useIMask(opts);
</script>

<template>
  <PTextFieldWrapper :label="'Some label'" :description="description">
    <input ref="el" type="text" />
  </PTextFieldWrapper>
</template>
