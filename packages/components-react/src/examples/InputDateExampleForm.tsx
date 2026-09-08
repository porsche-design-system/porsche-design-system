import {
  PButton,
  PInputDate,
  type PInputDateInputEvent,
  type PInputDateProps,
  PText,
} from '@porsche-design-system/components-react';
import { type FormEvent, useState } from 'react';

export const InputDateExampleFormPage = () => {
  const [form, setForm] = useState<{ myInputDate: PInputDateProps['value'] }>({ myInputDate: '' });
  const [lastSubmittedData, setLastSubmittedData] = useState<any>();

  const onInput = (e: PInputDateInputEvent) => {
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
    setForm({ myInputDate: '' });
  };

  return (
    <>
      <form onSubmit={onSubmit} onReset={onReset} className="flex flex-col gap-fluid-sm">
        <PInputDate name="myInputDate" label="Some Label" value={form.myInputDate} onInput={onInput} />
        <div className="flex gap-fluid-sm">
          <PButton type="submit">Submit</PButton>
          <PButton type="reset">Reset</PButton>
        </div>
        <PText>Last submitted data: {lastSubmittedData}</PText>
      </form>
    </>
  );
};
