import {
  PSegmentedControl,
  PSegmentedControlItem,
  type PSegmentedControlProps,
  PText,
  type SegmentedControlChangeEvent,
} from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const SegmentedControlExampleControlledPage = () => {
  const [currentValue, setCurrentValue] = useState<PSegmentedControlProps['value']>(1);

  const onChange = useCallback((e: SegmentedControlChangeEvent) => {
    setCurrentValue(e.detail.value);
  }, []);

  return (
    <>
      <PSegmentedControl value={currentValue} onChange={onChange}>
        <PSegmentedControlItem value={1}>Option 1</PSegmentedControlItem>
        <PSegmentedControlItem value={2}>Option 2</PSegmentedControlItem>
        <PSegmentedControlItem value={3}>Option 3</PSegmentedControlItem>
        <PSegmentedControlItem value={4}>Option 4</PSegmentedControlItem>
        <PSegmentedControlItem value={5}>Option 5</PSegmentedControlItem>
      </PSegmentedControl>
      <PText>Current value: {currentValue}</PText>
    </>
  );
};
