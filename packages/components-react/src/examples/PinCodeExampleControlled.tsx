import { useCallback, useState } from 'react';
import { type PinCodeUpdateEventDetail, PPinCode, PText } from '@porsche-design-system/components-react';

export const PinCodeExampleControlledPage = (): JSX.Element => {
  const [value, setValue] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const onUpdate = useCallback((e: CustomEvent<PinCodeUpdateEventDetail>) => {
    setValue(e.detail.value);
    setIsComplete(e.detail.isComplete);
  }, []);

  return (
    <>
      <PPinCode label="Some Label" value={value} onUpdate={onUpdate}></PPinCode>
      <PText>Current value: {value}</PText>
      <PText>Completely filled: {isComplete.toString()}</PText>
    </>
  );
};
