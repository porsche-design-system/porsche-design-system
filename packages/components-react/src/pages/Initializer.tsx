import { useEffect, useState } from 'react';
import { PTextFieldWrapper } from '@porsche-design-system/components-react';

export const InitializerPage = (): JSX.Element => {
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsEnabled(true), 1000);
  }, []);

  return (
    <>
      <div className="playground light">
        <PTextFieldWrapper label="Some Label" description="Some Description">
          <input type="text" />
        </PTextFieldWrapper>

        {isEnabled && (
          <PTextFieldWrapper label="Some Label" description="Some Description">
            <input type="text" />
          </PTextFieldWrapper>
        )}
      </div>
    </>
  );
};
