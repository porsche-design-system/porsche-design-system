import { PTextareaWrapper } from '@porsche-design-system/components-react';

export const TextareaWrapperPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render with label">
        <PTextareaWrapper label="Some label">
          <textarea name="some-name" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with label and placeholder">
        <PTextareaWrapper label="Some label">
          <textarea name="some-name" placeholder="Some placeholder text" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with label, description and placeholder">
        <PTextareaWrapper label="Some label" description="Some description">
          <textarea name="some-name" placeholder="Some placeholder text" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render without label and without description">
        <PTextareaWrapper label="Some label" description="Some description" hideLabel={true}>
          <textarea name="some-name" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with responsive label and description">
        <PTextareaWrapper
          label="Some label"
          description="Some description"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          <textarea name="some-name" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render in required state">
        <PTextareaWrapper label="Some label">
          <textarea name="some-name" required />
        </PTextareaWrapper>
        <PTextareaWrapper label="This is a very insanely super long label across multiple lines">
          <textarea name="some-name" required />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render in disabled state">
        <PTextareaWrapper label="Some label" description="Some description">
          <textarea name="some-name" disabled />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with placeholder in disabled state">
        <PTextareaWrapper label="Some label">
          <textarea name="some-name" disabled placeholder="Some placeholder" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render in readonly state">
        <PTextareaWrapper label="Some label">
          <textarea name="some-name" defaultValue="Some value" readOnly />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with error state and error message">
        <PTextareaWrapper label="Some label" state="error" message="error message">
          <textarea name="some-name" defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with error state and no error message">
        <PTextareaWrapper label="Some label" state="error">
          <textarea name="some-name" defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with success state and success message">
        <PTextareaWrapper label="Some label" state="success" message="success message">
          <textarea name="some-name" defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with success state and no success message">
        <PTextareaWrapper label="Some label" state="success">
          <textarea name="some-name" defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with default state and no message">
        <PTextareaWrapper label="Some label" state="none" message="this message should be hidden">
          <textarea name="some-name" defaultValue="Some value" />
        </PTextareaWrapper>
      </div>

      <div
        className="playground light"
        title="should render label, description and message by slotted content with error state"
      >
        <PTextareaWrapper state="error">
          <span slot="label">
            Some label with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <span slot="description">
            Some description with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <textarea name="some-name" defaultValue="Some value" />
          <span slot="message">
            Some error message with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
        </PTextareaWrapper>
      </div>

      <div
        className="playground light"
        title="should render label, description and message by slotted content with success state"
      >
        <PTextareaWrapper state="success">
          <span slot="label">
            Some label with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <span slot="description">
            Some description with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <textarea name="some-name" defaultValue="Some value" />
          <span slot="message">
            Some success message with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
        </PTextareaWrapper>
      </div>

      <div
        className="playground light"
        title="should render with multiline label, description and message and cut off too long option text"
      >
        <PTextareaWrapper
          label="Lorem ipsum dolor sit amet, consetetur sadipscing"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet"
          state="error"
          message="At vero eos et accusam et justo duo dolores et ea rebum."
          style={{ width: 240 }}
        >
          <textarea
            name="some-name"
            defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
            clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
            sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
            consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
            blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit
            amet,"
          />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render with label and multiline text">
        <PTextareaWrapper label="Some label">
          <textarea
            name="some-name"
            defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
            clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
            sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
            consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
            blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit
            amet,"
          />
        </PTextareaWrapper>
      </div>
    </>
  );
};
