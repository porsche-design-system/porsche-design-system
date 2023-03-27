/* Auto Generated File */
import type { NextPage } from 'next';
import { PTextareaWrapper } from '@porsche-design-system/components-react/ssr';

const TextareaWrapperPage: NextPage = (): JSX.Element => {
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
        <PTextareaWrapper label="Label">
          <textarea />
        </PTextareaWrapper>
      </div>
      <div className="playground dark" title="should render with label on dark theme">
        <PTextareaWrapper label="Label" theme="dark">
          <textarea />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with label and placeholder">
        <PTextareaWrapper label="Label with placeholder">
          <textarea placeholder="Some placeholder" />
        </PTextareaWrapper>
      </div>
      <div className="playground dark" title="should render with label and placeholder on dark theme">
        <PTextareaWrapper label="Label with placeholder" theme="dark">
          <textarea placeholder="Some placeholder" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with label, description and placeholder">
        <PTextareaWrapper label="Label with description and placeholder" description="Some description">
          <textarea placeholder="Some placeholder" />
        </PTextareaWrapper>
      </div>
      <div className="playground dark" title="should render with label, description and placeholder on dark theme">
        <PTextareaWrapper label="Label with description and placeholder" description="Some description" theme="dark">
          <textarea placeholder="Some placeholder" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render without label and without description">
        <PTextareaWrapper label="Label" description="Some description" hideLabel={true}>
          <textarea defaultValue="Without label and description" />
        </PTextareaWrapper>
      </div>
      <div className="playground dark" title="should render without label and without description on dark theme">
        <PTextareaWrapper label="Label" description="Some description" hideLabel={true} theme="dark">
          <textarea defaultValue="Without label and description" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with responsive label and description">
        <PTextareaWrapper
          label="Label"
          description="Some description"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          <textarea defaultValue="Responsive label and description" />
        </PTextareaWrapper>
      </div>
      <div className="playground dark" title="should render with responsive label and description on dark theme">
        <PTextareaWrapper
          label="Label"
          description="Some description"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
          theme="dark"
        >
          <textarea defaultValue="Responsive label and description" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render in required state">
        <PTextareaWrapper label="Required">
          <textarea required />
        </PTextareaWrapper>
        <PTextareaWrapper label="Required and insanely super long label across multiple lines">
          <textarea required />
        </PTextareaWrapper>
      </div>
      <div className="playground dark" title="should render in required state on dark theme">
        <PTextareaWrapper label="Required" theme="dark">
          <textarea required />
        </PTextareaWrapper>
        <PTextareaWrapper label="Required and insanely super long label across multiple lines" theme="dark">
          <textarea required />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render in disabled state">
        <PTextareaWrapper label="Disabled" description="Some description">
          <textarea disabled />
        </PTextareaWrapper>
      </div>
      <div className="playground dark" title="should render in disabled state on dark theme">
        <PTextareaWrapper label="Disabled" description="Some description" theme="dark">
          <textarea disabled />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with placeholder in disabled state">
        <PTextareaWrapper label="Disabled placeholder">
          <textarea disabled placeholder="Some placeholder" />
        </PTextareaWrapper>
      </div>
      <div className="playground dark" title="should render with placeholder in disabled state on dark theme">
        <PTextareaWrapper label="Disabled placeholder" theme="dark">
          <textarea disabled placeholder="Some placeholder" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render in readonly state">
        <PTextareaWrapper label="Readonly">
          <textarea readOnly defaultValue="Some value" />
        </PTextareaWrapper>
      </div>
      <div className="playground dark" title="should render in readonly state on dark theme">
        <PTextareaWrapper label="Readonly" theme="dark">
          <textarea readOnly defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with counter">
        <PTextareaWrapper label="Counter">
          <textarea maxLength={200} defaultValue="Some value" />
        </PTextareaWrapper>
      </div>
      <div className="playground dark" title="should render with counter on dark theme">
        <PTextareaWrapper label="Counter" theme="dark">
          <textarea maxLength={200} defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render without counter">
        <PTextareaWrapper label="showCharacterCount=false" showCharacterCount={false}>
          <textarea maxLength={200} defaultValue="Some value" />
        </PTextareaWrapper>
      </div>
      <div className="playground dark" title="should render without counter on dark theme">
        <PTextareaWrapper label="showCharacterCount=false" showCharacterCount={false} theme="dark">
          <textarea maxLength={200} defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render without counter">
        <PTextareaWrapper label="showCounter=false" showCounter={false}>
          <textarea maxLength={200} defaultValue="Some value" />
        </PTextareaWrapper>
      </div>
      <div className="playground dark" title="should render without counter on dark theme">
        <PTextareaWrapper label="showCounter=false" showCounter={false} theme="dark">
          <textarea maxLength={200} defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with error state and error message">
        <PTextareaWrapper label="Error with message" state="error" message="Error message">
          <textarea defaultValue="Some value" />
        </PTextareaWrapper>
      </div>
      <div className="playground dark" title="should render with error state and error message on dark theme">
        <PTextareaWrapper label="Error with message" state="error" message="Error message" theme="dark">
          <textarea defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with error state and no error message">
        <PTextareaWrapper label="Error without message" state="error">
          <textarea defaultValue="Some value" />
        </PTextareaWrapper>
      </div>
      <div className="playground dark" title="should render with error state and no error message on dark theme">
        <PTextareaWrapper label="Error without message" state="error" theme="dark">
          <textarea defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with success state and success message">
        <PTextareaWrapper label="Success with message" state="success" message="Success message">
          <textarea defaultValue="Some value" />
        </PTextareaWrapper>
      </div>
      <div className="playground dark" title="should render with success state and success message on dark theme">
        <PTextareaWrapper label="Success with message" state="success" message="Success message" theme="dark">
          <textarea defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with success state and no success message">
        <PTextareaWrapper label="Success without message" state="success">
          <textarea defaultValue="Some value" />
        </PTextareaWrapper>
      </div>
      <div className="playground dark" title="should render with success state and no success message on dark theme">
        <PTextareaWrapper label="Success without message" state="success" theme="dark">
          <textarea defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with default state and no message">
        <PTextareaWrapper label="Default without message" state="none" message="this message should be hidden">
          <textarea defaultValue="Some value" />
        </PTextareaWrapper>
      </div>
      <div className="playground dark" title="should render with default state and no message on dark theme">
        <PTextareaWrapper label="Default without message" state="none" message="this message should be hidden" theme="dark">
          <textarea defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render label, description and message by slotted content with error state">
        <PTextareaWrapper state="error">
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
          <textarea defaultValue="Some value" />
          <span slot="message">
            <span>
              Slotted error message. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PTextareaWrapper>
      </div>
      <div
        className="playground dark"
        title="should render label, description and message by slotted content with error state on dark theme"
      >
        <PTextareaWrapper state="error" theme="dark">
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
          <textarea defaultValue="Some value" />
          <span slot="message">
            <span>
              Slotted error message. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PTextareaWrapper>
      </div>

      <div
        className="playground light"
        title="should render label, description and message by slotted content with success state"
      >
        <PTextareaWrapper state="success">
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
          <textarea defaultValue="Some value" />
          <span slot="message">
            <span>
              Slotted success message. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PTextareaWrapper>
      </div>
      <div
        className="playground dark"
        title="should render label, description and message by slotted content with success state on dark theme"
      >
        <PTextareaWrapper state="success" theme="dark">
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
          <textarea defaultValue="Some value" />
          <span slot="message">
            <span>
              Slotted success message. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with multiline label, description, message and text">
        <PTextareaWrapper
          label="Multiline label lorem ipsum dolor sit amet, consetetur sadipscing"
          description="Multiline description lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet"
          state="error"
          message="Multiline message at vero eos et accusam et justo duo dolores et ea rebum."
          style={{ maxWidth: '15rem' }}
        >
          <textarea defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet," />
        </PTextareaWrapper>
      </div>
      <div className="playground dark" title="should render with multiline label, description, message and text on dark theme">
        <PTextareaWrapper
          label="Multiline label lorem ipsum dolor sit amet, consetetur sadipscing"
          description="Multiline description lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet"
          state="error"
          message="Multiline message at vero eos et accusam et justo duo dolores et ea rebum."
          style={{ maxWidth: '15rem' }}
          theme="dark"
        >
          <textarea defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet," />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with label and multiline text">
        <PTextareaWrapper label="Multiline text">
          <textarea defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet," />
        </PTextareaWrapper>
      </div>
      <div className="playground dark" title="should render with label and multiline text on dark theme">
        <PTextareaWrapper label="Multiline text" theme="dark">
          <textarea defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet," />
        </PTextareaWrapper>
      </div>
    </>
  );
};

export default TextareaWrapperPage;
