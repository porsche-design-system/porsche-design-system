/* Auto Generated File */
import type { NextPage } from 'next';
import { PRadioButtonWrapper } from '@porsche-design-system/components-react/ssr';

const RadioButtonWrapperPage: NextPage = (): JSX.Element => {
  const style = `
    @media only screen and (min-width: 760px) {
      #app,
      :host {
        display: grid;
        grid-template-columns: repeat(2, 50%);
      }
    }

    .playground > * {
      margin-bottom: 8px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render with label">
        <PRadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-1" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-1" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground dark" title="should render with label">
        <PRadioButtonWrapper theme="dark" label="Some label">
          <input type="radio" name="some-name-dark-1" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper theme="dark" label="Some label">
          <input type="radio" name="some-name-dark-1" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render without label">
        <PRadioButtonWrapper label="Some label" hideLabel={true}>
          <input type="radio" name="some-name-2" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label" hideLabel={true}>
          <input type="radio" name="some-name-2" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground dark" title="should render without label">
        <PRadioButtonWrapper theme="dark" label="Some label" hideLabel={true}>
          <input type="radio" name="some-name-dark-2" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper theme="dark" label="Some label" hideLabel={true}>
          <input type="radio" name="some-name-dark-2" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with responsive label">
        <PRadioButtonWrapper
          label="Some label"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          <input type="radio" name="some-name-3" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper
          label="Some label"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          <input type="radio" name="some-name-3" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground dark" title="should render with responsive label">
        <PRadioButtonWrapper
          theme="dark"
          label="Some label"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          <input type="radio" name="some-name-dark-3" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper
          theme="dark"
          label="Some label"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          <input type="radio" name="some-name-dark-3" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render in required state">
        <PRadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-3a" required />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="This is a very insanely super long label across multiple lines">
          <input type="radio" name="some-name-3a" required />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-3a" required disabled />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-3a" required defaultChecked />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-3b" required defaultChecked disabled />
        </PRadioButtonWrapper>
      </div>

      <div className="playground dark" title="should render in required state">
        <PRadioButtonWrapper theme="dark" label="Some label">
          <input type="radio" name="some-name-dark-3a" required />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper theme="dark" label="This is a very insanely super long label across multiple lines">
          <input type="radio" name="some-name-dark-3a" required />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper theme="dark" label="Some label">
          <input type="radio" name="some-name-dark-3a" required disabled />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper theme="dark" label="Some label">
          <input type="radio" name="some-name-dark-3a" required defaultChecked />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper theme="dark" label="Some label">
          <input type="radio" name="some-name-dark-3b" required defaultChecked disabled />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render in disabled state">
        <PRadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-4" disabled />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label">
          <input type="radio" name="some-name-4" defaultChecked disabled />
        </PRadioButtonWrapper>
      </div>

      <div className="playground dark" title="should render in disabled state">
        <PRadioButtonWrapper theme="dark" label="Some label">
          <input type="radio" name="some-name-dark-4" disabled />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper theme="dark" label="Some label">
          <input type="radio" name="some-name-dark-4" defaultChecked disabled />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with success state and success message">
        <PRadioButtonWrapper label="Some label" state="success">
          <input type="radio" name="some-name-5" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label" state="success" message="Some success validation message.">
          <input type="radio" name="some-name-5" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground dark" title="should render with success state and success message">
        <PRadioButtonWrapper theme="dark" label="Some label" state="success">
          <input type="radio" name="some-name-dark-5" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper theme="dark" label="Some label" state="success" message="Some success validation message.">
          <input type="radio" name="some-name-dark-5" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with success state but without success message and not checked">
        <PRadioButtonWrapper label="Some label" state="success">
          <input type="radio" name="some-name-6" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label" state="success">
          <input type="radio" name="some-name-6" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground dark" title="should render with success state but without success message and not checked">
        <PRadioButtonWrapper theme="dark" label="Some label" state="success">
          <input type="radio" name="some-name-dark-6" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper theme="dark" label="Some label" state="success">
          <input type="radio" name="some-name-dark-6" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with error state and error message">
        <PRadioButtonWrapper label="Some label" state="error">
          <input type="radio" name="some-name-7" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label" state="error" message="Some error validation message.">
          <input type="radio" name="some-name-7" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground dark" title="should render with error state and error message">
        <PRadioButtonWrapper theme="dark" label="Some label" state="error">
          <input type="radio" name="some-name-dark-7" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper theme="dark" label="Some label" state="error" message="Some error validation message.">
          <input type="radio" name="some-name-dark-7" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with error state but without error message and not checked">
        <PRadioButtonWrapper label="Some label" state="error">
          <input type="radio" name="some-name-8" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper label="Some label" state="error">
          <input type="radio" name="some-name-8" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground dark" title="should render with error state but without error message and not checked">
        <PRadioButtonWrapper theme="dark" label="Some label" state="error">
          <input type="radio" name="some-name-dark-8" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper theme="dark" label="Some label" state="error">
          <input type="radio" name="some-name-dark-8" defaultChecked />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with slotted content with error state and message">
        <PRadioButtonWrapper state="error">
          <span slot="label">Slotted label</span>
          <input type="radio" name="some-name-9" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper state="error">
          <span slot="label">
            <span>
              Slotted label. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
              {' '}<em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
          <input type="radio" name="some-name-9" />
          <span slot="message">
            <span>
              Slotted error message. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PRadioButtonWrapper>
      </div>

      <div className="playground dark" title="should render with slotted content with error state and message">
        <PRadioButtonWrapper theme="dark" state="error">
          <span slot="label">Slotted label</span>
          <input type="radio" name="some-name-dark-9" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper theme="dark" state="error">
          <span slot="label">
            <span>
              Slotted label. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
              {' '}<em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
          <input type="radio" name="some-name-dark-9" />
          <span slot="message">
            <span>
              Slotted error message. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with slotted content with success state and message">
        <PRadioButtonWrapper state="success">
          <span slot="label">Slotted label</span>
          <input type="radio" name="some-name-9" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper state="success">
          <span slot="label">
            <span>
              Slotted label. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
              {' '}<em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
          <input type="radio" name="some-name-9" />
          <span slot="message">
            <span>
              Slotted success message. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PRadioButtonWrapper>
      </div>

      <div className="playground dark" title="should render with slotted content with success state and message">
        <PRadioButtonWrapper theme="dark" state="success">
          <span slot="label">Slotted label</span>
          <input type="radio" name="some-name-dark-9" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper theme="dark" state="success">
          <span slot="label">
            <span>
              Slotted label. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
              {' '}<em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
          <input type="radio" name="some-name-dark-9" />
          <span slot="message">
            <span>
              Slotted success message. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render with multiline label">
        <PRadioButtonWrapper state="error" label="Lorem ipsum dolor sit amet, consetetur sadipscing" style={{ width: '15rem' }}>
          <input type="radio" name="some-name-11" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper state="error" label="Lorem ipsum dolor sit amet, consetetur sadipscing" style={{ width: '15rem' }}>
          <input type="radio" name="some-name-11" />
        </PRadioButtonWrapper>
        <PRadioButtonWrapper
          label="Lorem ipsum dolor sit amet, consetetur sadipscing"
          state="error"
          message="At vero eos et accusam et justo duo dolores et ea rebum."
          style={{ width: '15rem' }}
        >
          <input type="radio" name="some-name-11" />
        </PRadioButtonWrapper>
      </div>
    </>
  );
};

export default RadioButtonWrapperPage;
