import React from 'react';
import { PModelSignature } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PModelSignature color="inherit" className="text-info"></PModelSignature>

      <PModelSignature className="[--p-model-signature-width:auto] [--p-model-signature-height:50px] block"></PModelSignature>

      <PModelSignature className="[--p-model-signature-width:50px] [--p-model-signature-height:auto] block"></PModelSignature>
    </>
  )
}
