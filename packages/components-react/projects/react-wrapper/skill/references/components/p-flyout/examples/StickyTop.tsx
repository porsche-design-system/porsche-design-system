import React from 'react';
import { useState } from 'react';
import { PButton, PFlyout, PHeading, PText } from '@porsche-design-system/components-react';

export const Example = () => {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(true);
  }
  const onDismiss = () => {
    setOpen(false);
  }

  return (
    <>
      <PButton type="button" aria={{'aria-haspopup': 'dialog'}} onClick={onClick}>
        Open Flyout
      </PButton>

      <PFlyout open={open} aria={{'aria-label': 'Some Heading'}} onDismiss={onDismiss}>
        <PHeading slot="header" size="large" tag="h2">
          Some Heading
        </PHeading>
        <div className="grid grid-cols-[2fr_1fr] gap-static-md items-start">
          <div className="sticky top-[calc(var(--p-flyout-sticky-top,0)+16px)] p-static-md bg-surface">
            Some sticky element within content relying on --p-flyout-sticky-top
          </div>
          <div>
            <PText>
              Some Content Begin
            </PText>
            <div className="w-[10px] h-[120vh] bg-[deeppink]"></div>
            <PText>
              Some Content End
            </PText>
          </div>
        </div>
      </PFlyout>
    </>
  )
}
