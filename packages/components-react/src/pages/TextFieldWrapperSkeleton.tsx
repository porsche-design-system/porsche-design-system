/* Auto Generated File */
import { componentsReady, PTextFieldWrapper } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const TextFieldWrapperSkeletonPage = (): JSX.Element => {
  useEffect(() => {
    componentsReady().then(() => {
      document.querySelectorAll('p-text-field-wrapper').forEach((textField) => {
        textField.classList.remove('hydrated');
      });
    });
  }, []);

  return (
    <>
      <div className="playground light" title="should render text field skeleton with label">
        <PTextFieldWrapper label="Label">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render text field skeleton with description">
        <PTextFieldWrapper description="Some description">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render text field skeleton with label, description and placeholder">
        <PTextFieldWrapper label="Label with description and placeholder" description="Some description">
          <input type="text" placeholder="Some placeholder" />
        </PTextFieldWrapper>
      </div>

      <div className="playground light" title="should render text field skeleton without label and without description">
        <PTextFieldWrapper label="Some label" description="Some description" hideLabel={true}>
          <input type="text" defaultValue="Without label and description" />
        </PTextFieldWrapper>
      </div>
    </>
  );
};
