import React from 'react';
import { PStepperHorizontal, PStepperHorizontalItem } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PStepperHorizontal>
        <PStepperHorizontalItem state="complete">
          Step 1
        </PStepperHorizontalItem>
        <PStepperHorizontalItem state="warning">
          Step 2
        </PStepperHorizontalItem>
        <PStepperHorizontalItem state="current">
          Step 3
        </PStepperHorizontalItem>
        <PStepperHorizontalItem>
          Step 4
        </PStepperHorizontalItem>
      </PStepperHorizontal>
    </>
  )
}
