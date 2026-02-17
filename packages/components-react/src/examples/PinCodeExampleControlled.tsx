import { type PinCodeChangeEventDetail, PPinCode, PText } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const PinCodeExampleControlledPage = (): JSX.Element => {
  const [value, setValue] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const onChange = useCallback((e: CustomEvent<PinCodeChangeEventDetail>) => {
    setValue(e.detail.value);
    setIsComplete(e.detail.isComplete);
  }, []);

  return (
    <>
      <PPinCode label="Some Label" value={value} onChange={onChange}></PPinCode>
      <PText>Current value: {value}</PText>
      <PText>Completely filled: {isComplete.toString()}</PText>
    </>
  );
};
