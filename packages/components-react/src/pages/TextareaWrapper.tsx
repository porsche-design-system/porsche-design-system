import { PTextareaWrapper as TextareaWrapper } from '@porsche-design-system/components-react';
import React from 'react';

export const TextareaWrapperPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render with label">
        <TextareaWrapper label="Some label">
          <textarea name="some-name"></textarea>
        </TextareaWrapper>
      </div>

      <div className="playground light" title="should render with label and placeholder">
        <TextareaWrapper label="Some label">
          <textarea name="some-name" placeholder="Some placeholder text"></textarea>
        </TextareaWrapper>
      </div>

      <div className="playground light" title="should render with label, description and placeholder">
        <TextareaWrapper label="Some label" description="Some description">
          <textarea name="some-name" placeholder="Some placeholder text"></textarea>
        </TextareaWrapper>
      </div>

      <div className="playground light" title="should render without label and without description">
        <TextareaWrapper label="Some label" description="Some description" hide-label={true}>
          <textarea name="some-name"></textarea>
        </TextareaWrapper>
      </div>

      <div className="playground light" title="should render with responsive label and description">
        <TextareaWrapper
          label="Some label"
          description="Some description"
          hide-label="{'base': true, 'xs': false, 's': true, 'm': false, 'l': true, 'xl': false}"
        >
          <textarea name="some-name"></textarea>
        </TextareaWrapper>
      </div>

      <div className="playground light" title="should render in disabled state">
        <TextareaWrapper label="Some label" description="Some description">
          <textarea name="some-name" disabled={true}></textarea>
        </TextareaWrapper>
      </div>

      <div className="playground light" title="should render with placeholder with disabled state">
        <TextareaWrapper label="Some label">
          <textarea name="some-name" disabled={true} placeholder="Some placeholder"></textarea>
        </TextareaWrapper>
      </div>

      <div className="playground light" title="should render in readonly state">
        <TextareaWrapper label="Some label">
          <textarea name="some-name" readOnly={true}>
            Some value
          </textarea>
        </TextareaWrapper>
      </div>

      <div className="playground light" title="should render with error state and error message">
        <TextareaWrapper label="Some label" state="error" message="error message">
          <textarea name="some-name">Some value</textarea>
        </TextareaWrapper>
      </div>

      <div className="playground light" title="should render with error state and no error message">
        <TextareaWrapper label="Some label" state="error">
          <textarea name="some-name">Some value</textarea>
        </TextareaWrapper>
      </div>

      <div className="playground light" title="should render with success state and success message">
        <TextareaWrapper label="Some label" state="success" message="success message">
          <textarea name="some-name">Some value</textarea>
        </TextareaWrapper>
      </div>

      <div className="playground light" title="should render with success state and no success message">
        <TextareaWrapper label="Some label" state="success">
          <textarea name="some-name">Some value</textarea>
        </TextareaWrapper>
      </div>

      <div className="playground light" title="should render with default state and no message">
        <TextareaWrapper label="Some label" state="none" message="this message should be hidden">
          <textarea name="some-name">Some value</textarea>
        </TextareaWrapper>
      </div>

      <div
        className="playground light"
        title="should render label, description and message by slotted content with error state"
      >
        <TextareaWrapper state="error">
          <span slot="label">
            Some label with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <span slot="description">
            Some description with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <textarea name="some-name">Some value</textarea>
          <span slot="message">
            Some error message with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
        </TextareaWrapper>
      </div>

      <div
        className="playground light"
        title="should render label, description and message by slotted content with success state"
      >
        <TextareaWrapper state="success">
          <span slot="label">
            Some label with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <span slot="description">
            Some description with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <textarea name="some-name">Some value</textarea>
          <span slot="message">
            Some success message with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
        </TextareaWrapper>
      </div>

      <div className="playground light" title="should render in focus state">
        <TextareaWrapper label="Some label">
          <textarea id="test-focus-state" name="some-name" style={{ caretColor: 'transparent' }}></textarea>
        </TextareaWrapper>
      </div>

      <div
        className="playground light"
        title="should render with multiline label, description and message and cut off too long option text"
      >
        <TextareaWrapper
          label="Lorem ipsum dolor sit amet, consetetur sadipscing"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet"
          state="error"
          message="At vero eos et accusam et justo duo dolores et ea rebum."
          style={{ width: 240 }}
        >
          <textarea name="some-name">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
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
            amet,
          </textarea>
        </TextareaWrapper>
      </div>

      <div className="playground light" title="should render with label and multiline text">
        <TextareaWrapper label="Some label">
          <textarea name="some-name">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
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
            amet,
          </textarea>
        </TextareaWrapper>
      </div>
    </>
  );
};
