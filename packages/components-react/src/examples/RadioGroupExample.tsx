import { PButton, PRadioGroup, PRadioGroupOption, PText } from '@porsche-design-system/components-react';
import { type FormEvent, useState } from 'react';

export const RadioGroupExamplePage = (): JSX.Element => {
  const [lastSubmittedData, setLastSubmittedData] = useState('none');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLastSubmittedData(formData.get('options')?.toString() || 'none');
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <PRadioGroup name="options" label="Some Label" value="a">
          <PRadioGroupOption label="Option A" value="a"></PRadioGroupOption>
          <PRadioGroupOption label="Option B" value="b"></PRadioGroupOption>
          <PRadioGroupOption label="Option C" value="c"></PRadioGroupOption>
          <PRadioGroupOption label="Option D" value="d"></PRadioGroupOption>
          <PRadioGroupOption label="Option E" value="e"></PRadioGroupOption>
          <PRadioGroupOption label="Option F" value="f"></PRadioGroupOption>
        </PRadioGroup>
        <PButton type="submit">Submit</PButton>
        <PButton type="reset">Reset</PButton>
      </form>

      <PText>Last submitted data: {lastSubmittedData}</PText>
    </>
  );
};
