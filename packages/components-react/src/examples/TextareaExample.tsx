import { type FormEvent, useState } from 'react';
import { PTextarea, PText } from '@porsche-design-system/components-react';

export const TextareaExamplePage = (): JSX.Element => {
  const [lastSubmittedData, setLastSubmittedData] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLastSubmittedData(formData.get('some-name') as string);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <PTextarea name="some-name" label="Some Label"></PTextarea>
        <button type="submit">Submit</button>
      </form>

      <PText>Last submitted data: {lastSubmittedData}</PText>
    </>
  );
};
