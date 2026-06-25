import React from 'react';
import { PModelSignature } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PModelSignature safeZone={false} className="[--p-model-signature-width:auto]">
        <video poster="assets/ocean.jpg" src="assets/ocean.mp4" autoPlay={true} playsInline={true} loop={true} muted={true}></video>
      </PModelSignature>
    </>
  )
}
