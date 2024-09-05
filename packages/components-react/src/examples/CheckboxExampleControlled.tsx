import { useState } from 'react';
import {
  PCheckbox,
  PText,
  type CheckboxUpdateEventDetail,
  type PCheckboxProps,
} from '@porsche-design-system/components-react';

export const CheckboxControlledExamplePage = (): JSX.Element => {
  const [value, setValue] = useState<PCheckboxProps['value']>('');

  const onUpdate = (e: CustomEvent<CheckboxUpdateEventDetail>) => {
    setValue(e.detail.checked ? e.detail.value : '');
  };

  return (
    <>
      <PCheckbox
        label="Some Label"
        name="some-name"
        value="some-value"
        onUpdate={(e) => onUpdate(e as CustomEvent<CheckboxUpdateEventDetail>)}
      />
      <PText>Value: {value}</PText>
    </>
  );
};
