import React from 'react';
import { PCheckbox } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <div className="flex flex-col gap-static-sm">
        <PCheckbox label="Some label" indeterminate={true}></PCheckbox>
        <PCheckbox label="Some label" indeterminate={true} checked={true}></PCheckbox>
      </div>
    </>
  )
}
