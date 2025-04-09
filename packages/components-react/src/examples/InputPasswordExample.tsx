import { PInputPassword, PText } from '@porsche-design-system/components-react';
import { type FormEvent, useState } from 'react';

export const InputPasswordExamplePage = (): JSX.Element => {
  const [lastSubmittedData, setLastSubmittedData] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLastSubmittedData(formData.get('some-name') as string);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <PInputPassword name="some-name" label="Some Label"></PInputPassword>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>

      <PText>Last submitted data: {lastSubmittedData}</PText>
    </>
  );
};
