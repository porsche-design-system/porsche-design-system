import React from 'react';
import { PDisplay } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PDisplay tag="h3">
        The quick brown fox jumps over the lazy dog
      </PDisplay>

      <PDisplay>
        <h3>
          The quick brown fox jumps over the lazy dog
        </h3>
      </PDisplay>
    </>
  )
}
