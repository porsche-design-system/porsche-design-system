import React from 'react';
import { PSpinner } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PSpinner size={{'base': 'sm', 'l': '2xl'}} aria={{'aria-label': 'Loading page content'}}></PSpinner>
    </>
  )
}
