import React from 'react';
import { PButtonTile, PTag, PText } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PButtonTile label="Some label" description="Some Description" gradient={true}>
        <PTag slot="header" color="background-frosted" compact={true}>
          Some tag
        </PTag>
        <img src="assets/lights.jpg" alt="Some image description" />
        <PText slot="footer">
          Some footer text
        </PText>
      </PButtonTile>
    </>
  )
}
