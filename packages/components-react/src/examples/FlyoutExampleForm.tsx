import { PButton, PCheckbox, PFlyout, PHeading, PText, PTextarea } from '@porsche-design-system/components-react';
import { type FormEvent, useCallback, useState } from 'react';

export const FlyoutExampleFormPage = (): JSX.Element => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState<boolean>(false);
  const [checkboxValue, setCheckboxValue] = useState('none');
  const [textareaValue, setTextareaValue] = useState('none');

  const onOpen = useCallback(() => {
    setIsFlyoutOpen(true);
  }, []);
  const onDismiss = useCallback(() => {
    setIsFlyoutOpen(false);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setCheckboxValue(formData.get('some-checkbox')?.toString() || 'none');
    setTextareaValue(formData.get('some-textarea')?.toString() || 'none');
  };

  return (
    <>
      <PButton type="button" aria={{ 'aria-haspopup': 'dialog' }} onClick={onOpen}>
        Open Flyout
      </PButton>
      <PFlyout open={isFlyoutOpen} onDismiss={onDismiss} aria={{ 'aria-label': 'Some Heading' }}>
        <PHeading slot="header" size="large" tag="h2">
          Some Heading
        </PHeading>
        <form id="some-form" onSubmit={onSubmit}>
          <PCheckbox name="some-checkbox" label="Some Label"></PCheckbox>
          <PTextarea name="some-textarea" label="Some Label"></PTextarea>
        </form>
        <PButton slot="footer" type="submit" form="some-form">
          Submit
        </PButton>
        <PButton slot="footer" type="reset" variant="secondary" form="some-form">
          Reset
        </PButton>
        <PText slot="sub-footer">
          Last submitted data:
          <br />
          <br />
          checkbox: {checkboxValue}
          <br />
          textarea: {textareaValue}
        </PText>
      </PFlyout>
    </>
  );
};
