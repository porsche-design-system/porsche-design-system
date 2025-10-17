import { PButton, PText } from '@porsche-design-system/components-react';
import { type FormEvent, useState } from 'react';

export const ButtonExampleFormPage = (): JSX.Element => {
  const [lastSubmittedData, setLastSubmittedData] = useState('none');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Array.from(new FormData(e.currentTarget, (e.nativeEvent as SubmitEvent).submitter).entries())[0];
    setLastSubmittedData(formData.join('=') || 'none');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PButton name="option" value="A" type="submit">
          Button A
        </PButton>
        <PButton name="option" value="B" type="submit">
          Button B
        </PButton>
      </form>

      <PText>Last submitted data: {lastSubmittedData}</PText>
    </>
  );
};
