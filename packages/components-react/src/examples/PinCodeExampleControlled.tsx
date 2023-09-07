import { useCallback, useState } from 'react';
import type { PinCodeUpdateEvent } from '@porsche-design-system/components-react';
import { PPinCode, PText } from '@porsche-design-system/components-react';

export const PinCodeExampleControlledPage = (): JSX.Element => {
  const length = 4;
  const [currentValue, setCurrentValue] = useState(['', '', '', '']);
  const [isComplete, setIsComplete] = useState(currentValue.join('').length === length);

  const onUpdate = useCallback((e: CustomEvent<PinCodeUpdateEvent>) => {
    setCurrentValue(e.detail.value);
    setIsComplete(e.detail.value.join('').length === length);
  }, []);

  return (
    <>
      <PPinCode label="Some Label" length={length} value={currentValue} onUpdate={onUpdate}></PPinCode>
      <PText>Current value: {currentValue}</PText>
      <PText>Completely filled: {isComplete.toString()}</PText>
    </>
  );
};
