import { PRadioButtonWrapper as RadioButtonWrapper } from '@porsche-design-system/components-react';
import React from 'react';

export const RadioButtonWrapperPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render with label">
        <RadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-1" />
        </RadioButtonWrapper>
        <RadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-1" defaultChecked />
        </RadioButtonWrapper>
      </div>

      <div className="playground light" title="should render without label">
        <RadioButtonWrapper label="Some label" hideLabel={true}>
          <input type="radio" name="some-name-2" />
        </RadioButtonWrapper>
        <RadioButtonWrapper label="Some label" hideLabel="true">
          <input type="radio" name="some-name-2" defaultChecked />
        </RadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with responsive label">
        <RadioButtonWrapper
          label="Some label"
          hideLabel="{'base': true, 'xs': false, 's': true, 'm': false, 'l': true, 'xl': false}"
        >
          <input type="radio" name="some-name-3" />
        </RadioButtonWrapper>
        <RadioButtonWrapper
          label="Some label"
          hideLabel="{'base': true, 'xs': false, 's': true, 'm': false, 'l': true, 'xl': false}"
        >
          <input type="radio" name="some-name-3" defaultChecked />
        </RadioButtonWrapper>
      </div>

      <div className="playground light" title="should render in required state">
        <RadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-3a" required />
        </RadioButtonWrapper>
        <RadioButtonWrapper label="This is a very insanely super long label across multiple lines">
          <input type="radio" name="some-name-3a" required />
        </RadioButtonWrapper>
        <RadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-3a" required disabled />
        </RadioButtonWrapper>
        <RadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-3a" required defaultChecked />
        </RadioButtonWrapper>
        <RadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-3b" required defaultChecked disabled />
        </RadioButtonWrapper>
      </div>

      <div className="playground light" title="should render in disabled state">
        <RadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-4" disabled />
        </RadioButtonWrapper>
        <RadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-4" defaultChecked disabled />
        </RadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with success state and success message">
        <RadioButtonWrapper label="Some label" state="success">
          <input type="radio" name="some-name-5" />
        </RadioButtonWrapper>
        <RadioButtonWrapper label="Some label" state="success" message="Some success validation message.">
          <input type="radio" name="some-name-5" defaultChecked />
        </RadioButtonWrapper>
      </div>

      <div
        className="playground light"
        title="should render with success state but without success message and not checked"
      >
        <RadioButtonWrapper label="Some label" state="success">
          <input type="radio" name="some-name-6" />
        </RadioButtonWrapper>
        <RadioButtonWrapper label="Some label" state="success">
          <input type="radio" name="some-name-6" defaultChecked />
        </RadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with error state and error message">
        <RadioButtonWrapper label="Some label" state="error">
          <input type="radio" name="some-name-7" />
        </RadioButtonWrapper>
        <RadioButtonWrapper label="Some label" state="error" message="Some error validation message.">
          <input type="radio" name="some-name-7" defaultChecked />
        </RadioButtonWrapper>
      </div>

      <div
        className="playground light"
        title="should render with error state but without error message and not checked"
      >
        <RadioButtonWrapper label="Some label" state="error">
          <input type="radio" name="some-name-8" />
        </RadioButtonWrapper>
        <RadioButtonWrapper label="Some label" state="error">
          <input type="radio" name="some-name-8" defaultChecked />
        </RadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with slotted content with error state and message">
        <RadioButtonWrapper state="error">
          <span slot="label">
            Some label with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <input type="radio" name="some-name-9" />
        </RadioButtonWrapper>
        <RadioButtonWrapper state="error">
          <span slot="label">
            Some label with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <input type="radio" name="some-name-9" />
          <span slot="message">
            Some error message with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
        </RadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with multiline label">
        <RadioButtonWrapper
          state="error"
          label="Lorem ipsum dolor sit amet, consetetur sadipscing"
          style={{ width: 240 }}
        >
          <input type="radio" name="some-name-11" />
        </RadioButtonWrapper>
        <RadioButtonWrapper
          state="error"
          label="Lorem ipsum dolor sit amet, consetetur sadipscing"
          style={{ width: 240 }}
        >
          <input type="radio" name="some-name-11" />
        </RadioButtonWrapper>
        <RadioButtonWrapper
          label="Lorem ipsum dolor sit amet, consetetur sadipscing"
          state="error"
          message="At vero eos et accusam et justo duo dolores et ea rebum."
          style={{ width: 240 }}
        >
          <input type="radio" name="some-name-11" />
        </RadioButtonWrapper>
      </div>
    </>
  );
};
