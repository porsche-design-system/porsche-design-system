import React from 'react';
import { PButton, PText, PTextarea } from '@porsche-design-system/components-react';
import { type FormEvent, useState } from 'react';

export const Example = () => {
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
      <div className="flex gap-fluid-sm mt-fluid-sm">
        <PButton type="submit" form="some-form">
          Submit
        </PButton>
        <PButton type="reset" form="some-form">
          Reset
        </PButton>
      </div>

      <PText>Last submitted data: {lastSubmittedData}</PText>
    </>
  );
};
