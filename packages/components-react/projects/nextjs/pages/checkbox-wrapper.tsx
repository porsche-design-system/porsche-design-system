/* Auto Generated File */
import type { NextPage } from 'next';
import { PCheckboxWrapper } from '@porsche-design-system/components-react/ssr';
import { useEffect } from 'react';

const CheckboxWrapperPage: NextPage = (): JSX.Element => {
  useEffect(() => {
    document.body.querySelectorAll('.set-to-indeterminate').forEach((checkbox) => {
      (checkbox as any).indeterminate = true;
    });
  }, []);

  return (
    <>
      <div className="playground light auto-layout" title="should render with label">
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" defaultChecked />
        </PCheckboxWrapper>
      </div>

      <div className="playground light auto-layout" title="should render without label">
        <PCheckboxWrapper label="Some label" hideLabel={true}>
          <input type="checkbox" name="some-name" />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label" hideLabel={true}>
          <input type="checkbox" name="some-name" defaultChecked />
        </PCheckboxWrapper>
      </div>

      <div className="playground light auto-layout" title="should render with responsive label">
        <PCheckboxWrapper label="Some label" hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}>
          <input type="checkbox" name="some-name" />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label" hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}>
          <input type="checkbox" name="some-name" defaultChecked />
        </PCheckboxWrapper>
      </div>

      <div className="playground light auto-layout" title="should render in indeterminate mode">
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" className="set-to-indeterminate" />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" defaultChecked className="set-to-indeterminate" />
        </PCheckboxWrapper>
      </div>

      <div className="playground light auto-layout" title="should render in required state">
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" required />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="This is a very insanely super long label across multiple lines">
          <input type="checkbox" name="some-name" required />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" required disabled />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label" loading={true}>
          <input type="checkbox" name="some-name" required />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" required defaultChecked />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" required defaultChecked disabled />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label" loading={true}>
          <input type="checkbox" name="some-name" required defaultChecked />
        </PCheckboxWrapper>
      </div>

      <div className="playground light auto-layout" title="should render in disabled state">
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" disabled />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" name="some-name" defaultChecked disabled />
        </PCheckboxWrapper>
      </div>

      <div className="playground light auto-layout" title="should render in loading state">
        <PCheckboxWrapper label="Some label" loading={true}>
          <input type="checkbox" name="some-name" />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label" loading={true}>
          <input type="checkbox" name="some-name" defaultChecked />
        </PCheckboxWrapper>
      </div>

      <div className="playground light auto-layout" title="should render with success state and success message">
        <PCheckboxWrapper label="Some label" state="success" message="Some success message.">
          <input type="checkbox" name="some-name" />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label" state="success" message="Some success message.">
          <input type="checkbox" name="some-name" defaultChecked />
        </PCheckboxWrapper>
      </div>

      <div className="playground light auto-layout" title="should render with success state and no success message">
        <PCheckboxWrapper label="Some label" state="success">
          <input type="checkbox" name="some-name" />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label" state="success">
          <input type="checkbox" name="some-name" defaultChecked />
        </PCheckboxWrapper>
      </div>

      <div className="playground light auto-layout" title="should render with error state and error message">
        <PCheckboxWrapper label="Some label" state="error" message="Some error validation message.">
          <input type="checkbox" name="some-name" />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label" state="error" message="Some error validation message.">
          <input type="checkbox" name="some-name" defaultChecked />
        </PCheckboxWrapper>
      </div>

      <div className="playground light auto-layout" title="should render with error state but without error message">
        <PCheckboxWrapper label="Some label" state="error">
          <input type="checkbox" name="some-name" />
        </PCheckboxWrapper>
        <PCheckboxWrapper label="Some label" state="error">
          <input type="checkbox" name="some-name" defaultChecked />
        </PCheckboxWrapper>
      </div>

      <div className="playground light auto-layout" title="should render with slotted content with error state and message">
        <PCheckboxWrapper state="error">
          <span slot="label">
            <span>
              Slotted label. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
              {' '}<em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
          <input type="checkbox" name="some-name" />
          <span slot="message">
            <span>
              Slotted error message. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PCheckboxWrapper>
      </div>

      <div className="playground light auto-layout" title="should render with slotted content with success state and message">
        <PCheckboxWrapper state="success">
          <span slot="label">
            <span>
              Slotted label. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
              {' '}<em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
          <input type="checkbox" name="some-name" />
          <span slot="message">
            <span>
              Slotted success message. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PCheckboxWrapper>
      </div>

      <div className="playground light auto-layout" title="should render with multiline label">
        <PCheckboxWrapper label="Lorem ipsum dolor sit amet, consetetur sadipscing" style={{ width: '15rem' }}>
          <input type="checkbox" name="some-name" />
        </PCheckboxWrapper>
        <PCheckboxWrapper
          state="error"
          label="Lorem ipsum dolor sit amet, consetetur sadipscing"
          message="Lorem ipsum dolor sit amet, consetetur sadipscing"
          style={{ width: '15rem' }}
        >
          <input type="checkbox" name="some-name" />
        </PCheckboxWrapper>
      </div>
    </>
  );
};

export default CheckboxWrapperPage;
