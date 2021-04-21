import {
  PFieldsetWrapper,
  PTextFieldWrapper,
  PCheckboxWrapper,
  PRadioButtonWrapper,
} from '@porsche-design-system/components-react';
import { PSelectWrapper, PTextareaWrapper } from '../../projects/components-wrapper/src';

export const FieldsetWrapperPage = (): JSX.Element => {
  const style = `
    p-fieldset-wrapper > p-radio-button-wrapper:first-child {
      margin-bottom: 2px;
    }
    p-fieldset-wrapper > p-checkbox-wrapper:not(:last-child) {
      margin-bottom: 2px;
    }
  `;
  return (
    <>
      <style children={style} />

      <div className="playground light" title="should render with label">
        <PFieldsetWrapper label="Some label"></PFieldsetWrapper>
      </div>

      <div className="playground light" title="should render with label and text-field-wrapper with defined spacing">
        <PFieldsetWrapper label="Some label">
          <PTextFieldWrapper label="Some label">
            <input type="text" name="some-name" />
          </PTextFieldWrapper>
        </PFieldsetWrapper>
      </div>

      <div className="playground light" title="should render with required">
        <PFieldsetWrapper label="Some label" required>
          <PCheckboxWrapper label="Some label">
            <input type="checkbox" name="some-name-1" />
          </PCheckboxWrapper>
          <PCheckboxWrapper label="Some label">
            <input type="checkbox" name="some-name-1" />
          </PCheckboxWrapper>
        </PFieldsetWrapper>
      </div>

      <div className="playground light" title="should render with slotted label">
        <PFieldsetWrapper>
          <span slot="label">Some slotted Label</span>
          <PCheckboxWrapper label="Some label">
            <input type="checkbox" name="some-name-1" />
          </PCheckboxWrapper>
          <PCheckboxWrapper label="Some label">
            <input type="checkbox" name="some-name-1" />
          </PCheckboxWrapper>
        </PFieldsetWrapper>
      </div>

      <div className="playground light" title="should render with label size small">
        <PFieldsetWrapper label="Some label" labelSize="small">
          <PRadioButtonWrapper label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
        </PFieldsetWrapper>
      </div>

      <div className="playground light" title="should render with label size small and required">
        <PFieldsetWrapper label="Some label" labelSize="small" required>
          <PRadioButtonWrapper label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
        </PFieldsetWrapper>
      </div>

      <div className="playground light" title="should render with error state and error message">
        <PFieldsetWrapper label="Some label" state="error" message="Some error message">
          <PRadioButtonWrapper state="error" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper state="error" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
        </PFieldsetWrapper>
      </div>

      <div className="playground light" title="should render with error state and slotted error message">
        <PFieldsetWrapper label="Some label" state="error">
          <PRadioButtonWrapper state="error" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper state="error" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <span slot="message">Some slotted error Message</span>
        </PFieldsetWrapper>
      </div>

      <div className="playground light" title="should render with success state and success message">
        <PFieldsetWrapper label="Some label" state="success" message="Some success message">
          <PRadioButtonWrapper state="success" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper state="success" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
        </PFieldsetWrapper>
      </div>

      <div className="playground light" title="should render with success state and slotted success message">
        <PFieldsetWrapper label="Some label" state="success">
          <PRadioButtonWrapper state="success" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <PRadioButtonWrapper state="success" label="Some label">
            <input type="radio" name="some-name-1" />
          </PRadioButtonWrapper>
          <span slot="message">Some slotted success Message</span>
        </PFieldsetWrapper>
      </div>

      <div className="playground light" title="should render fieldset in fieldset as section">
        <PFieldsetWrapper label="Some label">
          <PFieldsetWrapper label="Some label" labelSize="small">
            <PRadioButtonWrapper label="Some label">
              <input type="radio" name="some-name-1" />
            </PRadioButtonWrapper>
            <PRadioButtonWrapper label="Some label">
              <input type="radio" name="some-name-1" />
            </PRadioButtonWrapper>
          </PFieldsetWrapper>
        </PFieldsetWrapper>
      </div>

      <div className="playground light" title="should render required only on fieldset">
        <PFieldsetWrapper label="Some label" label-size="small" required>
          <PTextFieldWrapper label="Some label" state="error">
            <input type="text" name="some-name" required />
          </PTextFieldWrapper>
          <PTextareaWrapper label="Some label" hide-label="false">
            <textarea name="some-name" required></textarea>
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
        </PFieldsetWrapper>
      </div>
    </>
  );
};
