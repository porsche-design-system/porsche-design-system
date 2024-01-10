import { useCallback, useState } from 'react';
import {
  type SegmentedControlUpdateEventDetail,
  PSegmentedControl,
  PSegmentedControlItem,
  PText,
} from '@porsche-design-system/components-react';

export const SegmentedControlExamplePage = (): JSX.Element => {
  const [currentValue, setCurrentValue] = useState(1);

  const onUpdate = useCallback((e: CustomEvent<SegmentedControlUpdateEventDetail>) => {
    setCurrentValue(e.detail.value as number);
  }, []);

  return (
    <>
      <PSegmentedControl value={currentValue} onUpdate={onUpdate}>
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
