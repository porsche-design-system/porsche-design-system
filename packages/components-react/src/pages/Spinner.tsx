/* Auto Generated File */
import { PSpinner } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const SpinnerPage = (): JSX.Element => {
  useEffect(() => {
    (document.querySelector('#setSizeToUndefined') as any).size = undefined;
  }, []);

  return (
    <>
      <div className="playground light" title="should show spinner on light background">
        <PSpinner />
      </div>

      <div className="playground dark" title="should show spinner on dark background">
        <PSpinner theme="dark" />
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

      <div className="playground light" title="should show spinner small when size is undefined">
        <PSpinner id="setSizeToUndefined" />
      </div>
    </>
  );
};
