import { PButton, PInputPassword, PText } from '@porsche-design-system/components-react';
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
        <PButton type="submit">Submit</PButton>
        <PButton type="reset">Reset</PButton>
      </form>

      <PText>Last submitted data: {lastSubmittedData}</PText>
    </>
  );
};
