import React from 'react';
import { PTextList, PTextListItem } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PTextList>
        <PTextListItem>
          The quick brown fox jumps over the lazy dog
        </PTextListItem>
        <PTextListItem>
          The quick brown fox jumps over the lazy dog
          <PTextList>
            <PTextListItem>
              The quick brown fox jumps over the lazy dog
            </PTextListItem>
            <PTextListItem>
              The quick brown fox jumps over the lazy dog
            </PTextListItem>
          </PTextList>
        </PTextListItem>
        <PTextListItem>
          The quick brown fox jumps over the lazy dog
        </PTextListItem>
      </PTextList>
    </>
  )
}
