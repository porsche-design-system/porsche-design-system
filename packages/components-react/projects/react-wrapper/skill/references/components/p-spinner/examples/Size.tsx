import React from 'react';
import { PSpinner, PText } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PText className="text-[48px]" size="inherit">
        <PSpinner className="me-static-sm" size="inherit" aria={{'aria-label': 'Loading page content'}}></PSpinner>
        Some text
      </PText>
    </>
  )
}
