import {
  PFieldsetWrapper as FieldsetWrapper,
  PTextFieldWrapper as TextFieldWrapper
} from '@porsche-design-system/components-react';
import React from 'react';

export const FieldsetWrapperPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render with label">
        <FieldsetWrapper label="Some label"></FieldsetWrapper>
      </div>

      <div className="playground light" title="should render with label and text-field-wrapper with defined spacing">
        <FieldsetWrapper label="Some label">
          <TextFieldWrapper label="Some label">
            <input type="text" name="some-name" />
          </TextFieldWrapper>
        </FieldsetWrapper>
      </div>
    </>
  );
};
