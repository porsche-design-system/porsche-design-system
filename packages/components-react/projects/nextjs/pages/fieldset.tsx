/* Auto Generated File */
import type { NextPage } from 'next';
import { PCheckboxWrapper, PFieldset, PRadioButtonWrapper, PSelectWrapper, PTextareaWrapper, PTextFieldWrapper } from '@porsche-design-system/components-react/ssr';

const FieldsetPage: NextPage = (): JSX.Element => {
  const style = `
    @media only screen and (min-width: 760px) {
      #app,
      :host {
        display: grid;
        grid-template-columns: repeat(2, 50%);
      }
    }
    p-fieldset > *:not(:last-child) {
      margin-bottom: 2px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render with label on light background">
        <PFieldset label="Some label" />
      </div>

      <div className="playground dark" title="should render with label on dark background">
        <PFieldset label="Some label" theme="dark" />
      </div>

      <div
        className="playground light"
        title="should render with label and text-field-wrapper with defined spacing on light background"
      >
        <PFieldset label="Some label">
          <PTextFieldWrapper label="Some label">
            <input type="text" name="some-name" />
          </PTextFieldWrapper>
        </PFieldset>
      </div>

      <div
        className="playground dark"
        title="should render with label and text-field-wrapper with defined spacing on dark background"
      >
        <PFieldset label="Some label" theme="dark">
          <PTextFieldWrapper label="Some label" theme="dark">
            <input type="text" name="some-name" />
          </PTextFieldWrapper>
        </PFieldset>
      </div>

      <div className="playground light" title="should render with required on light background">
        <PFieldset label="Some label" required={true}>
          <PCheckboxWrapper label="Some label">
            <input type="checkbox" name="some-name-1" />
          </PCheckboxWrapper>
          <PCheckboxWrapper label="Some label">
            <input type="checkbox" name="some-name-1" />
          </PCheckboxWrapper>
        </PFieldset>
      </div>

      <div className="playground dark" title="should render with required on dark background">
        <PFieldset label="Some label" theme="dark" required={true}>
          <PCheckboxWrapper label="Some label" theme="dark">
            <input type="checkbox" name="some-name-1" />
          </PCheckboxWrapper>
          <PCheckboxWrapper label="Some label" theme="dark">
            <input type="checkbox" name="some-name-1" />
          </PCheckboxWrapper>
        </PFieldset>
      </div>

      <div className="playground light" title="should render with slotted label on light background">
        <PFieldset>
          <span slot="label">Some slotted label</span>
          <PCheckboxWrapper label="Some label">
            <input type="checkbox" name="some-name-1" />
          </PCheckboxWrapper>
          <PCheckboxWrapper label="Some label">
            <input type="checkbox" name="some-name-1" />
          </PCheckboxWrapper>
        </PFieldset>
      </div>

      <div className="playground dark" title="should render with slotted label on dark background">
        <PFieldset theme="dark">
          <span slot="label">Some slotted label</span>
          <PCheckboxWrapper label="Some label" theme="dark">
            <input type="checkbox" name="some-name-1" />
          </PCheckboxWrapper>
          <PCheckboxWrapper label="Some label" theme="dark">
            <input type="checkbox" name="some-name-1" />
          </PCheckboxWrapper>
        </PFieldset>
      </div>

      <div className="playground light" title="should render with label size small on light background">
        <PFieldset label="Some label" labelSize="small">
          <PRadioButtonWrapper label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
        </PFieldset>
      </div>

      <div className="playground dark" title="should render with label size small on dark background">
        <PFieldset label="Some label" labelSize="small" theme="dark">
          <PRadioButtonWrapper label="Some label" theme="dark">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper label="Some label" theme="dark">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
        </PFieldset>
      </div>

      <div className="playground light" title="should render with label size small and required on light background">
        <PFieldset label="Some label" labelSize="small" required={true}>
          <PRadioButtonWrapper label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
        </PFieldset>
      </div>

      <div className="playground dark" title="should render with label size small and required on dark background">
        <PFieldset label="Some label" labelSize="small" theme="dark" required={true}>
          <PRadioButtonWrapper label="Some label" theme="dark">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper label="Some label" theme="dark">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
        </PFieldset>
      </div>

      <div className="playground light" title="should render with error state and error message on light background">
        <PFieldset label="Some label" state="error" message="Some error message">
          <PRadioButtonWrapper state="error" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper state="error" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
        </PFieldset>
      </div>

      <div className="playground dark" title="should render with error state and error message on dark background">
        <PFieldset label="Some label" theme="dark" state="error" message="Some error message">
          <PRadioButtonWrapper state="error" label="Some label" theme="dark">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper state="error" label="Some label" theme="dark">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
        </PFieldset>
      </div>

      <div className="playground light" title="should render with error state and slotted error message on light background">
        <PFieldset label="Some label" state="error">
          <PRadioButtonWrapper state="error" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper state="error" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <span slot="message">Some slotted error message</span>
        </PFieldset>
      </div>

      <div className="playground dark" title="should render with error state and slotted error message on dark background">
        <PFieldset label="Some label" theme="dark" state="error">
          <PRadioButtonWrapper state="error" label="Some label" theme="dark">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper state="error" label="Some label" theme="dark">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <span slot="message">Some slotted error message</span>
        </PFieldset>
      </div>

      <div className="playground light" title="should render with success state and success message on light background">
        <PFieldset label="Some label" state="success" message="Some success message">
          <PRadioButtonWrapper state="success" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper state="success" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
        </PFieldset>
      </div>

      <div className="playground dark" title="should render with success state and success message on dark background">
        <PFieldset label="Some label" theme="dark" state="success" message="Some success message">
          <PRadioButtonWrapper state="success" label="Some label" theme="dark">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper state="success" label="Some label" theme="dark">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
        </PFieldset>
      </div>

      <div className="playground light" title="should render with success state and slotted success message on light background">
        <PFieldset label="Some label" state="success">
          <PRadioButtonWrapper state="success" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper state="success" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <span slot="message">Some slotted success message</span>
        </PFieldset>
      </div>

      <div className="playground dark" title="should render with success state and slotted success message on dark background">
        <PFieldset label="Some label" theme="dark" state="success">
          <PRadioButtonWrapper state="success" label="Some label" theme="dark">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper state="success" label="Some label" theme="dark">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <span slot="message">Some slotted success message</span>
        </PFieldset>
      </div>

      <div className="playground light" title="should render fieldset in fieldset as section on light background">
        <PFieldset label="Some label">
          <PFieldset label="Some label" labelSize="small">
            <PRadioButtonWrapper label="Some label">
              <input type="radio" name="some-name-1" />
            </PRadioButtonWrapper>
            <PRadioButtonWrapper label="Some label">
              <input type="radio" name="some-name-1" />
            </PRadioButtonWrapper>
          </PFieldset>
        </PFieldset>
      </div>

      <div className="playground dark" title="should render fieldset in fieldset as section on dark background">
        <PFieldset label="Some label" theme="dark">
          <PFieldset label="Some label" theme="dark" labelSize="small">
            <PRadioButtonWrapper label="Some label" theme="dark">
              <input type="radio" name="some-name-1" />
            </PRadioButtonWrapper>
            <PRadioButtonWrapper label="Some label" theme="dark">
              <input type="radio" name="some-name-1" />
            </PRadioButtonWrapper>
          </PFieldset>
        </PFieldset>
      </div>

      <div className="playground light" title="should render required only on fieldset on light background">
        <PFieldset label="Some label" labelSize="small" required={true}>
          <PTextFieldWrapper label="Some label" state="error">
            <input type="text" name="some-name" required />
          </PTextFieldWrapper>
          <PTextareaWrapper label="Some label" hideLabel={false}>
            <textarea name="some-name" required />
          </PTextareaWrapper>
          <PRadioButtonWrapper label="Some label">
            <input type="radio" name="some-name-1" required />
          </PRadioButtonWrapper>
          <PCheckboxWrapper label="Some label">
            <input type="checkbox" name="some-name-1" required />
          </PCheckboxWrapper>
          <PSelectWrapper label="Some label">
            <select name="some-name" required>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </select>
          </PSelectWrapper>
        </PFieldset>
      </div>

      <div className="playground dark" title="should render required only on fieldset on dark background">
        <PFieldset label="Some label" theme="dark" labelSize="small" required={true}>
          <PTextFieldWrapper label="Some label" theme="dark" state="error">
            <input type="text" name="some-name" required />
          </PTextFieldWrapper>
          <PTextareaWrapper label="Some label" theme="dark" hideLabel={false}>
            <textarea name="some-name" required />
          </PTextareaWrapper>
          <PRadioButtonWrapper label="Some label" theme="dark">
            <input type="radio" name="some-name-1" required />
          </PRadioButtonWrapper>
          <PCheckboxWrapper label="Some label" theme="dark">
            <input type="checkbox" name="some-name-1" required />
          </PCheckboxWrapper>
          <PSelectWrapper label="Some label" theme="dark">
            <select name="some-name" required>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </select>
          </PSelectWrapper>
        </PFieldset>
      </div>
    </>
  );
};

export default FieldsetPage;
