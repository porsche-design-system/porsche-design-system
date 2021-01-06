import { useEffect, useState } from 'react';
import { PTextFieldWrapper as TextFieldWrapper } from '@porsche-design-system/components-react';

export const InitializerPage = (): JSX.Element => {
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsEnabled(true), 1000);
  }, []);

  return (
    <>
      <div className="playground light">
        <TextFieldWrapper label="Some Label" description="Some Description">
          <input type="text" />
        </TextFieldWrapper>

        {isEnabled && (
          <TextFieldWrapper label="Some Label" description="Some Description">
            <input type="text" />
          </TextFieldWrapper>
        )}
      </div>
    </>
  );
};
