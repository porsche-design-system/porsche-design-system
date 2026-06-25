import React from 'react';
import { PCarousel } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PCarousel heading="Some heading" trimSpace={true} pagination={true} rewind={true}>
        <div className="grid place-content-center h-[150px] bg-surface prose-text-sm">
          Slide 1
        </div>
        <div className="grid place-content-center h-[150px] bg-surface prose-text-sm">
          Slide 2
        </div>
        <div className="grid place-content-center h-[150px] bg-surface prose-text-sm">
          Slide 3
        </div>
        <div className="grid place-content-center h-[150px] bg-surface prose-text-sm">
          Slide 4
        </div>
      </PCarousel>
    </>
  )
}
