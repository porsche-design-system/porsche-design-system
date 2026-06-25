import React from 'react';
import { PLink } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <div className="flex gap-static-sm">
        <PLink href="https://porsche.com" icon="phone">
          Some label
        </PLink>
        <PLink href="https://porsche.com" iconSource="assets/icon-custom-kaixin.svg" hideLabel={true}>
          Some label
        </PLink>
      </div>
    </>
  )
}
