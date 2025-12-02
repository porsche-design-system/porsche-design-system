import {
  type InputWeekInputEventDetail,
  PButton,
  PInputWeek,
  type PInputWeekProps,
  PText,
} from '@porsche-design-system/components-react';
import { FormEvent, useState } from 'react';

export const InputWeekExampleFormPage = (): JSX.Element => {
  const [form, setForm] = useState({ myInputWeek: '' });
  const [lastSubmittedData, setLastSubmittedData] = useState<any>();

  const onInput = (e: CustomEvent<InputWeekInputEventDetail>) => {
    const { name, value } = e.target as HTMLElement & PInputWeekProps;
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
    setForm({ myInputWeek: '' });
  };

  return (
    <>
      <form onSubmit={onSubmit} onReset={onReset} className="flex flex-col gap-fluid-sm">
        <PInputWeek name="myInputWeek" label="Some Label" value={form.myInputWeek} onInput={onInput} />
        <div className="flex gap-fluid-sm">
          <PButton type="submit">Submit</PButton>
          <PButton type="reset">Reset</PButton>
        </div>
        <PText>Last submitted data: {lastSubmittedData}</PText>
      </form>
    </>
  );
};
