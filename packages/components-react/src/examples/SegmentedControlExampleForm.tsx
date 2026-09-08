import {
  PButton,
  PSegmentedControl,
  type PSegmentedControlChangeEvent,
  PSegmentedControlItem,
  type PSegmentedControlProps,
  PText,
} from '@porsche-design-system/components-react';
import { type FormEvent, useState } from 'react';

export const SegmentedControlExampleFormPage = () => {
  const [form, setForm] = useState<{ mySegmentedControl: PSegmentedControlProps['value'] }>({
    mySegmentedControl: undefined,
  });
  const [lastSubmittedData, setLastSubmittedData] = useState<any>();

  const onChange = (e: PSegmentedControlChangeEvent) => {
    const { name, value } = e.target;
    if (name === undefined) return;
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
    setForm({ mySegmentedControl: undefined });
  };

  return (
    <>
      <form onSubmit={onSubmit} onReset={onReset} className="flex flex-col gap-fluid-sm">
        <PSegmentedControl name="mySegmentedControl" value={form.mySegmentedControl} onChange={onChange}>
          <PSegmentedControlItem value={1}>Option 1</PSegmentedControlItem>
          <PSegmentedControlItem value={2}>Option 2</PSegmentedControlItem>
          <PSegmentedControlItem value={3}>Option 3</PSegmentedControlItem>
          <PSegmentedControlItem value={4}>Option 4</PSegmentedControlItem>
          <PSegmentedControlItem value={5}>Option 5</PSegmentedControlItem>
        </PSegmentedControl>
        <div className="flex gap-fluid-sm">
          <PButton type="submit">Submit</PButton>
          <PButton type="reset">Reset</PButton>
        </div>
        <PText>Last submitted data: {lastSubmittedData}</PText>
      </form>
    </>
  );
};
