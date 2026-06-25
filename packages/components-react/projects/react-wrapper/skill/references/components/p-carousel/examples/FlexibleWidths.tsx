import React from 'react';
import { PCarousel } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PCarousel heading="Some heading" slidesPerPage="auto" trimSpace={true} pagination={true} rewind={true}>
        <div className="grid place-content-center w-[10vw] h-[150px] bg-surface prose-text-sm">
          10vw
        </div>
        <div className="grid place-content-center w-[200px] h-[150px] bg-surface prose-text-sm">
          200px
        </div>
        <div className="grid place-content-center w-[100px] h-[150px] bg-surface prose-text-sm">
          100px
        </div>
        <div className="grid place-content-center w-[40vw] h-[150px] bg-surface prose-text-sm">
          40vw
        </div>
        <div className="grid place-content-center w-[150px] h-[150px] bg-surface prose-text-sm">
          150px
        </div>
        <div className="grid place-content-center w-[50vw] h-[150px] bg-surface prose-text-sm">
          50vw
        </div>
      </PCarousel>
    </>
  )
}
