import { PTextFieldWrapper } from '@porsche-design-system/components-react';
// import { useState } from 'react';
// import { useIMask } from 'react-imask';

export const TextFieldWrapperExamplePage = (): JSX.Element => {
  // const [opts, setOpts] = useState({ mask: Number });
  // const { ref, maskRef, value, setValue, unmaskedValue, setUnmaskedValue, typedValue, setTypedValue } = useIMask(opts);

  return (
    <PTextFieldWrapper label="Some label" hideLabel={false}>
      <input type="text" />
    </PTextFieldWrapper>
  );
};
