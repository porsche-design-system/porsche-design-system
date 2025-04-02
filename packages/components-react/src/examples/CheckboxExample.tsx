import { PButton, PCheckbox, PText } from '@porsche-design-system/components-react';
import { type FormEvent, useState } from 'react';

export const CheckboxExamplePage = (): JSX.Element => {
  const [lastSubmittedData, setLastSubmittedData] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLastSubmittedData(formData.get('some-name') as string);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <PCheckbox name="some-name" value="some-value" label="Some Label"></PCheckbox>
        <PButton type="submit">Submit</PButton>
        <PButton type="reset">Reset</PButton>
      </form>

      <PText>Last submitted data: {lastSubmittedData}</PText>
    </>
  );
};
