/* Auto Generated File */
import type { NextPage } from 'next';
import { PSpinner } from '@porsche-design-system/components-react/ssr';

const SpinnerPage: NextPage = (): JSX.Element => {
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
    </>
  );
};

export default SpinnerPage;
