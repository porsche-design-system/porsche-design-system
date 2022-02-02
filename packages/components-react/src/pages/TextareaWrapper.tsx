/* Auto Generated File */
import { PTextareaWrapper } from '@porsche-design-system/components-react';

export const TextareaWrapperPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render with label">
        <PTextareaWrapper label="Label">
          <textarea />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with label and placeholder">
        <PTextareaWrapper label="Label with placeholder">
          <textarea placeholder="Some placeholder" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with label, description and placeholder">
        <PTextareaWrapper label="Label with description and placeholder" description="Some description">
          <textarea placeholder="Some placeholder" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render without label and without description">
        <PTextareaWrapper label="Label" description="Some description" hideLabel={true}>
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

      <div className="playground light" title="should render in required state">
        <PTextareaWrapper label="Required">
          <textarea required />
        </PTextareaWrapper>
        <PTextareaWrapper label="Required and insanely super long label across multiple lines">
          <textarea required />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render in disabled state">
        <PTextareaWrapper label="Disabled" description="Some description">
          <textarea disabled />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with placeholder in disabled state">
        <PTextareaWrapper label="Disabled placeholder">
          <textarea disabled placeholder="Some placeholder" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render in readonly state">
        <PTextareaWrapper label="Readonly">
          <textarea readOnly defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with counter">
        <PTextareaWrapper label="Counter">
          <textarea maxLength={200} defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with error state and error message">
        <PTextareaWrapper label="Error with message" state="error" message="Error message">
          <textarea defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with error state and no error message">
        <PTextareaWrapper label="Error without message" state="error">
          <textarea defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with success state and success message">
        <PTextareaWrapper label="Success with message" state="success" message="Success message">
          <textarea defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with success state and no success message">
        <PTextareaWrapper label="Success without message" state="success">
          <textarea defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with default state and no message">
        <PTextareaWrapper label="Default without message" state="none" message="this message should be hidden">
          <textarea defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render label, description and message by slotted content with error state">
        <PTextareaWrapper state="error">
          <span slot="label">Slotted error label with a <a href="#">link</a></span>
          <span slot="description">Slotted description with a <a href="#">link</a></span>
          <textarea defaultValue="Some value" />
          <span slot="message">Slotted message with a <a href="#">link</a></span>
        </PTextareaWrapper>
      </div>

      <div
        className="playground light"
        title="should render label, description and message by slotted content with success state"
      >
        <PTextareaWrapper state="success">
          <span slot="label">Slotted success label with a <a href="#">link</a></span>
          <span slot="description">Slotted description with a <a href="#">link</a></span>
          <textarea defaultValue="Some value" />
          <span slot="message">Slotted message with a <a href="#">link</a></span>
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with multiline label, description, message and text">
        <PTextareaWrapper
          label="Multiline label lorem ipsum dolor sit amet, consetetur sadipscing"
          description="Multiline description lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet"
          state="error"
          message="Multiline message at vero eos et accusam et justo duo dolores et ea rebum."
          style={{ width: '240px' }}
        >
          <textarea defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet," />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with label and multiline text">
        <PTextareaWrapper label="Multiline text">
          <textarea defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet," />
        </PTextareaWrapper>
      </div>
    </>
  );
};
