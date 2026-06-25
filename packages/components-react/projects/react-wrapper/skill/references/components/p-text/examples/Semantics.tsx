import React from 'react';
import { PText } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PText tag="blockquote">
        The quick brown fox jumps over the lazy dog
      </PText>

      <PText>
        <blockquote>
          The quick brown fox jumps over the lazy dog
        </blockquote>
      </PText>
    </>
  )
}
