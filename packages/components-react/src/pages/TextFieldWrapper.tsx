import { PTextFieldWrapper } from '@porsche-design-system/components-react';

export const TextFieldWrapperPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render with label">
        <PTextFieldWrapper label="Label default">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with label and placeholder">
        <PTextFieldWrapper label="Label with placeholder">
          <input type="text" placeholder="Some placeholder" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with label, description and placeholder">
        <PTextFieldWrapper label="Label with description" description="Some description">
          <input type="text" placeholder="Some placeholder" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render without label and without description">
        <PTextFieldWrapper label="Some label" description="Some description" hideLabel={true}>
          <input type="text" placeholder="Without label and without description" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with responsive label and description">
        <PTextFieldWrapper
          label="Label responsive"
          description="Some description"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          <input type="text" placeholder="Responsive label and description" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render in required state">
        <PTextFieldWrapper label="Label required">
          <input type="text" required />
        </PTextFieldWrapper>
        <PTextFieldWrapper label="This is a very insanely super long required label across multiple lines">
          <input type="text" required />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render in disabled state">
        <PTextFieldWrapper label="Label disabled" description="Some description">
          <input type="text" disabled />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with placeholder in disabled state">
        <PTextFieldWrapper label="Label disabled with placeholder">
          <input type="text" placeholder="Some placeholder" disabled />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with readonly state">
        <PTextFieldWrapper label="Label readonly with description" description="Some description">
          <input type="text" value="Some value" readOnly />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type number">
        <PTextFieldWrapper label="Label type number">
          <input type="number" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type email">
        <PTextFieldWrapper label="Label type email">
          <input type="email" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type tel">
        <PTextFieldWrapper label="Label type tel">
          <input type="tel" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type url">
        <PTextFieldWrapper label="Label type url">
          <input type="url" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type date">
        <PTextFieldWrapper label="Label type date">
          <input type="date" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type time">
        <PTextFieldWrapper label="Label type time">
          <input type="time" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type month">
        <PTextFieldWrapper label="Label type month">
          <input type="month" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type week">
        <PTextFieldWrapper label="Label type week">
          <input type="week" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type password in different states">
        <PTextFieldWrapper label="Label type password">
          <input type="password" value="some password" />
        </PTextFieldWrapper>
        <br />
        <PTextFieldWrapper label="Label type password disabled">
          <input type="password" value="some password" disabled />
        </PTextFieldWrapper>
        <br />
        <PTextFieldWrapper label="Label type password readonly">
          <input type="password" value="some password" readOnly />
        </PTextFieldWrapper>
        <br />
        <PTextFieldWrapper label="Label type password" style={{ width: 240 }}>
          <input
            type="password"
            value="some really long password with many words and amazing special characters, letters big and small, numbers"
          />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type search in different states">
        <PTextFieldWrapper label="Label type search">
          <input type="search" />
        </PTextFieldWrapper>
        <br />
        <PTextFieldWrapper label="Label type search disabled">
          <input type="search" disabled />
        </PTextFieldWrapper>
        <br />
        <PTextFieldWrapper label="Label type search readonly">
          <input type="search" readOnly />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with error state and error message">
        <PTextFieldWrapper label="Label state error with message" state="error" message="error message">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with error state and no error message">
        <PTextFieldWrapper label="Label state error without message" state="error">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with success state and success message">
        <PTextFieldWrapper label="Label state success with message" state="success" message="success message">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with success state and no success message">
        <PTextFieldWrapper label="Label state success without message" state="success">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with default state and no message">
        <PTextFieldWrapper label="Label default state no message" state="none" message="this message should be hidden">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div
        className="playground light"
        title="should render label, description and message by slotted content with error state"
      >
        <PTextFieldWrapper state="error">
          <span slot="label">
            Label slotted with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <span slot="description">
            Some description with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <input type="text" placeholder="Some placeholder" />
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
            Label slotted with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <span slot="description">
            Some description with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <input type="text" placeholder="Some placeholder" />
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
          <input type="text" value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr," />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with unit">
        <PTextFieldWrapper label="Label with unit" unit="km/h">
          <input type="number" value="300" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with unit position suffix">
        <PTextFieldWrapper label="Label with unit position suffix" unit="kWh" unitPosition="suffix">
          <input type="number" value="400" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render a maximum of five characters per unit">
        <PTextFieldWrapper label="Label with long unit" unit="kg/m³55555">
          <input type="number" value="7777" />
        </PTextFieldWrapper>
      </div>
    </>
  );
};
