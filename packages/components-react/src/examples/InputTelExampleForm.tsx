import {
  type InputTelInputEventDetail,
  PButton,
  PInputTel,
  type PInputTelProps,
  PText,
} from '@porsche-design-system/components-react';
import { FormEvent, useState } from 'react';

export const InputTelExampleFormPage = (): JSX.Element => {
  const [form, setForm] = useState({ myInputTel: '' });
  const [lastSubmittedData, setLastSubmittedData] = useState<any>();

  const onInput = (e: CustomEvent<InputTelInputEventDetail>) => {
    const { name, value } = e.target as HTMLElement & PInputTelProps;
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
    setForm({ myInputTel: '' });
  };

  return (
    <>
      <form onSubmit={onSubmit} onReset={onReset} className="flex flex-col gap-fluid-sm">
        <PInputTel name="myInputTel" label="Some Label" indicator={true} value={form.myInputTel} onInput={onInput} />
        <div className="flex gap-fluid-sm">
          <PButton type="submit">Submit</PButton>
          <PButton type="reset">Reset</PButton>
        </div>
        <PText>Last submitted data: {lastSubmittedData}</PText>
      </form>
    </>
  );
};
