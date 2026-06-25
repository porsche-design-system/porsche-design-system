import React from 'react';
import { PLinkPure } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <div className="flex gap-static-sm">
        <PLinkPure href="https://porsche.com" icon="phone">
          Some label
        </PLinkPure>
        <PLinkPure href="https://porsche.com" iconSource="assets/icon-custom-kaixin.svg" hideLabel={true}>
          Some label
        </PLinkPure>
      </div>
    </>
  )
}
