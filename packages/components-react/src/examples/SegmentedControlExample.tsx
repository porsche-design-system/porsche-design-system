import { useCallback, useState } from 'react';
import type { SegmentedControlChangeEvent } from '@porsche-design-system/components-react';
import { PSegmentedControl, PSegmentedControlItem } from '@porsche-design-system/components-react';

export const SegmentedControlExamplePage = (): JSX.Element => {
  const [currentValue, setCurrentValue] = useState(1);

  const onSegmentedControlChange = useCallback((e: CustomEvent<SegmentedControlChangeEvent>) => {
    setCurrentValue(e.detail.value as number);
  }, []);

  return (
    <>
      <PSegmentedControl value={currentValue} onSegmentedControlChange={onSegmentedControlChange}>
        <PSegmentedControlItem value={1}>Option 1</PSegmentedControlItem>
        <PSegmentedControlItem value={2}>Option 2</PSegmentedControlItem>
        <PSegmentedControlItem value={3}>Option 3</PSegmentedControlItem>
        <PSegmentedControlItem value={4}>Option 4</PSegmentedControlItem>
        <PSegmentedControlItem value={5}>Option 5</PSegmentedControlItem>
      </PSegmentedControl>
      <p>Current value: {currentValue}</p>
    </>
  );
};
