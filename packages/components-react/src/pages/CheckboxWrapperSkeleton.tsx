/* Auto Generated File */
import { componentsReady, PCheckboxWrapper } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const CheckboxWrapperSkeletonPage = (): JSX.Element => {
  useEffect(() => {
    componentsReady().then(() => {
      document.querySelectorAll('p-checkbox-wrapper').forEach((checkbox) => {
        checkbox.classList.remove('hydrated');
      });
    });
  }, []);

  return (
    <>
      <div className="playground light" title="should render checkbox skeleton with label">
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" />
        </PCheckboxWrapper>
      </div>

      <div className="playground light" title="should render checkbox skeleton without label">
        <PCheckboxWrapper label="Some label" hideLabel={true}>
          <input type="checkbox" />
        </PCheckboxWrapper>
      </div>

      <div className="playground light" title="should render checkbox skeleton with multiline label">
        <PCheckboxWrapper label="Lorem ipsum dolor sit amet, consetetur sadipscing" style={{ width: '240px' }}>
          <input type="checkbox" />
        </PCheckboxWrapper>
      </div>
    </>
  );
};
