import {
  type MultiSelectChangeEventDetail,
  PButton,
  PMultiSelect,
  PMultiSelectOption,
  type PMultiSelectProps,
  PText,
} from '@porsche-design-system/components-react';
import { FormEvent, useState } from 'react';

export const MultiSelectExampleFormPage = (): JSX.Element => {
  const [form, setForm] = useState({ myMultiSelect: [] });
  const [lastSubmittedData, setLastSubmittedData] = useState<any>();

  const onChange = (e: CustomEvent<MultiSelectChangeEventDetail>) => {
    const { name, value } = e.target as HTMLElement & PMultiSelectProps;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLastSubmittedData(JSON.stringify(form));
  };

  const onReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm({ myMultiSelect: [] });
  };

  return (
    <>
      <form onSubmit={onSubmit} onReset={onReset} className="flex flex-col gap-fluid-sm">
        <PMultiSelect name="myMultiSelect" label="Some Label" value={form.myMultiSelect} onChange={onChange}>
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
          <PMultiSelectOption value="d">Option D</PMultiSelectOption>
          <PMultiSelectOption value="e">Option E</PMultiSelectOption>
          <PMultiSelectOption value="f">Option F</PMultiSelectOption>
        </PMultiSelect>
        <div className="flex gap-fluid-sm">
          <PButton type="submit">Submit</PButton>
          <PButton type="reset">Reset</PButton>
        </div>
        <PText>Last submitted data: {lastSubmittedData}</PText>
      </form>
    </>
  );
};
