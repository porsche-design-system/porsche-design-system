/* Auto Generated File */
import { PSpinner } from '@porsche-design-system/components-react';

export const SpinnerPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should show spinner">
        <PSpinner />
      </div>

      <div className="playground light" title="should show spinner in different sizes">
        <PSpinner size="small" />
        <PSpinner size="medium" />
        <PSpinner size="large" />
        <PSpinner size="inherit" style={{ width: '24px' }} />
      </div>

      <div className="playground light" title="should show spinner in different sizes on different viewports">
        <PSpinner size={{ base: 'small', m: 'medium', l: 'large' }} />
      </div>
    </>
  );
};
