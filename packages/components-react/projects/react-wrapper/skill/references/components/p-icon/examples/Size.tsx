import React from 'react';
import { PIcon, PText } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PText className="text-[48px]" size="inherit">
        <PIcon className="me-static-sm" size="inherit" name="highway" aria={{'aria-label': 'Highway icon'}}></PIcon>
        Some text
      </PText>
    </>
  )
}
