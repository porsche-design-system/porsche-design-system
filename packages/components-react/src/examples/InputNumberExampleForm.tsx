import {
  type InputNumberInputEventDetail,
  PButton,
  PInputNumber,
  type PInputNumberProps,
  PText,
} from '@porsche-design-system/components-react';
import { FormEvent, useState } from 'react';

export const InputNumberExampleFormPage = (): JSX.Element => {
  const [form, setForm] = useState({ myInputNumber: '' });
  const [lastSubmittedData, setLastSubmittedData] = useState<any>();

  const onInput = (e: CustomEvent<InputNumberInputEventDetail>) => {
    const { name, value } = e.target as HTMLElement & PInputNumberProps;
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
    setForm({ myInputNumber: '' });
  };

  return (
    <>
      <form onSubmit={onSubmit} onReset={onReset} className="flex flex-col gap-fluid-sm">
        <PInputNumber
          name="myInputNumber"
          label="Some Label"
          controls={true}
          value={form.myInputNumber}
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
