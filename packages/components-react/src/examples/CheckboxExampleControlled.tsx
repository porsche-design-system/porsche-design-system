import { type CheckboxChangeEventDetail, PCheckbox, PText } from '@porsche-design-system/components-react';
import { FormEvent, useState } from 'react';

export const CheckboxExampleControlledPage = (): JSX.Element => {
  const [state, setState] = useState({
    'some-name': true,
  });
  const onChange = (event: CustomEvent<CheckboxChangeEventDetail> | FormEvent<{}>) => {
    const { name, checked } = event.target as HTMLInputElement;
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
        onChange={(e) => onChange(e)}
      />
      <PText>some-name: {state['some-name'].toString()}</PText>
    </>
  );
};
