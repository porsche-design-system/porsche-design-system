import { PButton, PSelect, PSelectOption, PText } from '@porsche-design-system/components-react';
import { type FormEvent, useState } from 'react';

export const SelectExamplePage = (): JSX.Element => {
  const [lastSubmittedData, setLastSubmittedData] = useState('none');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLastSubmittedData(formData.get('options')?.toString() || 'none');
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <PSelect name="options" label="Some Label" value="a">
          <PSelectOption value="a">Option A</PSelectOption>
          <PSelectOption value="b">Option B</PSelectOption>
          <PSelectOption value="c">Option C</PSelectOption>
          <PSelectOption value="d">Option D</PSelectOption>
          <PSelectOption value="e">Option E</PSelectOption>
          <PSelectOption value="f">Option F</PSelectOption>
        </PSelect>
        <PButton type="submit">Submit</PButton>
        <PButton type="reset">Reset</PButton>
      </form>

      <PText>Last submitted data: {lastSubmittedData}</PText>
    </>
  );
};
