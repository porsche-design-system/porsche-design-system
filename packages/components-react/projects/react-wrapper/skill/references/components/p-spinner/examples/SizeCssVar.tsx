import React from 'react';
import { PSpinner } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PSpinner className="[--p-spinner-size:48px]" aria={{'aria-label': 'Loading page content'}}></PSpinner>
    </>
  )
}
