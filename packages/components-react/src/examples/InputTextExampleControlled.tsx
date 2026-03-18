import {
  type InputTextInputEventDetail,
  PInputText,
  type PInputTextProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputTextControlledExamplePage = (): JSX.Element => {
  const [value, setValue] = useState<PInputTextProps['value']>('');

  const onInput = (e: CustomEvent<InputTextInputEventDetail>) => {
    const target = e.target as HTMLElement & { value: string };

    if (target.value.length > 3) {
      const newValue = target.value.slice(0, 3);
      setValue(newValue);
      // The web component doesn't prevent native input, so we must manually reset the input element's value.
      // React won't re-render since setState with the truncated value doesn't trigger a change when it's already set.
      target.value = newValue;
    }
  };

  return (
    <>
      <PInputText
        name="some-name"
        label="Some Label"
        value={value}
        onInput={(e) => onInput(e as CustomEvent<InputTextInputEventDetail>)}
      />
      <PText>PInputText Value: {value}</PText>
    </>
  );
};
