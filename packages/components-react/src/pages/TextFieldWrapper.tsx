import { PTextFieldWrapper } from '@porsche-design-system/components-react';

export const TextFieldWrapperPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render with label">
        <PTextFieldWrapper label="Some label">
          <input type="text" name="some-name" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with label and placeholder">
        <PTextFieldWrapper label="Some label">
          <input type="text" name="some-name" placeholder="Some placeholder" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with label, description and placeholder">
        <PTextFieldWrapper label="Some label" description="Some description">
          <input type="text" name="some-name" placeholder="Some placeholder" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render without label and without description">
        <PTextFieldWrapper label="Some label" description="Some description" hideLabel={true}>
          <input type="text" name="some-name" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with responsive label and description">
        <PTextFieldWrapper
          label="Some label"
          description="Some description"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          <input type="text" name="some-name" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render in required state">
        <PTextFieldWrapper label="Some label">
          <input type="text" name="some-name" required />
        </PTextFieldWrapper>
        <PTextFieldWrapper label="This is a very insanely super long label across multiple lines">
          <input type="text" name="some-name" required />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render in disabled state">
        <PTextFieldWrapper label="Some label" description="Some description">
          <input type="text" name="some-name" disabled />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with placeholder in disabled state">
        <PTextFieldWrapper label="Some label">
          <input type="text" name="some-name" placeholder="Some placeholder" disabled />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with readonly state">
        <PTextFieldWrapper label="Some label" description="Some description">
          <input type="text" name="some-name" value="Some value" readOnly />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type number">
        <PTextFieldWrapper label="Some label">
          <input type="number" name="some-name" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type email">
        <PTextFieldWrapper label="Some label">
          <input type="email" name="some-name" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type tel">
        <PTextFieldWrapper label="Some label">
          <input type="tel" name="some-name" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type url">
        <PTextFieldWrapper label="Some label">
          <input type="url" name="some-name" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type date">
        <PTextFieldWrapper label="Some label">
          <input type="date" name="some-name" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type time">
        <PTextFieldWrapper label="Some label">
          <input type="time" name="some-name" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type month">
        <PTextFieldWrapper label="Some label">
          <input type="month" name="some-name" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type week">
        <PTextFieldWrapper label="Some label">
          <input type="week" name="some-name" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type password in different states">
        <PTextFieldWrapper label="Some label">
          <input type="password" name="some-name" defaultValue="some password" />
        </PTextFieldWrapper>
        <br />
        <PTextFieldWrapper label="Some label">
          <input type="password" name="some-name" value="some password" disabled />
        </PTextFieldWrapper>
        <br />
        <PTextFieldWrapper label="Some label">
          <input type="password" name="some-name" value="some password" readOnly />
        </PTextFieldWrapper>
        <br />
        <PTextFieldWrapper label="Some label" style={{ width: 240 }}>
          <input
            type="password"
            name="some-name"
            value="some really long password with many words and amazing special characters, letters big and small, numbers"
          />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type search in different states">
        <PTextFieldWrapper label="Some label">
          <input type="search" name="some-name" />
        </PTextFieldWrapper>
        <br />
        <PTextFieldWrapper label="Some label">
          <input type="search" name="some-name" disabled />
        </PTextFieldWrapper>
        <br />
        <PTextFieldWrapper label="Some label">
          <input type="search" name="some-name" readOnly />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with error state and error message">
        <PTextFieldWrapper label="Some label" state="error" message="error message">
          <input type="text" name="some-name" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with error state and no error message">
        <PTextFieldWrapper label="Some label" state="error">
          <input type="text" name="some-name" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with success state and success message">
        <PTextFieldWrapper label="Some label" state="success" message="success message">
          <input type="text" name="some-name" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with success state and no success message">
        <PTextFieldWrapper label="Some label" state="success">
          <input type="text" name="some-name" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with default state and no message">
        <PTextFieldWrapper label="Some label" state="none" message="this message should be hidden">
          <input type="text" name="some-name" />
        </PTextFieldWrapper>
      </div>

      <div
        className="playground light"
        title="should render label, description and message by slotted content with error state"
      >
        <PTextFieldWrapper state="error">
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
        </PTextFieldWrapper>
      </div>

      <div
        className="playground light"
        title="should render label, description and message by slotted content with success state"
      >
        <PTextFieldWrapper state="success">
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
        </PTextFieldWrapper>
      </div>

      <div
        className="playground light"
        title="should render with multiline label, description and message and cut off too long option text"
      >
        <PTextFieldWrapper
          label="Lorem ipsum dolor sit amet, consetetur sadipscing"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet"
          state="error"
          message="At vero eos et accusam et justo duo dolores et ea rebum."
          style={{ width: 240 }}
        >
          <input type="text" name="some-name" defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr," />
        </PTextFieldWrapper>
      </div>
    </>
  );
};
