import { PFieldsetWrapper, PTextFieldWrapper } from '@porsche-design-system/components-react';

export const FieldsetWrapperPage = (): JSX.Element => {
  return (
    <>
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
    </>
  );
};
