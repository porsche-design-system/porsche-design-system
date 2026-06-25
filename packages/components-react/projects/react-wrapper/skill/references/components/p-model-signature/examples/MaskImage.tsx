import React from 'react';
import { PModelSignature } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PModelSignature safeZone={false} className="[--p-model-signature-width:auto]">
        <img src="assets/dessert.jpg" alt="Dessert" />
      </PModelSignature>
    </>
  )
}
