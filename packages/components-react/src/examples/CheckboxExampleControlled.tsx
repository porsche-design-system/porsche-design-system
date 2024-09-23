import { useState } from 'react';
import { PCheckbox, PText, type CheckboxUpdateEventDetail } from '@porsche-design-system/components-react';

export const CheckboxControlledExamplePage = (): JSX.Element => {
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
      <PText>some-name: {state['some-name'] ? 'checked' : 'not checked'}</PText>
    </>
  );
};
