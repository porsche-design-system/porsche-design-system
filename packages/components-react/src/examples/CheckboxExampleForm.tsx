import {
  type CheckboxChangeEventDetail,
  PButton,
  PCheckbox,
  PCheckboxProps,
  PText,
} from '@porsche-design-system/components-react';
import { FormEvent, useState } from 'react';

export const CheckboxExampleFormPage = (): JSX.Element => {
  const [form, setForm] = useState({ myCheckbox: false });
  const [lastSubmittedData, setLastSubmittedData] = useState<any>();

  const onChange = (e: CustomEvent<CheckboxChangeEventDetail>) => {
    const { name, checked } = e.target as HTMLElement & PCheckboxProps;
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
