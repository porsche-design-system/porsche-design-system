import { PButton, PPinCode, PText } from '@porsche-design-system/components-react';
import { type FormEvent, useCallback, useState } from 'react';

export const PinCodeExamplePage = (): JSX.Element => {
  const [lastSubmittedValue, setLastSubmittedValue] = useState('none');

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLastSubmittedValue(Array.from(formData.values()).join() || 'none');
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <PPinCode label="Some Label" name="pin-code"></PPinCode>
        <PButton type="submit">Submit</PButton>
        <PButton type="reset">Reset</PButton>
      </form>
      <PText>Last submitted data: {lastSubmittedValue}</PText>
    </>
  );
};
