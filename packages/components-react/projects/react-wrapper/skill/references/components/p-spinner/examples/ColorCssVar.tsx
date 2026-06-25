import React from 'react';
import { PSpinner } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PSpinner className="[--p-spinner-color:deeppink] [--p-spinner-track-color:lightpink]" aria={{'aria-label': 'Loading page content'}}></PSpinner>
    </>
  )
}
