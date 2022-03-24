/* Auto Generated File */
import { componentsReady, PRadioButtonWrapper } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const RadioButtonWrapperSkeletonPage = (): JSX.Element => {
  useEffect(() => {
    componentsReady().then(() => {
      document.querySelectorAll('p-radio-button-wrapper').forEach((radioButton) => {
        radioButton.classList.remove('hydrated');
      });
    });
  }, []);

  return (
    <>
      <div className="playground light" title="should render radio button skeleton with label">
        <PRadioButtonWrapper label="Some label">
          <input type="radio" />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render radio button skeleton without label">
        <PRadioButtonWrapper label="Some label" hideLabel={true}>
          <input type="radio" />
        </PRadioButtonWrapper>
      </div>

      <div className="playground light" title="should render radio button skeleton with multiline label">
        <PRadioButtonWrapper
          label="Lorem ipsum dolor sit amet, consetetur sadipscing"
          state="error"
          message="At vero eos et accusam et justo duo dolores et ea rebum."
          style={{ width: '240px' }}
        >
          <input type="radio" />
        </PRadioButtonWrapper>
      </div>
    </>
  );
};
