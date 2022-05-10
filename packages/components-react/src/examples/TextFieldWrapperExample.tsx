import { PTextFieldWrapper } from '@porsche-design-system/components-react';
import { useState } from 'react';
import { useIMask, IMask } from 'react-imask';

export const TextFieldWrapperExamplePage = (): JSX.Element => {
  const [opts, setOpts] = useState({
    lazy: false,
    mask: 'MM/DD/YYYY',
    blocks: {
      YYYY: {
        mask: IMask.MaskedRange,
        from: 1900,
        to: 2100,
        placeholderChar: 'Y',
      },
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
        placeholderChar: 'M',
      },
      DD: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 31,
        placeholderChar: 'D',
      },
    },
  });
  const { ref } = useIMask(opts);

  return (
    <PTextFieldWrapper>
      <input ref={ref as any} type="text" />
    </PTextFieldWrapper>
  );
};
