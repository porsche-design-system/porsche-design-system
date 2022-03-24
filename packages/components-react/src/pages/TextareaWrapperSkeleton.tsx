/* Auto Generated File */
import { componentsReady, PTextareaWrapper } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const TextareaWrapperSkeletonPage = (): JSX.Element => {
  useEffect(() => {
    componentsReady().then(() => {
      document.querySelectorAll('p-textarea-wrapper').forEach((textarea) => {
        textarea.classList.remove('hydrated');
      });
    });
  }, []);

  return (
    <>
      <div className="playground light" title="should render textarea skeleton with label">
        <PTextareaWrapper label="Label">
          <textarea />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render textarea skeleton with description">
        <PTextareaWrapper description="Some description">
          <textarea />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render textarea skeleton with label, description and placeholder">
        <PTextareaWrapper label="Label with description and placeholder" description="Some description">
          <textarea placeholder="Some placeholder" />
        </PTextareaWrapper>
      </div>

      <div className="playground light" title="should render textarea skeleton without label and without description">
        <PTextareaWrapper label="Label" description="Some description" hideLabel={true}>
          <textarea defaultValue="Without label and description" />
        </PTextareaWrapper>
      </div>
    </>
  );
};
