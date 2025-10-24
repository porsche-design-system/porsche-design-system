import {
  type InputUrlInputEventDetail,
  PButton,
  PInputUrl,
  type PInputUrlProps,
  PText,
} from '@porsche-design-system/components-react';
import { FormEvent, useState } from 'react';

export const InputUrlExampleFormPage = (): JSX.Element => {
  const [form, setForm] = useState({ myInputUrl: '' });
  const [lastSubmittedData, setLastSubmittedData] = useState<any>();

  const onInput = (e: CustomEvent<InputUrlInputEventDetail>) => {
    const { name, value } = e.target as HTMLElement & PInputUrlProps;
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
    setForm({ myInputUrl: '' });
  };

  return (
    <>
      <form onSubmit={onSubmit} onReset={onReset} className="flex flex-col gap-fluid-sm">
        <PInputUrl name="myInputUrl" label="Some Label" indicator={true} value={form.myInputUrl} onInput={onInput} />
        <div className="flex gap-fluid-sm">
          <PButton type="submit">Submit</PButton>
          <PButton type="reset">Reset</PButton>
        </div>
        <PText>Last submitted data: {lastSubmittedData}</PText>
      </form>
    </>
  );
};
