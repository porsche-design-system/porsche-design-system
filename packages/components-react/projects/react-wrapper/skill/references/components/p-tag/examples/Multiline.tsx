import React from 'react';
import { PTag } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <div className="w-[100px]">
        <PTag variant="success" className="whitespace-normal">
          Some label with longer text wrapped in a narrow container
        </PTag>
      </div>
    </>
  )
}
