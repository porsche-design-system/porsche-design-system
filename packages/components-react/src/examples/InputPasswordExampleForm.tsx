import {
  type InputPasswordInputEventDetail,
  PButton,
  PInputPassword,
  type PInputPasswordProps,
  PText,
} from '@porsche-design-system/components-react';
import { FormEvent, useState } from 'react';

export const InputPasswordExampleFormPage = (): JSX.Element => {
  const [form, setForm] = useState({ myInputPassword: '' });
  const [lastSubmittedData, setLastSubmittedData] = useState<any>();

  const onInput = (e: CustomEvent<InputPasswordInputEventDetail>) => {
    const { name, value } = e.target as HTMLElement & PInputPasswordProps;
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
    setForm({ myInputPassword: '' });
  };

  return (
    <>
      <form onSubmit={onSubmit} onReset={onReset} className="flex flex-col gap-fluid-sm">
        <PInputPassword
          name="myInputPassword"
          label="Some Label"
          toggle={true}
          value={form.myInputPassword}
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
