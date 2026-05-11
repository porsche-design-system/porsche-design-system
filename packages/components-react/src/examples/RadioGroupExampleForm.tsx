import {
  PButton,
  PRadioGroup,
  PRadioGroupOption,
  type PRadioGroupProps,
  PText,
  type RadioGroupChangeEventDetail,
} from '@porsche-design-system/components-react';
import { FormEvent, useState } from 'react';

export const RadioGroupExampleFormPage = (): JSX.Element => {
  const [form, setForm] = useState({ myRadioGroup: '' });
  const [lastSubmittedData, setLastSubmittedData] = useState<any>();

  const onChange = (e: CustomEvent<RadioGroupChangeEventDetail>) => {
    const { name, value } = e.target as HTMLElement & PRadioGroupProps;
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
    setForm({ myRadioGroup: '' });
  };

  return (
    <>
      <form onSubmit={onSubmit} onReset={onReset} className="flex flex-col gap-fluid-sm">
        <PRadioGroup name="myRadioGroup" label="Some Label" value={form.myRadioGroup} onChange={onChange}>
          <PRadioGroupOption label="Option A" value="a"></PRadioGroupOption>
          <PRadioGroupOption label="Option B" value="b"></PRadioGroupOption>
          <PRadioGroupOption label="Option C" value="c"></PRadioGroupOption>
          <PRadioGroupOption label="Option D" value="d"></PRadioGroupOption>
          <PRadioGroupOption label="Option E" value="e"></PRadioGroupOption>
          <PRadioGroupOption label="Option F" value="f"></PRadioGroupOption>
        </PRadioGroup>
        <div className="flex gap-fluid-sm">
          <PButton type="submit">Submit</PButton>
          <PButton type="reset">Reset</PButton>
        </div>
        <PText>Last submitted data: {lastSubmittedData}</PText>
      </form>
    </>
  );
};
