import React from 'react';
import { PHeading } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PHeading tag="h3">
        The quick brown fox jumps over the lazy dog
      </PHeading>

      <PHeading>
        <h3>
          The quick brown fox jumps over the lazy dog
        </h3>
      </PHeading>
    </>
  )
}
