import { PCheckboxWrapper as CheckboxWrapper } from '@porsche-design-system/components-react';
import React from 'react';

export const CheckboxWrapperPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render with label">
        <CheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" />
        </CheckboxWrapper>
        <CheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" defaultChecked />
        </CheckboxWrapper>
      </div>

      <div className="playground light" title="should render without label">
        <CheckboxWrapper label="Some label" hideLabel="true">
          <input type="checkbox" name="some-name" />
        </CheckboxWrapper>
        <CheckboxWrapper label="Some label" hideLabel="true">
          <input type="checkbox" name="some-name" defaultChecked />
        </CheckboxWrapper>
      </div>

      <div className="playground light" title="should render with responsive label">
        <CheckboxWrapper
          label="Some label"
          hideLabel="{'base': true, 'xs': false, 's': true, 'm': false, 'l': true, 'xl': false}"
        >
          <input type="checkbox" name="some-name" />
        </CheckboxWrapper>
        <CheckboxWrapper
          label="Some label"
          hideLabel="{'base': true, 'xs': false, 's': true, 'm': false, 'l': true, 'xl': false}"
        >
          <input type="checkbox" name="some-name" defaultChecked />
        </CheckboxWrapper>
      </div>

      <div className="playground light" title="should render in indeterminate mode">
        <CheckboxWrapper label="Some label">
          <input
            type="checkbox"
            name="some-name"
            ref={(elem: HTMLInputElement) => elem && (elem.indeterminate = true)}
          />
        </CheckboxWrapper>
        <CheckboxWrapper label="Some label">
          <input
            type="checkbox"
            name="some-name"
            defaultChecked
            ref={(elem: HTMLInputElement) => elem && (elem.indeterminate = true)}
          />
        </CheckboxWrapper>
      </div>

      <div className="playground light" title="should render in disabled state">
        <CheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" disabled />
        </CheckboxWrapper>
        <CheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" defaultChecked disabled />
        </CheckboxWrapper>
      </div>

      <div className="playground light" title="should render with success state and success message">
        <CheckboxWrapper label="Some label" state="success" message="Some success message.">
          <input type="checkbox" name="some-name" />
        </CheckboxWrapper>
        <CheckboxWrapper label="Some label" state="success" message="Some success message.">
          <input type="checkbox" name="some-name" defaultChecked />
        </CheckboxWrapper>
      </div>

      <div className="playground light" title="should render with success state and no success message">
        <CheckboxWrapper label="Some label" state="success">
          <input type="checkbox" name="some-name" />
        </CheckboxWrapper>
        <CheckboxWrapper label="Some label" state="success">
          <input type="checkbox" name="some-name" defaultChecked />
        </CheckboxWrapper>
      </div>

      <div className="playground light" title="should render with error state and error message">
        <CheckboxWrapper label="Some label" state="error" message="Some error validation message.">
          <input type="checkbox" name="some-name" />
        </CheckboxWrapper>
        <CheckboxWrapper label="Some label" state="error" message="Some error validation message.">
          <input type="checkbox" name="some-name" defaultChecked />
        </CheckboxWrapper>
      </div>

      <div className="playground light" title="should render with error state but without error message">
        <CheckboxWrapper label="Some label" state="error">
          <input type="checkbox" name="some-name" />
        </CheckboxWrapper>
        <CheckboxWrapper label="Some label" state="error">
          <input type="checkbox" name="some-name" defaultChecked />
        </CheckboxWrapper>
      </div>

      <div className="playground light" title="should render with slotted content with error state and message">
        <CheckboxWrapper state="error">
          <span slot="label">
            Some label with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
          <input type="checkbox" name="some-name" />
          <span slot="message">
            Some error message with a <a href="https://designsystem.porsche.com">link</a>.
          </span>
        </CheckboxWrapper>
      </div>

      <div className="playground light" title="should render in focus state">
        <CheckboxWrapper label="Some label">
          <input id="test-focus-state" type="checkbox" name="some-name" />
        </CheckboxWrapper>
      </div>

      <div className="playground light" title="should render with multiline label">
        <CheckboxWrapper label="Lorem ipsum dolor sit amet, consetetur sadipscing" style={{ width: 240 }}>
          <input type="checkbox" name="some-name" />
        </CheckboxWrapper>
        <CheckboxWrapper
          state="error"
          label="Lorem ipsum dolor sit amet, consetetur sadipscing"
          message="Lorem ipsum dolor sit amet, consetetur sadipscing"
          style={{ width: 240 }}
        >
          <input type="checkbox" name="some-name" />
        </CheckboxWrapper>
      </div>
    </>
  );
};
