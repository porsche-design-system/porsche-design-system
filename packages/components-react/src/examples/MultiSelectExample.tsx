import { type FormEvent, useState } from 'react';
import { PMultiSelect, PMultiSelectOption } from '@porsche-design-system/components-react';

export const MultiSelectExamplePage = () => {
  const [lastSubmittedData, setLastSubmittedData] = useState('none');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLastSubmittedData(Array.from(formData.values()).join(', ') || 'none');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PMultiSelect name="options">
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
