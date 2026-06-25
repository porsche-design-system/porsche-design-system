import React from 'react';
import { PIcon, PText } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PText style={{'color': 'light-dark(mediumvioletred, deeppink)'}} color="inherit">
        <PIcon className="me-static-sm" color="inherit" name="highway" aria={{'aria-label': 'Highway icon'}}></PIcon>
        Some text
      </PText>
    </>
  )
}
