import {
  type InputEmailInputEventDetail,
  PButton,
  PInputEmail,
  type PInputEmailProps,
  PText,
} from '@porsche-design-system/components-react';
import { FormEvent, useState } from 'react';

export const InputEmailExampleFormPage = (): JSX.Element => {
  const [form, setForm] = useState({ myInputEmail: '' });
  const [lastSubmittedData, setLastSubmittedData] = useState<any>();

  const onInput = (e: CustomEvent<InputEmailInputEventDetail>) => {
    const { name, value } = e.target as HTMLElement & PInputEmailProps;
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
    setForm({ myInputEmail: '' });
  };

  return (
    <>
      <form onSubmit={onSubmit} onReset={onReset} className="flex flex-col gap-fluid-sm">
        <PInputEmail
          name="myInputEmail"
          label="Some Label"
          indicator={true}
          value={form.myInputEmail}
          onInput={onInput}
        />
        <div className="flex gap-fluid-sm">
          <PButton type="submit">Submit</PButton>
          <PButton type="reset">Reset</PButton>
        </div>
        <PText>Last submitted data: {lastSubmittedData}</PText>
      </form>
    </>
  );
};
