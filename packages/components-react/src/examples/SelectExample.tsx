import { type FormEvent, useState } from 'react';
import { PSelect, PSelectOption } from '@porsche-design-system/components-react';

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
        <button type="submit">Submit</button>
      </form>

      <p>Last submitted data: {lastSubmittedData}</p>
    </>
  );
};
