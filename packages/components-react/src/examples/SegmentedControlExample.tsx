import { PSegmentedControl, PSegmentedControlItem, PText } from '@porsche-design-system/components-react';
import { type FormEvent, useState } from 'react';

export const SegmentedControlExamplePage = (): JSX.Element => {
  const [lastSubmittedData, setLastSubmittedData] = useState('none');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLastSubmittedData(formData.get('options')?.toString() || 'none');
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <PSegmentedControl name="options" value={1}>
          <PSegmentedControlItem value={1}>Option 1</PSegmentedControlItem>
          <PSegmentedControlItem value={2}>Option 2</PSegmentedControlItem>
          <PSegmentedControlItem value={3}>Option 3</PSegmentedControlItem>
          <PSegmentedControlItem value={4}>Option 4</PSegmentedControlItem>
          <PSegmentedControlItem value={5}>Option 5</PSegmentedControlItem>
        </PSegmentedControl>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>

      <PText>Last submitted data: {lastSubmittedData}</PText>
    </>
  );
};
