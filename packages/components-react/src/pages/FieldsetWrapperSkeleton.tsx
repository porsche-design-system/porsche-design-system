/* Auto Generated File */
import { componentsReady, PFieldsetWrapper, PTextFieldWrapper } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const FieldsetWrapperSkeletonPage = (): JSX.Element => {
  useEffect(() => {
    componentsReady().then(() => {
      document.querySelectorAll('p-fieldset-wrapper p-text-field-wrapper').forEach((fieldset) => {
        fieldset.classList.remove('hydrated');
      });
    });
  }, []);

  return (
    <>
      <div
        className="playground light"
        title="should render fieldset skeleton with label and text-field-wrapper with defined spacing"
      >
        <PFieldsetWrapper label="Some label">
          <PTextFieldWrapper label="Some label">
            <input type="text" />
          </PTextFieldWrapper>
        </PFieldsetWrapper>
      </div>
    </>
  );
};
