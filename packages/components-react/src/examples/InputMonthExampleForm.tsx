import {
  type InputMonthInputEventDetail,
  PButton,
  PInputMonth,
  type PInputMonthProps,
  PText,
} from '@porsche-design-system/components-react';
import { FormEvent, useState } from 'react';

export const InputMonthExampleFormPage = (): JSX.Element => {
  const [form, setForm] = useState({ myInputMonth: '' });
  const [lastSubmittedData, setLastSubmittedData] = useState<any>();

  const onInput = (e: CustomEvent<InputMonthInputEventDetail>) => {
    const { name, value } = e.target as HTMLElement & PInputMonthProps;
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
    setForm({ myInputMonth: '' });
  };

  return (
    <>
      <form onSubmit={onSubmit} onReset={onReset} className="flex flex-col gap-fluid-sm">
        <PInputMonth name="myInputMonth" label="Some Label" value={form.myInputMonth} onInput={onInput} />
        <div className="flex gap-fluid-sm">
          <PButton type="submit">Submit</PButton>
          <PButton type="reset">Reset</PButton>
        </div>
        <PText>Last submitted data: {lastSubmittedData}</PText>
      </form>
    </>
  );
};
