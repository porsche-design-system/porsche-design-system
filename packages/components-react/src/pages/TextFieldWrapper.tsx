import { PTextFieldWrapper as TextFieldWrapper } from '@porsche-design-system/components-react';
import React from 'react';

export const TextFieldWrapperPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render with label">
        <TextFieldWrapper label="Some label">
          <input type="text" name="some-name" />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with label and placeholder">
        <TextFieldWrapper label="Some label">
          <input type="text" name="some-name" placeholder="Some placeholder" />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with label, description and placeholder">
        <TextFieldWrapper label="Some label" description="Some description">
          <input type="text" name="some-name" placeholder="Some placeholder" />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render without label and without description">
        <TextFieldWrapper label="Some label" description="Some description" hideLabel={true}>
          <input type="text" name="some-name" />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with responsive label and description">
        <TextFieldWrapper
          label="Some label"
          description="Some description"
          hideLabel="{'base': true, 'xs': false, 's': true, 'm': false, 'l': true, 'xl': false}"
        >
          <input type="text" name="some-name" />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with disabled state">
        <TextFieldWrapper label="Some label" description="Some description">
          <input type="text" name="some-name" disabled />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with placeholder with disabled state">
        <TextFieldWrapper label="Some label">
          <input type="text" name="some-name" placeholder="Some placeholder" disabled />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with readonly state">
        <TextFieldWrapper label="Some label" description="Some description">
          <input type="text" name="some-name" value="Some value" readOnly />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type number">
        <TextFieldWrapper label="Some label">
          <input type="number" name="some-name" />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type email">
        <TextFieldWrapper label="Some label">
          <input type="email" name="some-name" />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type tel">
        <TextFieldWrapper label="Some label">
          <input type="tel" name="some-name" />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type url">
        <TextFieldWrapper label="Some label">
          <input type="url" name="some-name" />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type date">
        <TextFieldWrapper label="Some label">
          <input type="date" name="some-name" />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type time">
        <TextFieldWrapper label="Some label">
          <input type="time" name="some-name" />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type month">
        <TextFieldWrapper label="Some label">
          <input type="month" name="some-name" />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type week">
        <TextFieldWrapper label="Some label">
          <input type="week" name="some-name" />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type password in different states">
        <TextFieldWrapper label="Some label">
          <input type="password" name="some-name" defaultValue="some password" />
        </TextFieldWrapper>
        <br />
        <TextFieldWrapper label="Some label">
          <input type="password" name="some-name" value="some password" disabled />
        </TextFieldWrapper>
        <br />
        <TextFieldWrapper label="Some label">
          <input type="password" name="some-name" value="some password" readOnly />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type search in different states">
        <TextFieldWrapper label="Some label">
          <input type="search" name="some-name" />
        </TextFieldWrapper>
        <br />
        <TextFieldWrapper label="Some label">
          <input type="search" name="some-name" disabled />
        </TextFieldWrapper>
        <br />
        <TextFieldWrapper label="Some label">
          <input type="search" name="some-name" readOnly />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with error state and error message">
        <TextFieldWrapper label="Some label" state="error" message="error message">
          <input type="text" name="some-name" />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with error state and no error message">
        <TextFieldWrapper label="Some label" state="error">
          <input type="text" name="some-name" />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with success state and success message">
        <TextFieldWrapper label="Some label" state="success" message="success message">
          <input type="text" name="some-name" />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with success state and no success message">
        <TextFieldWrapper label="Some label" state="success">
          <input type="text" name="some-name" />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render with default state and no message">
        <TextFieldWrapper label="Some label" state="none" message="this message should be hidden">
          <input type="text" name="some-name" />
        </TextFieldWrapper>
      </div>

      <div
        className="playground light"
        title="should render label, description and message by slotted content with error state"
      >
        <TextFieldWrapper state="error">
          <span slot="label">
            Some label with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <span slot="description">
            Some description with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <input type="text" name="some-name" placeholder="Some placeholder" />
          <span slot="message">
            Some error message with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
        </TextFieldWrapper>
      </div>

      <div
        className="playground light"
        title="should render label, description and message by slotted content with success state"
      >
        <TextFieldWrapper state="success">
          <span slot="label">
            Some label with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <span slot="description">
            Some description with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <input type="text" name="some-name" placeholder="Some placeholder" />
          <span slot="message">
            Some success message with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
        </TextFieldWrapper>
      </div>

      <div
        className="playground light"
        title="should render with multiline label, description and message and cut off too long option text"
      >
        <TextFieldWrapper
          label="Lorem ipsum dolor sit amet, consetetur sadipscing"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet"
          state="error"
          message="At vero eos et accusam et justo duo dolores et ea rebum."
          style={{ width: 240 }}
        >
          <input type="text" name="some-name" defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr," />
        </TextFieldWrapper>
      </div>

      <div className="playground light" title="should render in focus state">
        <TextFieldWrapper label="Some label">
          <input id="test-focus-state" style={{ caretColor: 'transparent' }} type="text" name="some-name" />
        </TextFieldWrapper>
      </div>
    </>
  );
};
