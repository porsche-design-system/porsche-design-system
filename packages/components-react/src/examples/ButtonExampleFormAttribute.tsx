import { PButton, PText, PTextarea } from '@porsche-design-system/components-react';
import { type FormEvent, useState } from 'react';

export const ButtonExampleFormAttributePage = (): JSX.Element => {
  const [lastSubmittedData, setLastSubmittedData] = useState('none');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLastSubmittedData((formData.get('some-name') as string) || 'none');
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="some-form">
        <PTextarea name="some-name" label="Some Label"></PTextarea>
      </form>

      <PButton type="submit" form="some-form">
        Submit
      </PButton>
      <PButton type="reset" form="some-form">
        Reset
      </PButton>

      <PText>Last submitted data: {lastSubmittedData}</PText>
    </>
  );
};
