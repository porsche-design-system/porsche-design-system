/* Auto Generated File */
import { componentsReady, PTextFieldWrapper } from '@porsche-design-system/components-react';
import { useEffect, useState } from 'react';

export const CoreInitializerPage = (): JSX.Element => {
  const [allReady, setAllReady] = useState(false);
  useEffect(() => {
    componentsReady().then(() => {
      setAllReady(true);
    });
  }, []);

  return (
    <>
      <div className="playground light">
        <PTextFieldWrapper label="Some Label" description="Some Description">
          <input type="text" />
        </PTextFieldWrapper>

        {allReady && (
          <div>
            <PTextFieldWrapper label="Some Label" description="Some Description">
              <input type="text" />
            </PTextFieldWrapper>
          </div>
        )}
      </div>
    </>
  );
};
