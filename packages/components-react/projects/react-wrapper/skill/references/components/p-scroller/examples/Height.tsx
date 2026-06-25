import React from 'react';
import { PScroller, PTagDismissible } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PScroller className="max-w-[600px] whitespace-nowrap">
        <PTagDismissible className="me-static-md">
          Some tag content
        </PTagDismissible>
        <PTagDismissible className="me-static-md">
          Some tag content
        </PTagDismissible>
        <PTagDismissible className="me-static-md">
          Some tag content
        </PTagDismissible>
        <PTagDismissible className="me-static-md">
          Some tag content
        </PTagDismissible>
        <PTagDismissible className="me-static-md">
          Some tag content
        </PTagDismissible>
      </PScroller>
    </>
  )
}
