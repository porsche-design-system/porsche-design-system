import { PSpinner as Spinner } from '@porsche-design-system/components-react';
import React from 'react';

export const SpinnerPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should show spinner on light background">
        <Spinner />
      </div>

      <div className="playground dark" title="should show spinner on dark background">
        <Spinner theme="dark" />
      </div>

      <div className="playground light" title="should show spinner in different sizes">
        <Spinner size="small" />
        <Spinner size="medium" />
        <Spinner size="large" />
        <Spinner size="inherit" style={{ width: 24 }} />
      </div>

      <div className="playground light" title="should show spinner in different sizes on different viewports">
        <Spinner size="{ base: 'small', m: 'medium', l: 'large' }" />
      </div>
    </>
  );
};
