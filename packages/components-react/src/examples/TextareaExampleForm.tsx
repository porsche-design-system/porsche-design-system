import {
  PButton,
  PText,
  PTextarea,
  type PTextareaProps,
  type TextareaInputEventDetail,
} from '@porsche-design-system/components-react';
import { FormEvent, useState } from 'react';

export const TextareaExampleFormPage = (): JSX.Element => {
  const [form, setForm] = useState({ myTextarea: '' });
  const [lastSubmittedData, setLastSubmittedData] = useState<any>();

  const onInput = (e: CustomEvent<TextareaInputEventDetail>) => {
    const { name, value } = e.target as HTMLElement & PTextareaProps;
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
    setForm({ myTextarea: '' });
  };

  return (
    <>
      <form onSubmit={onSubmit} onReset={onReset} className="flex flex-col gap-fluid-sm">
        <PTextarea name="myTextarea" label="Some Label" value={form.myTextarea} onInput={onInput} />
        <div className="flex gap-fluid-sm">
          <PButton type="submit">Submit</PButton>
          <PButton type="reset">Reset</PButton>
        </div>
        <PText>Last submitted data: {lastSubmittedData}</PText>
      </form>
    </>
  );
};
