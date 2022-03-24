/* Auto Generated File */
import { PTextFieldWrapper } from '@porsche-design-system/components-react';

export const TextFieldWrapperPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render with label">
        <PTextFieldWrapper label="Label">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with label and placeholder">
        <PTextFieldWrapper label="Label with placeholder">
          <input type="text" placeholder="Some placeholder" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with label, description and placeholder">
        <PTextFieldWrapper label="Label with description and placeholder" description="Some description">
          <input type="text" placeholder="Some placeholder" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render without label and without description">
        <PTextFieldWrapper label="Some label" description="Some description" hideLabel={true}>
          <input type="text" defaultValue="Without label and description" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with responsive label and description">
        <PTextFieldWrapper
          label="Label responsive"
          description="Some description"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          <input type="text" defaultValue="Responsive label and description" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render in required state">
        <PTextFieldWrapper label="Required">
          <input type="text" required />
        </PTextFieldWrapper>
        <PTextFieldWrapper label="Required and insanely super long label across multiple lines">
          <input type="text" required />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render in disabled state">
        <PTextFieldWrapper label="Disabled" description="Some description">
          <input type="text" disabled />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with placeholder in disabled state">
        <PTextFieldWrapper label="Disabled placeholder">
          <input type="text" disabled placeholder="Some placeholder" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with readonly state">
        <PTextFieldWrapper label="Readonly" description="Some description">
          <input type="text" defaultValue="Some value" readOnly />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with counter">
        <PTextFieldWrapper label="Counter">
          <input type="text" maxLength={20} defaultValue="Some value" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type number">
        <PTextFieldWrapper label="Type number">
          <input type="number" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type email">
        <PTextFieldWrapper label="Type email">
          <input type="email" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type tel">
        <PTextFieldWrapper label="Type tel">
          <input type="tel" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type url">
        <PTextFieldWrapper label="Type url">
          <input type="url" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type date">
        <PTextFieldWrapper label="Type date">
          <input type="date" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type time">
        <PTextFieldWrapper label="Type time">
          <input type="time" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type month">
        <PTextFieldWrapper label="Type month">
          <input type="month" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type week">
        <PTextFieldWrapper label="Type week">
          <input type="week" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type password in different states">
        <PTextFieldWrapper label="Type password">
          <input type="password" defaultValue="some password" />
        </PTextFieldWrapper>
        <PTextFieldWrapper label="Type password disabled">
          <input type="password" defaultValue="some password" disabled />
        </PTextFieldWrapper>
        <PTextFieldWrapper label="Type password readonly">
          <input type="password" defaultValue="some password" readOnly />
        </PTextFieldWrapper>
        <PTextFieldWrapper label="Type password long text" style={{ width: '240px' }}>
          <input
            type="password"
            defaultValue="some really long password with many words and amazing special characters, letters big and small, numbers"
          />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type search in different states">
        <PTextFieldWrapper label="Type search">
          <input type="search" />
        </PTextFieldWrapper>
        <PTextFieldWrapper label="Type search disabled">
          <input type="search" disabled />
        </PTextFieldWrapper>
        <PTextFieldWrapper label="Type search readonly">
          <input type="search" readOnly />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with error state and error message">
        <PTextFieldWrapper label="Error with message" state="error" message="Error message">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with error state and no error message">
        <PTextFieldWrapper label="Error without message" state="error">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with success state and success message">
        <PTextFieldWrapper label="Success with message" state="success" message="Success message">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with success state and no success message">
        <PTextFieldWrapper label="Success without message" state="success">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with default state and no message">
        <PTextFieldWrapper label="Default without message" state="none" message="this message should be hidden">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render label, description and message by slotted content with error state">
        <PTextFieldWrapper state="error">
          <span slot="label">Slotted error label with a <a href="#">link</a></span>
          <span slot="description">Slotted description with a <a href="#">link</a></span>
          <input type="text" placeholder="Some placeholder" />
          <span slot="message">Slotted message with a <a href="#">link</a></span>
        </PTextFieldWrapper>
      </div>

      <div
        className="playground light"
        title="should render label, description and message by slotted content with success state"
      >
        <PTextFieldWrapper state="success">
          <span slot="label">Slotted success label with a <a href="#">link</a></span>
          <span slot="description">Slotted description with a <a href="#">link</a></span>
          <input type="text" placeholder="Some placeholder" />
          <span slot="message">Slotted message with a <a href="#">link</a></span>
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with multiline label, description, message and text">
        <PTextFieldWrapper
          label="Multiline label lorem ipsum dolor sit amet, consetetur sadipscing"
          description="Multiline description lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet"
          state="error"
          message="Multiline message at vero eos et accusam et justo duo dolores et ea rebum."
          style={{ width: '240px' }}
        >
          <input type="text" defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr," />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render input type='text' with unit">
        <PTextFieldWrapper label="Label with unit input type text" unit="km/h">
          <input type="text" defaultValue="three hundred" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render input type='number' with unit">
        <PTextFieldWrapper label="Label with unit input type number" unit="km/h">
          <input type="number" defaultValue={300} />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render input type='text' with unit position suffix">
        <PTextFieldWrapper label="Label with unit input type text position suffix" unit="kWh" unitPosition="suffix">
          <input type="text" defaultValue="four hundred" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render input type='number' with unit position suffix">
        <PTextFieldWrapper label="Label with unit input type number position suffix" unit="kWh" unitPosition="suffix">
          <input type="number" defaultValue={400} />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render counter when counter and unit are set">
        <PTextFieldWrapper label="Label with counter and unit" unit="km/h">
          <input type="text" defaultValue="three hundred" maxLength={50} />
        </PTextFieldWrapper>
      </div>
    </>
  );
};
