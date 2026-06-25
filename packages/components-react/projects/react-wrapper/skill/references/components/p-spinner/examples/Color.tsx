import React from 'react';
import { PSpinner, PText } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PText style={{'color': 'light-dark(mediumvioletred, deeppink)'}} color="inherit">
        <PSpinner className="me-static-sm" color="inherit" aria={{'aria-label': 'Loading page content'}}></PSpinner>
        Some text
      </PText>
    </>
  )
}
