import { PButton, PCheckbox, PSelect, PSelectOption, PText } from '@porsche-design-system/components-react';
import { type FormEvent, useState } from 'react';

export const SelectExampleRequiredPage = (): JSX.Element => {
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
      <PCheckbox label="Required" name="required" checked={isRequired} onChange={onChangeRequired} />
      <PCheckbox label="Allow deselection" name="deselection" checked={hasDeselection} onChange={onChangeDeselection} />

      <form onSubmit={onSubmit}>
        <PSelect name="options" label="Some Label" required={isRequired}>
          {hasDeselection && <PSelectOption></PSelectOption>}
          <PSelectOption value="1">Option 1</PSelectOption>
          <PSelectOption value="2">Option 2</PSelectOption>
          <PSelectOption value="3">Option 3</PSelectOption>
        </PSelect>
        <PButton type="submit">Submit</PButton>
      </form>

      <PText>Last submitted data: {lastSubmittedData}</PText>
    </>
  );
};
