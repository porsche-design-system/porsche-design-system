import React from 'react';
import { PFlag } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PFlag className="[--p-flag-size:48px]" name="de" aria={{'aria-label': 'Flag of Germany'}}></PFlag>
    </>
  )
}
