import React from 'react';
import { PButtonPure, PPopover } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PPopover>
        <PButtonPure hideLabel={true} icon="car" slot="button">
          More information
        </PButtonPure>
        Some additional content.
      </PPopover>
    </>
  )
}
