import { PSelectWrapper } from '@porsche-design-system/components-react';

export const SelectWrapperPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render with label">
        <PSelectWrapper label="Some label">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
      <div className="playground dark" title="should render with label on dark theme">
        <PSelectWrapper label="Some label" theme="dark">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div className="playground light" title="should render with label and description">
        <PSelectWrapper label="Some label" description="Some description">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
      <div className="playground dark" title="should render with label and description on dark theme">
        <PSelectWrapper label="Some label" description="Some description" theme="dark">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div className="playground light" title="should render without label and without description">
        <PSelectWrapper label="Some label" description="Some description" hideLabel={true}>
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
      <div className="playground dark" title="should render without label and without description on dark theme">
        <PSelectWrapper label="Some label" description="Some description" hideLabel={true} theme="dark">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div className="playground light" title="should render with responsive label and description">
        <PSelectWrapper
          label="Some label"
          description="Some description"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
      <div className="playground dark" title="should render with responsive label and description on dark theme">
        <PSelectWrapper
          label="Some label"
          description="Some description"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
          theme="dark"
        >
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div className="playground light" title="should render with custom filter">
        <PSelectWrapper label="Some label" filter={true}>
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
      <div className="playground dark" title="should render with custom filter on dark theme">
        <PSelectWrapper label="Some label" filter={true} theme="dark">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div className="playground light" title="should render in disabled state with custom filter">
        <PSelectWrapper label="Some label" filter>
          <select name="some-name" disabled>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
      <div className="playground dark" title="should render in disabled state with custom filter on dark theme">
        <PSelectWrapper label="Some label" filter theme="dark">
          <select name="some-name" disabled>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div className="playground light" title="should render in required state">
        <PSelectWrapper label="Some label">
          <select name="some-name" required>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
        <PSelectWrapper label="This is a very insanely super long label across multiple lines">
          <select name="some-name" required>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div className="playground light" title="should render in disabled state">
        <PSelectWrapper label="Some label" description="Some description">
          <select name="some-name" disabled>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
      <div className="playground dark" title="should render in disabled state on dark theme">
        <PSelectWrapper label="Some label" description="Some description" theme="dark">
          <select name="some-name" disabled>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div className="playground light" title="should render with error state and error message">
        <PSelectWrapper label="Some label" state="error" message="Some error message.">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
      <div className="playground dark" title="should render with error state and error message on dark theme">
        <PSelectWrapper label="Some label" state="error" message="Some error message." theme="dark">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div className="playground light" title="should render with error state and error message with custom filter">
        <PSelectWrapper label="Some label" filter={true} state="error" message="Some error message.">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
      <div
        className="playground dark"
        title="should render with error state and error message with custom filter on dark theme"
      >
        <PSelectWrapper label="Some label" filter={true} state="error" message="Some error message." theme="dark">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div className="playground light" title="should render with error state and no error message">
        <PSelectWrapper label="Some label" state="error">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
      <div className="playground dark" title="should render with error state and no error message on dark theme">
        <PSelectWrapper label="Some label" state="error" theme="dark">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div className="playground light" title="should render with success state and success message">
        <PSelectWrapper label="Some label" state="success" message="Some success message.">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
      <div className="playground dark" title="should render with success state and success message on dark theme">
        <PSelectWrapper label="Some label" state="success" message="Some success message." theme="dark">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div className="playground light" title="should render with success state and success message with custom filter">
        <PSelectWrapper label="Some label" filter={true} state="success" message="Some success message.">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
      <div
        className="playground dark"
        title="should render with success state and success message with custom filter on dark theme"
      >
        <PSelectWrapper label="Some label" filter={true} state="success" message="Some success message." theme="dark">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div className="playground light" title="should render with success state and no success message">
        <PSelectWrapper label="Some label" state="success">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
      <div className="playground dark" title="should render with success state and no success message on dark theme">
        <PSelectWrapper label="Some label" state="success" theme="dark">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div className="playground light" title="should render with default state and no message">
        <PSelectWrapper label="Some label" state="none" message="Some message which should not be rendered.">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
      <div className="playground dark" title="should render with default state and no message on dark theme">
        <PSelectWrapper
          label="Some label"
          state="none"
          message="Some message which should not be rendered."
          theme="dark"
        >
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div
        className="playground light"
        title="should render label, description and message by slotted content with error state"
      >
        <PSelectWrapper state="error">
          <span slot="label">
            Some label with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <span slot="description">
            Some description with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
          <span slot="message">
            Some error message with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
        </PSelectWrapper>
      </div>
      <div
        className="playground dark"
        title="should render label, description and message by slotted content with error state on dark theme"
      >
        <PSelectWrapper state="error" theme="dark">
          <span slot="label">
            Some label with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <span slot="description">
            Some description with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
          <span slot="message">
            Some error message with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
        </PSelectWrapper>
      </div>

      <div
        className="playground light"
        title="should render label, description and message by slotted content with success state"
      >
        <PSelectWrapper state="success">
          <span slot="label">
            Some label with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <span slot="description">
            Some description with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
          <span slot="message">
            Some success message with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
        </PSelectWrapper>
      </div>
      <div
        className="playground dark"
        title="should render label, description and message by slotted content with success state on dark theme"
      >
        <PSelectWrapper state="success" theme="dark">
          <span slot="label">
            Some label with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <span slot="description">
            Some description with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
          <span slot="message">
            Some success message with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
        </PSelectWrapper>
      </div>

      <div
        className="playground light"
        title="should render with multiline label, description and message and cut off too long option text"
      >
        <PSelectWrapper
          label="Lorem ipsum dolor sit amet, consetetur sadipscing"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet"
          state="error"
          message="At vero eos et accusam et justo duo dolores et ea rebum."
          style={{ width: 240 }}
        >
          <select name="some-name">
            <option value="a">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,</option>
            <option value="b">sed diam nonumy eirmod tempor invidunt ut labore</option>
            <option value="c">et dolore magna aliquyam erat, sed diam voluptua</option>
          </select>
        </PSelectWrapper>
      </div>
      <div
        className="playground dark"
        title="should render with multiline label, description and message and cut off too long option text on dark theme"
      >
        <PSelectWrapper
          label="Lorem ipsum dolor sit amet, consetetur sadipscing"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet"
          state="error"
          message="At vero eos et accusam et justo duo dolores et ea rebum."
          theme="dark"
          style={{ width: 240 }}
        >
          <select name="some-name">
            <option value="a">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,</option>
            <option value="b">sed diam nonumy eirmod tempor invidunt ut labore</option>
            <option value="c">et dolore magna aliquyam erat, sed diam voluptua</option>
          </select>
        </PSelectWrapper>
      </div>

      <div
        className="playground light"
        title="should render in focus state and be open"
        style={{ paddingBottom: 'calc(1rem + 126px)' }}
      >
        <PSelectWrapper label="Some label">
          <select id="open-options" name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
    </>
  );
};
