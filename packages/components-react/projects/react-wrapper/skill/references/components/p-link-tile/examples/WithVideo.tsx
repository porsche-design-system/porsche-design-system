import React from 'react';
import { PLinkTile, PTag } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PLinkTile href="https://porsche.com" label="Some label" description="Some Description">
        <PTag slot="header" color="background-frosted" compact={true}>
          Some tag
        </PTag>
        <video poster="assets/ocean.jpg" src="assets/ocean.mp4" loop={true} muted={true} autoPlay={true} aria-label="Some video description"></video>
      </PLinkTile>
    </>
  )
}
