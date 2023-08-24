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

      <div className="playground light" title="should render without counter">
        <PTextFieldWrapper label="showCharacterCount=false" showCharacterCount={false}>
          <input type="text" maxLength={20} defaultValue="Some value" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render without counter">
        <PTextFieldWrapper label="showCounter=false" showCounter={false}>
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
        <PTextFieldWrapper label="Type password showPasswordToggle=false" showPasswordToggle={false}>
          <input type="password" defaultValue="some password" />
        </PTextFieldWrapper>
        <PTextFieldWrapper label="Type password long text" style={{ maxWidth: '15rem' }}>
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
        <PTextFieldWrapper label="Type search with long value">
          <input
            type="search"
            defaultValue="some really long password with many words and amazing special characters, letters big and small, numbers"
          />
        </PTextFieldWrapper>
        <PTextFieldWrapper label="Type search with action-icon" actionIcon="locate">
          <input type="search" />
        </PTextFieldWrapper>
        <PTextFieldWrapper
          label="Type search with action-icon and action-loading"
          actionIcon="locate"
          actionLoading={true}
        >
          <input type="search" />
        </PTextFieldWrapper>
        <form>
          <PTextFieldWrapper label="Type search with long value within form">
            <input
              type="search"
              defaultValue="some really long password with many words and amazing special characters, letters big and small, numbers"
            />
          </PTextFieldWrapper>
          <PTextFieldWrapper label="Type search with action-icon within form" actionIcon="locate">
            <input type="search" />
          </PTextFieldWrapper>
          <PTextFieldWrapper
            label="Type search with action-icon and action-loading within form"
            actionIcon="locate"
            actionLoading={true}
          >
            <input type="search" />
          </PTextFieldWrapper>
          <PTextFieldWrapper label="Type search with action-icon and long value within form" actionIcon="locate">
            <input
              type="search"
              defaultValue="some really long password with many words and amazing special characters, letters big and small, numbers"
            />
          </PTextFieldWrapper>
        </form>
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
          <span slot="label">
            <span>
              Slotted label. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
              {' '}<em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
          <input type="text" placeholder="Some placeholder" />
          <span slot="message">
            <span>
              Slotted error message. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PTextFieldWrapper>
      </div>

      <div
        className="playground light"
        title="should render label, description and message by slotted content with success state"
      >
        <PTextFieldWrapper state="success">
          <span slot="label">
            <span>
              Slotted label. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
              {' '}<em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
          <input type="text" placeholder="Some placeholder" />
          <span slot="message">
            <span>
              Slotted success message. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with multiline label, description, message and text">
        <PTextFieldWrapper
          label="Multiline label lorem ipsum dolor sit amet, consetetur sadipscing"
          description="Multiline description lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet"
          state="error"
          message="Multiline message at vero eos et accusam et justo duo dolores et ea rebum."
          style={{ maxWidth: '15rem' }}
        >
          <input type="text" defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr," />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render input type text with unit">
        <PTextFieldWrapper label="Label with unit and input type text" unit="km/h">
          <input type="text" defaultValue="three hundred" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render input type number with unit">
        <PTextFieldWrapper label="Label with unit and input type number" unit="km/h">
          <input type="number" defaultValue={300} />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render input type text with unit position suffix">
        <PTextFieldWrapper label="Label with unit, input type text and position suffix" unit="kWh" unitPosition="suffix">
          <input type="text" defaultValue="four hundred" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render input type number with unit position suffix">
        <PTextFieldWrapper
          label="Label with unit input, type number and position suffix"
          unit="kWh"
          unitPosition="suffix"
        >
          <input type="number" defaultValue={400} />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render counter when counter and unit are set">
        <PTextFieldWrapper label="Label with counter and unit" unit="km/h">
          <input type="text" defaultValue="three hundred" maxLength={50} />
        </PTextFieldWrapper>
      </div>

      <div
        className="playground light"
        title="should render unit when counter and unit are set and show-character-count is false"
      >
        <PTextFieldWrapper label="Label with unit and hidden counter" unit="km/h" showCharacterCount={false}>
          <input type="text" defaultValue="three hundred" maxLength={50} />
        </PTextFieldWrapper>
      </div>

      <div
        className="playground light"
        title="should render unit when counter with unit position suffix and show-character-count is false"
      >
        <PTextFieldWrapper
          label="Label with unit, position suffix and hidden counter"
          unit="km/h"
          unitPosition="suffix"
          showCharacterCount={false}
        >
          <input type="text" defaultValue="three hundred" maxLength={50} />
        </PTextFieldWrapper>
      </div>
    </>
  );
};
