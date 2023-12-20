import { type FormEvent, useState } from 'react';
import { PButton } from '@porsche-design-system/components-react';

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

      <p>Last submitted data: {lastSubmittedData}</p>
    </>
  );
};
