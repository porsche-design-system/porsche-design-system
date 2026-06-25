import React from 'react';
import { PAiTag } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <div className="relative inline-block rounded-lg overflow-hidden">
        <img src="assets/ai-tag-image.jpg" alt="AI modified image" className="block w-[300px] h-[300px] object-cover" />
        <PAiTag variant="modified" className="absolute bottom-static-sm end-static-sm scheme-dark"></PAiTag>
      </div>
    </>
  )
}
