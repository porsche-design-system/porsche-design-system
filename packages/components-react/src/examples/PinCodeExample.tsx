import { useCallback, useState } from 'react';
import { PButton, PPinCode, PText } from '@porsche-design-system/components-react';

export const PinCodeExamplePage = (): JSX.Element => {
  const [lastSubmittedValue, setLastSubmittedValue] = useState('none');

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLastSubmittedValue(Array.from(formData.values()).join() || 'none');
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <PPinCode label="Some Label" name="pin-code"></PPinCode>
        <PButton type="submit">Submit</PButton>
      </form>
      <PText>Last submitted data: {lastSubmittedValue}</PText>
    </>
  );
};
