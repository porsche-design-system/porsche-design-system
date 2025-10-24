import {
  type InputSearchInputEventDetail,
  PButton,
  PInputSearch,
  type PInputSearchProps,
  PText,
} from '@porsche-design-system/components-react';
import { FormEvent, useState } from 'react';

export const InputSearchExampleFormPage = (): JSX.Element => {
  const [form, setForm] = useState({ myInputSearch: '' });
  const [lastSubmittedData, setLastSubmittedData] = useState<any>();

  const onInput = (e: CustomEvent<InputSearchInputEventDetail>) => {
    const { name, value } = e.target as HTMLElement & PInputSearchProps;
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
    setForm({ myInputSearch: '' });
  };

  return (
    <>
      <form onSubmit={onSubmit} onReset={onReset} className="flex flex-col gap-fluid-sm">
        <PInputSearch
          name="myInputSearch"
          label="Some Label"
          indicator={true}
          clear={true}
          value={form.myInputSearch}
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
