/* Auto Generated File */
import type { NextPage } from 'next';
import { PTextFieldWrapper } from '@porsche-design-system/components-react/ssr';

const TextFieldWrapperPage: NextPage = (): JSX.Element => {
  const style = `
    @media only screen and (min-width: 760px) {
      #app,
      :host {
        display: grid;
        grid-template-columns: repeat(2, 50%);
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render with label">
        <PTextFieldWrapper label="Label">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render with label on dark theme">
        <PTextFieldWrapper label="Label" theme="dark">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with label and placeholder">
        <PTextFieldWrapper label="Label with placeholder">
          <input type="text" placeholder="Some placeholder" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render with label and placeholder on dark theme">
        <PTextFieldWrapper label="Label with placeholder" theme="dark">
          <input type="text" placeholder="Some placeholder" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with label, description and placeholder">
        <PTextFieldWrapper label="Label with description and placeholder" description="Some description">
          <input type="text" placeholder="Some placeholder" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render with label, description and placeholder on dark theme">
        <PTextFieldWrapper label="Label with description and placeholder" description="Some description" theme="dark">
          <input type="text" placeholder="Some placeholder" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render without label and without description">
        <PTextFieldWrapper label="Some label" description="Some description" hideLabel={true}>
          <input type="text" defaultValue="Without label and description" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render without label and without description on dark theme">
        <PTextFieldWrapper label="Some label" description="Some description" hideLabel={true} theme="dark">
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

      <div className="playground dark" title="should render with responsive label and description on dark theme">
        <PTextFieldWrapper
          label="Label responsive"
          description="Some description"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
          theme="dark"
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

      <div className="playground dark" title="should render in required state on dark theme">
        <PTextFieldWrapper label="Required" theme="dark">
          <input type="text" required />
        </PTextFieldWrapper>
        <PTextFieldWrapper label="Required and insanely super long label across multiple lines" theme="dark">
          <input type="text" required />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render in disabled state">
        <PTextFieldWrapper label="Disabled" description="Some description">
          <input type="text" disabled />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render in disabled state on dark theme">
        <PTextFieldWrapper label="Disabled" description="Some description" theme="dark">
          <input type="text" disabled />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with placeholder in disabled state">
        <PTextFieldWrapper label="Disabled placeholder">
          <input type="text" disabled placeholder="Some placeholder" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render with placeholder in disabled state on dark theme">
        <PTextFieldWrapper label="Disabled placeholder" theme="dark">
          <input type="text" disabled placeholder="Some placeholder" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with readonly state">
        <PTextFieldWrapper label="Readonly" description="Some description">
          <input type="text" defaultValue="Some value" readOnly />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render with readonly state on dark theme">
        <PTextFieldWrapper label="Readonly" description="Some description" theme="dark">
          <input type="text" defaultValue="Some value" readOnly />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with counter">
        <PTextFieldWrapper label="Counter">
          <input type="text" maxLength={20} defaultValue="Some value" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render with counter on dark theme">
        <PTextFieldWrapper label="Counter" theme="dark">
          <input type="text" maxLength={20} defaultValue="Some value" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render without counter">
        <PTextFieldWrapper label="showCharacterCount=false" showCharacterCount={false}>
          <input type="text" maxLength={20} defaultValue="Some value" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render without counter on dark theme">
        <PTextFieldWrapper label="showCharacterCount=false" showCharacterCount={false} theme="dark">
          <input type="text" maxLength={20} defaultValue="Some value" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render without counter">
        <PTextFieldWrapper label="showCounter=false" showCounter={false}>
          <input type="text" maxLength={20} defaultValue="Some value" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render without counter on dark theme">
        <PTextFieldWrapper label="showCounter=false" showCounter={false} theme="dark">
          <input type="text" maxLength={20} defaultValue="Some value" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type number">
        <PTextFieldWrapper label="Type number">
          <input type="number" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render with type number on dark theme">
        <PTextFieldWrapper label="Type number" theme="dark">
          <input type="number" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type email">
        <PTextFieldWrapper label="Type email">
          <input type="email" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render with type email on dark theme">
        <PTextFieldWrapper label="Type email" theme="dark">
          <input type="email" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type tel">
        <PTextFieldWrapper label="Type tel">
          <input type="tel" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render with type tel on dark theme">
        <PTextFieldWrapper label="Type tel" theme="dark">
          <input type="tel" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type url">
        <PTextFieldWrapper label="Type url">
          <input type="url" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render with type url on dark theme">
        <PTextFieldWrapper label="Type url" theme="dark">
          <input type="url" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type date">
        <PTextFieldWrapper label="Type date">
          <input type="date" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render with type date on dark theme">
        <PTextFieldWrapper label="Type date" theme="dark">
          <input type="date" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type time">
        <PTextFieldWrapper label="Type time">
          <input type="time" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render with type time on dark theme">
        <PTextFieldWrapper label="Type time" theme="dark">
          <input type="time" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type month">
        <PTextFieldWrapper label="Type month">
          <input type="month" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render with type month on dark theme">
        <PTextFieldWrapper label="Type month" theme="dark">
          <input type="month" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with type week">
        <PTextFieldWrapper label="Type week">
          <input type="week" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render with type week on dark theme">
        <PTextFieldWrapper label="Type week" theme="dark">
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

      <div className="playground dark" title="should render with type password in different states on dark theme">
        <PTextFieldWrapper label="Type password" theme="dark">
          <input type="password" defaultValue="some password" />
        </PTextFieldWrapper>
        <PTextFieldWrapper label="Type password disabled" theme="dark">
          <input type="password" defaultValue="some password" disabled />
        </PTextFieldWrapper>
        <PTextFieldWrapper label="Type password readonly" theme="dark">
          <input type="password" defaultValue="some password" readOnly />
        </PTextFieldWrapper>
        <PTextFieldWrapper label="Type password showPasswordToggle=false" showPasswordToggle={false} theme="dark">
          <input type="password" defaultValue="some password" />
        </PTextFieldWrapper>
        <PTextFieldWrapper label="Type password long text" style={{ maxWidth: '15rem' }} theme="dark">
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

      <div className="playground dark" title="should render with type search in different states on dark theme">
        <PTextFieldWrapper label="Type search" theme="dark">
          <input type="search" />
        </PTextFieldWrapper>
        <PTextFieldWrapper label="Type search disabled" theme="dark">
          <input type="search" disabled />
        </PTextFieldWrapper>
        <PTextFieldWrapper label="Type search readonly" theme="dark">
          <input type="search" readOnly />
        </PTextFieldWrapper>
        <PTextFieldWrapper label="Type search with long value" theme="dark">
          <input
            type="search"
            defaultValue="some really long password with many words and amazing special characters, letters big and small, numbers"
          />
        </PTextFieldWrapper>
        <PTextFieldWrapper label="Type search with action-icon" actionIcon="locate" theme="dark">
          <input type="search" />
        </PTextFieldWrapper>
        <PTextFieldWrapper
          label="Type search with action-icon and action-loading"
          actionIcon="locate"
          actionLoading={true}
          theme="dark"
        >
          <input type="search" />
        </PTextFieldWrapper>
        <form>
          <PTextFieldWrapper label="Type search with long value within form" theme="dark">
            <input
              type="search"
              defaultValue="some really long password with many words and amazing special characters, letters big and small, numbers"
            />
          </PTextFieldWrapper>
          <PTextFieldWrapper label="Type search with action-icon within form" actionIcon="locate" theme="dark">
            <input type="search" />
          </PTextFieldWrapper>
          <PTextFieldWrapper
            label="Type search with action-icon and action-loading within form"
            actionIcon="locate"
            actionLoading={true}
            theme="dark"
          >
            <input type="search" />
          </PTextFieldWrapper>
          <PTextFieldWrapper
            label="Type search with action-icon and long value within form"
            actionIcon="locate"
            theme="dark"
          >
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

      <div className="playground dark" title="should render with error state and error message on theme dark">
        <PTextFieldWrapper label="Error with message" state="error" message="Error message" theme="dark">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with error state and no error message">
        <PTextFieldWrapper label="Error without message" state="error">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render with error state and no error message on theme dark">
        <PTextFieldWrapper label="Error without message" state="error" theme="dark">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with success state and success message">
        <PTextFieldWrapper label="Success with message" state="success" message="Success message">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render with success state and success message on theme dark">
        <PTextFieldWrapper label="Success with message" state="success" message="Success message" theme="dark">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with success state and no success message">
        <PTextFieldWrapper label="Success without message" state="success">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render with success state and no success message on theme dark">
        <PTextFieldWrapper label="Success without message" state="success" theme="dark">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render with default state and no message">
        <PTextFieldWrapper label="Default without message" state="none" message="this message should be hidden">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render with default state and no message on theme dark">
        <PTextFieldWrapper
          label="Default without message"
          state="none"
          message="this message should be hidden"
          theme="dark"
        >
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
        className="playground dark"
        title="should render label, description and message by slotted content with error state on theme dark"
      >
        <PTextFieldWrapper state="error" theme="dark">
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

      <div
        className="playground dark"
        title="should render label, description and message by slotted content with success state on theme dark"
      >
        <PTextFieldWrapper state="success" theme="dark">
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

      <div className="playground dark" title="should render with multiline label, description, message and text on theme dark">
        <PTextFieldWrapper
          label="Multiline label lorem ipsum dolor sit amet, consetetur sadipscing"
          description="Multiline description lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet"
          state="error"
          message="Multiline message at vero eos et accusam et justo duo dolores et ea rebum."
          style={{ maxWidth: '15rem' }}
          theme="dark"
        >
          <input type="text" defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr," />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render input type text with unit">
        <PTextFieldWrapper label="Label with unit and input type text" unit="km/h">
          <input type="text" defaultValue="three hundred" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render input type text with unit on theme dark">
        <PTextFieldWrapper label="Label with unit and input type text" unit="km/h" theme="dark">
          <input type="text" defaultValue="three hundred" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render input type number with unit">
        <PTextFieldWrapper label="Label with unit and input type number" unit="km/h">
          <input type="number" defaultValue={300} />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render input type number with unit on theme dark">
        <PTextFieldWrapper label="Label with unit and input type number" unit="km/h" theme="dark">
          <input type="number" defaultValue={300} />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render input type text with unit position suffix">
        <PTextFieldWrapper label="Label with unit, input type text and position suffix" unit="kWh" unitPosition="suffix">
          <input type="text" defaultValue="four hundred" />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render input type text with unit position suffix on theme dark">
        <PTextFieldWrapper
          label="Label with unit, input type text and position suffix"
          unit="kWh"
          unitPosition="suffix"
          theme="dark"
        >
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

      <div className="playground dark" title="should render input type number with unit position suffix on theme dark">
        <PTextFieldWrapper
          label="Label with unit input, type number and position suffix"
          unit="kWh"
          unitPosition="suffix"
          theme="dark"
        >
          <input type="number" defaultValue={400} />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render counter when counter and unit are set">
        <PTextFieldWrapper label="Label with counter and unit" unit="km/h">
          <input type="text" defaultValue="three hundred" maxLength={50} />
        </PTextFieldWrapper>
      </div>

      <div className="playground dark" title="should render counter when counter and unit are set on theme dark">
        <PTextFieldWrapper label="Label with counter and unit" unit="km/h" theme="dark">
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
        className="playground dark"
        title="should render unit when counter and unit are set and show-character-count is false on theme dark"
      >
        <PTextFieldWrapper
          label="Label with unit and hidden counter"
          unit="km/h"
          showCharacterCount={false}
          theme="dark"
        >
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

      <div
        className="playground dark"
        title="should render unit when counter with unit position suffix and show-character-count is false on theme dark"
      >
        <PTextFieldWrapper
          label="Label with unit, position suffix and hidden counter"
          unit="km/h"
          unitPosition="suffix"
          showCharacterCount={false}
          theme="dark"
        >
          <input type="text" defaultValue="three hundred" maxLength={50} />
        </PTextFieldWrapper>
      </div>
    </>
  );
};

export default TextFieldWrapperPage;
