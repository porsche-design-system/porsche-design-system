import {
  PButton,
  PSelect,
  type PSelectChangeEvent,
  PSelectOption,
  type PSelectProps,
  PText,
} from '@porsche-design-system/components-react';
import { type FormEvent, useState } from 'react';

export const SelectExampleFormPage = () => {
  const [form, setForm] = useState<{ mySelect: PSelectProps['value'] }>({ mySelect: undefined });
  const [lastSubmittedData, setLastSubmittedData] = useState<any>();

  const onChange = (e: PSelectChangeEvent) => {
    const { name, value } = e.target;
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
    setForm({ mySelect: undefined });
  };

  return (
    <>
      <form onSubmit={onSubmit} onReset={onReset} className="flex flex-col gap-fluid-sm">
        <PSelect name="mySelect" label="Some Label" value={form.mySelect} onChange={onChange}>
          <PSelectOption value="a">Option A</PSelectOption>
          <PSelectOption value="b">Option B</PSelectOption>
          <PSelectOption value="c">Option C</PSelectOption>
          <PSelectOption value="d">Option D</PSelectOption>
          <PSelectOption value="e">Option E</PSelectOption>
          <PSelectOption value="f">Option F</PSelectOption>
        </PSelect>
        <div className="flex gap-fluid-sm">
          <PButton type="submit">Submit</PButton>
          <PButton type="reset">Reset</PButton>
        </div>
        <PText>Last submitted data: {lastSubmittedData}</PText>
      </form>
    </>
  );
};
