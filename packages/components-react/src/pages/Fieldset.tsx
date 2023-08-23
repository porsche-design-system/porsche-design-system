/* Auto Generated File */
import { PCheckboxWrapper, PFieldset, PRadioButtonWrapper, PSelectWrapper, PTextareaWrapper, PTextFieldWrapper } from '@porsche-design-system/components-react';

export const FieldsetPage = (): JSX.Element => {
  const style = `
    p-fieldset > *:not(:last-child) {
      margin-bottom: 2px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render with label">
        <PFieldset label="Some label" />
      </div>

      <div className="playground light" title="should render with label and text-field-wrapper with defined spacing">
        <PFieldset label="Some label">
          <PTextFieldWrapper label="Some label">
            <input type="text" name="some-name" />
          </PTextFieldWrapper>
        </PFieldset>
      </div>

      <div className="playground light" title="should render with required">
        <PFieldset label="Some label" required={true}>
          <PCheckboxWrapper label="Some label">
            <input type="checkbox" name="some-name-1" />
          </PCheckboxWrapper>
          <PCheckboxWrapper label="Some label">
            <input type="checkbox" name="some-name-1" />
          </PCheckboxWrapper>
        </PFieldset>
      </div>

      <div className="playground light" title="should render with slotted label">
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

      <div className="playground light" title="should render with label size small">
        <PFieldset label="Some label" labelSize="small">
          <PRadioButtonWrapper label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
        </PFieldset>
      </div>

      <div className="playground light" title="should render with label size small and required">
        <PFieldset label="Some label" labelSize="small" required={true}>
          <PRadioButtonWrapper label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
        </PFieldset>
      </div>

      <div className="playground light" title="should render with error state and error message">
        <PFieldset label="Some label" state="error" message="Some error message">
          <PRadioButtonWrapper state="error" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper state="error" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
        </PFieldset>
      </div>

      <div className="playground light" title="should render with error state and slotted error message">
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

      <div className="playground light" title="should render with success state and success message">
        <PFieldset label="Some label" state="success" message="Some success message">
          <PRadioButtonWrapper state="success" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper state="success" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
        </PFieldset>
      </div>

      <div className="playground light" title="should render with success state and slotted success message">
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
      <div className="playground light" title="should render fieldset in fieldset as section">
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

      <div className="playground light" title="should render required only on fieldset">
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
    </>
  );
};
