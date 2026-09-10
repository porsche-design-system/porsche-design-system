import { PCheckbox, type PCheckboxChangeEvent, PText } from '@porsche-design-system/components-react';
import { useState } from 'react';

export const CheckboxExampleControlledPage = () => {
  const [state, setState] = useState({
    'some-name': true,
  });
  const onChange = (event: PCheckboxChangeEvent) => {
    const { name, checked } = event.target;
    if (name === undefined || checked === undefined) return;
    setState((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  return (
    <>
      <PCheckbox
        label="Some Label"
        name="some-name"
        checked={state['some-name']}
        value="some-value"
        onChange={onChange}
      />
      <PText>some-name: {state['some-name'].toString()}</PText>
    </>
  );
};
