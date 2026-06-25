import React from 'react';
import { PCarousel } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PCarousel heading="Some heading" intl={{'slideLabel': 'Slide %s von %s', 'prev': 'Vorheriger Slide', 'next': 'Nchster Slide', 'first': 'Zum ersten Slide', 'last': 'Zum letzten Slide'}}>
        <div className="grid place-content-center h-[150px] bg-surface prose-text-sm">
          Slide 1
        </div>
        <div className="grid place-content-center h-[150px] bg-surface prose-text-sm">
          Slide 2
        </div>
        <div className="grid place-content-center h-[150px] bg-surface prose-text-sm">
          Slide 3
        </div>
      </PCarousel>
    </>
  )
}
