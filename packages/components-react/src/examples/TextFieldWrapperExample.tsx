import { PTextFieldWrapper } from '@porsche-design-system/components-react';
import type { LegacyRef } from 'react';
import { useIMask, IMask } from 'react-imask';

export const TextFieldWrapperExamplePage = (): JSX.Element => {
  const isUsLocale = (yourDetectedLocale?: string): boolean => yourDetectedLocale === 'en-US' || false;
  const opts = {
    lazy: false,
    mask: isUsLocale() ? 'mm/dd/yyyy' : 'dd.mm.yyyy',
    blocks: {
      yyyy: {
        mask: IMask.MaskedRange,
        from: 1900,
        to: 2100,
        placeholderChar: 'y',
      },
      mm: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
        placeholderChar: 'm',
      },
      dd: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 31,
        placeholderChar: 'd',
      },
    },
  };
  const { ref } = useIMask(opts);

  return (
    <PTextFieldWrapper
      label="Some label"
      description={`'${isUsLocale() ? 'mm/dd/yyyy' : 'dd.mm.yyyy'}' in range [${
        isUsLocale() ? '01/01/1900, 01/01/2100' : '01.01.1900, 01.01.2100'
      }]`}
    >
      <input ref={ref as LegacyRef<HTMLInputElement>} type="text" />
    </PTextFieldWrapper>
  );
};
