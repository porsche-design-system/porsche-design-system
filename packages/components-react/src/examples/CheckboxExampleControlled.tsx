import { type CheckboxUpdateEventDetail, PCheckbox, PText } from '@porsche-design-system/components-react';
import { useState } from 'react';

export const CheckboxExampleControlledPage = (): JSX.Element => {
  const [state, setState] = useState({
    'some-name': true,
  });
  const onUpdate = ({ detail: { name, checked } }: CustomEvent<CheckboxUpdateEventDetail>) => {
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
        onUpdate={(e) => onUpdate(e)}
      />
      <PText>some-name: {state['some-name'].toString()}</PText>
    </>
  );
};
