/* Auto Generated File */
import { PRadioButtonWrapper } from '@porsche-design-system/components-react';

export const RadioButtonWrapperPage = (): JSX.Element => {
  const style = `
    .playground > * {
      margin-bottom: 2px;
    }
  `;

  return (
    <>
      <style children={style} />

      <div className="playground light" title="should render with label">
        <PRadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-1" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-1" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render without label">
        <PRadioButtonWrapper label="Some label" hideLabel={true}>
          <input type="radio" name="some-name-2" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label" hideLabel={true}>
          <input type="radio" name="some-name-2" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with responsive label">
        <PRadioButtonWrapper
          label="Some label"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          <input type="radio" name="some-name-3" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper
          label="Some label"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          <input type="radio" name="some-name-3" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render in required state">
        <PRadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-3a" required />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="This is a very insanely super long label across multiple lines">
          <input type="radio" name="some-name-3a" required />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-3a" required disabled />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-3a" required defaultChecked />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-3b" required defaultChecked disabled />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render in disabled state">
        <PRadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-4" disabled />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-4" defaultChecked disabled />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with success state and success message">
        <PRadioButtonWrapper label="Some label" state="success">
          <input type="radio" name="some-name-5" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label" state="success" message="Some success validation message.">
          <input type="radio" name="some-name-5" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with success state but without success message and not checked">
        <PRadioButtonWrapper label="Some label" state="success">
          <input type="radio" name="some-name-6" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label" state="success">
          <input type="radio" name="some-name-6" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with error state and error message">
        <PRadioButtonWrapper label="Some label" state="error">
          <input type="radio" name="some-name-7" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label" state="error" message="Some error validation message.">
          <input type="radio" name="some-name-7" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with error state but without error message and not checked">
        <PRadioButtonWrapper label="Some label" state="error">
          <input type="radio" name="some-name-8" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label" state="error">
          <input type="radio" name="some-name-8" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with slotted content with error state and message">
        <PRadioButtonWrapper state="error">
          <span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
          <input type="radio" name="some-name-9" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper state="error">
          <span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
          <input type="radio" name="some-name-9" />
          <span slot="message">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with multiline label">
        <PRadioButtonWrapper state="error" label="Lorem ipsum dolor sit amet, consetetur sadipscing" style={{ width: '240px' }}>
          <input type="radio" name="some-name-11" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper state="error" label="Lorem ipsum dolor sit amet, consetetur sadipscing" style={{ width: '240px' }}>
          <input type="radio" name="some-name-11" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper
          label="Lorem ipsum dolor sit amet, consetetur sadipscing"
          state="error"
          message="At vero eos et accusam et justo duo dolores et ea rebum."
          style={{ width: '240px' }}
        >
          <input type="radio" name="some-name-11" />
        </PRadioButtonWrapper>
      </div>
    </>
  );
};
