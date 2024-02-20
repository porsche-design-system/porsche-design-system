import { type FormEvent, useState } from 'react';
import { PSelect, PSelectOption } from '@porsche-design-system/components-react';

export const SelectRequiredExamplePage = (): JSX.Element => {
  const [lastSubmittedData, setLastSubmittedData] = useState('none');
  const [isRequired, setIsRequired] = useState(true);
  const [hasDeselection, setHasDeselection] = useState(false);

  const onChangeRequired = () => {
    setIsRequired((prev) => !prev);
  };

  const onChangeDeselection = () => {
    setHasDeselection((prev) => !prev);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLastSubmittedData(formData.get('options')?.toString() || 'none');
  };

  return (
    <>
      <label>
        <input type="checkbox" name="required" checked={isRequired} onChange={() => onChangeRequired} />
        Required
      </label>
      <label>
        <input type="checkbox" name="deselection" checked={hasDeselection} onChange={() => onChangeDeselection} />
        Allow deselection
      </label>

      <form onSubmit={onSubmit}>
        <PSelect name="options" label="Some Label" required={true}>
          {hasDeselection && <PSelectOption></PSelectOption>}
          <PSelectOption value="1">Option 1</PSelectOption>
          <PSelectOption value="2">Option 2</PSelectOption>
          <PSelectOption value="3">Option 3</PSelectOption>
        </PSelect>
        <button type="submit">Submit</button>
      </form>

      <p>Last submitted data: {lastSubmittedData}</p>
    </>
  );
};
