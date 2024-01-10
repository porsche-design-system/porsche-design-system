import type { LegacyRef } from 'react';
import { PTextFieldWrapper } from '@porsche-design-system/components-react';
import { useIMask, IMask } from 'react-imask';

export const TextFieldWrapperExampleIMaskPage = (): JSX.Element => {
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
  const { ref } = useIMask(opts);

  return (
    <PTextFieldWrapper label="Some label" description={description}>
      <input ref={ref as LegacyRef<HTMLInputElement>} type="text" />
    </PTextFieldWrapper>
  );
};
