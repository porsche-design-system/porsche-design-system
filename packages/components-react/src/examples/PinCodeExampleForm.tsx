import {
  PButton,
  type PinCodeChangeEventDetail,
  PPinCode,
  type PPinCodeProps,
  PText,
} from '@porsche-design-system/components-react';
import { FormEvent, useState } from 'react';

export const PinCodeExampleFormPage = (): JSX.Element => {
  const [form, setForm] = useState({ myPinCode: '' });
  const [lastSubmittedData, setLastSubmittedData] = useState<any>();

  const onChange = (e: CustomEvent<PinCodeChangeEventDetail>) => {
    const { name, value } = e.target as HTMLElement & PPinCodeProps;
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
    setForm({ myPinCode: '' });
  };

  return (
    <>
      <form onSubmit={onSubmit} onReset={onReset} className="flex flex-col gap-fluid-sm">
        <PPinCode name="myPinCode" label="Some Label" value={form.myPinCode} onChange={onChange} />
        <div className="flex gap-fluid-sm">
          <PButton type="submit">Submit</PButton>
          <PButton type="reset">Reset</PButton>
        </div>
        <PText>Last submitted data: {lastSubmittedData}</PText>
      </form>
    </>
  );
};
