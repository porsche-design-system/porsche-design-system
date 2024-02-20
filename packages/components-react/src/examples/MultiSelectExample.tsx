import { type FormEvent, useState } from 'react';
import { PMultiSelect, PMultiSelectOption } from '@porsche-design-system/components-react';

export const MultiSelectExamplePage = (): JSX.Element => {
  const [lastSubmittedData, setLastSubmittedData] = useState('none');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLastSubmittedData(Array.from(formData.values()).join(', ') || 'none');
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <PMultiSelect name="options" label="Some Label">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
          <PMultiSelectOption value="d">Option D</PMultiSelectOption>
          <PMultiSelectOption value="e">Option E</PMultiSelectOption>
          <PMultiSelectOption value="f">Option F</PMultiSelectOption>
        </PMultiSelect>
        <button type="submit">Submit</button>
      </form>

      <p>Last submitted data: {lastSubmittedData}</p>
    </>
  );
};
