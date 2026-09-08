import {
  PButton,
  PCheckbox,
  type PCheckboxChangeEvent,
  type PCheckboxProps,
  PText,
} from '@porsche-design-system/components-react';
import { type FormEvent, useState } from 'react';

export const CheckboxExampleFormPage = () => {
  const [form, setForm] = useState<{ myCheckbox: PCheckboxProps['checked'] }>({ myCheckbox: false });
  const [lastSubmittedData, setLastSubmittedData] = useState<any>();

  const onChange = (e: PCheckboxChangeEvent) => {
    const { name, checked } = e.target;
    if (name === undefined) return;
    setForm((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLastSubmittedData(JSON.stringify(form));
  };

  const onReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm({ myCheckbox: false });
  };

  return (
    <>
      <form onSubmit={onSubmit} onReset={onReset} className="flex flex-col gap-fluid-sm">
        <PCheckbox name="myCheckbox" label="Some Label" checked={form['myCheckbox']} onChange={onChange} />
        <div className="flex gap-fluid-sm">
          <PButton type="submit">Submit</PButton>
          <PButton type="reset">Reset</PButton>
        </div>
        <PText>Last submitted data: {lastSubmittedData}</PText>
      </form>
    </>
  );
};
