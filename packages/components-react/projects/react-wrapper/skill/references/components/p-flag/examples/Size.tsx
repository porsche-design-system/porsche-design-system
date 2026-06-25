import React from 'react';
import { PFlag, PText } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PText className="text-[48px]" size="inherit">
        <PFlag className="me-static-sm" size="inherit" name="de" aria={{'aria-label': 'Flag of Germany'}}></PFlag>
        Some text
      </PText>
    </>
  )
}
