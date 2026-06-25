import React from 'react';
import { PLinkTile, PTag, PText } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-static-md">
        <PLinkTile href="https://porsche.com" label="Some label" description="Some Description">
          <PTag slot="header" color="background-frosted" compact={true}>
            Some tag
          </PTag>
          <img src="assets/lights.jpg" alt="Some image description" />
          <PText slot="footer">
            Some footer text
          </PText>
        </PLinkTile>
        <PLinkTile href="https://porsche.com" label="Some label" description="Some Description" compact={true}>
          <PTag slot="header" color="background-frosted" compact={true}>
            Some tag
          </PTag>
          <img src="assets/lights.jpg" alt="Some image description" />
          <PText slot="footer">
            Some footer text
          </PText>
        </PLinkTile>
      </div>
    </>
  )
}
