import {
  PButton,
  PInputSearch,
  type PInputSearchInputEvent,
  type PInputSearchProps,
  PText,
} from '@porsche-design-system/components-react';
import { type FormEvent, useState } from 'react';

export const InputSearchExampleFormPage = () => {
  const [form, setForm] = useState<{ myInputSearch: PInputSearchProps['value'] }>({ myInputSearch: '' });
  const [lastSubmittedData, setLastSubmittedData] = useState<any>();

  const onInput = (e: PInputSearchInputEvent) => {
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
