import { PCheckboxWrapper } from '@porsche-design-system/components-react';

export const CheckboxWrapperPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render with label">
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" defaultChecked />
        </PCheckboxWrapper>
      </div>

      <div className="playground light" title="should render without label">
        <PCheckboxWrapper label="Some label" hideLabel>
          <input type="checkbox" name="some-name" />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label" hideLabel>
          <input type="checkbox" name="some-name" defaultChecked />
        </PCheckboxWrapper>
      </div>

      <div className="playground light" title="should render with responsive label">
        <PCheckboxWrapper
          label="Some label"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          <input type="checkbox" name="some-name" />
        </PCheckboxWrapper>
        <PCheckboxWrapper
          label="Some label"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          <input type="checkbox" name="some-name" defaultChecked />
        </PCheckboxWrapper>
      </div>

      <div className="playground light" title="should render in indeterminate mode">
        <PCheckboxWrapper label="Some label">
          <input
            type="checkbox"
            name="some-name"
            ref={(elem: HTMLInputElement) => elem && (elem.indeterminate = true)}
          />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label">
          <input
            type="checkbox"
            name="some-name"
            defaultChecked
            ref={(elem: HTMLInputElement) => elem && (elem.indeterminate = true)}
          />
        </PCheckboxWrapper>
      </div>

      <div className="playground light" title="should render in required state">
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" required />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="This is a very insanely super long label across multiple lines">
          <input type="checkbox" name="some-name" required />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" required disabled />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" required defaultChecked />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" required defaultChecked disabled />
        </PCheckboxWrapper>
      </div>

      <div className="playground light" title="should render in disabled state">
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" disabled />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" defaultChecked disabled />
        </PCheckboxWrapper>
      </div>

      <div className="playground light" title="should render with success state and success message">
        <PCheckboxWrapper label="Some label" state="success" message="Some success message.">
          <input type="checkbox" name="some-name" />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label" state="success" message="Some success message.">
          <input type="checkbox" name="some-name" defaultChecked />
        </PCheckboxWrapper>
      </div>

      <div className="playground light" title="should render with success state and no success message">
        <PCheckboxWrapper label="Some label" state="success">
          <input type="checkbox" name="some-name" />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label" state="success">
          <input type="checkbox" name="some-name" defaultChecked />
        </PCheckboxWrapper>
      </div>

      <div className="playground light" title="should render with error state and error message">
        <PCheckboxWrapper label="Some label" state="error" message="Some error validation message.">
          <input type="checkbox" name="some-name" />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label" state="error" message="Some error validation message.">
          <input type="checkbox" name="some-name" defaultChecked />
        </PCheckboxWrapper>
      </div>

      <div className="playground light" title="should render with error state but without error message">
        <PCheckboxWrapper label="Some label" state="error">
          <input type="checkbox" name="some-name" />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label" state="error">
          <input type="checkbox" name="some-name" defaultChecked />
        </PCheckboxWrapper>
      </div>

      <div className="playground light" title="should render with slotted content with error state and message">
        <PCheckboxWrapper state="error">
          <span slot="label">
            Some label with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <input type="checkbox" name="some-name" />
          <span slot="message">
            Some error message with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
        </PCheckboxWrapper>
      </div>

      <div className="playground light" title="should render with multiline label">
        <PCheckboxWrapper label="Lorem ipsum dolor sit amet, consetetur sadipscing" style={{ width: 240 }}>
          <input type="checkbox" name="some-name" />
        </PCheckboxWrapper>
        <PCheckboxWrapper
          state="error"
          label="Lorem ipsum dolor sit amet, consetetur sadipscing"
          message="Lorem ipsum dolor sit amet, consetetur sadipscing"
          style={{ width: 240 }}
        >
          <input type="checkbox" name="some-name" />
        </PCheckboxWrapper>
      </div>
    </>
  );
};
