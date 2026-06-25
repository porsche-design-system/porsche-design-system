import React from 'react';
import { PDivider } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <div className="lg:flex lg:h-[150px]">
        <PDivider direction={{'base': 'horizontal', 'l': 'vertical'}}></PDivider>
      </div>
    </>
  )
}
