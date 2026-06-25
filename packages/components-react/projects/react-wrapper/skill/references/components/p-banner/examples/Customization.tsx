import React from 'react';
import { useState } from 'react';
import { PBanner, PButton, PHeading, PLinkPure, PText } from '@porsche-design-system/components-react';

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
      <PButton type="button" onClick={onClick}>
        Open Banner
      </PButton>

      <PBanner open={open} className="[--p-banner-top:8px] [--p-banner-bottom:8px] [--p-banner-inset-x:8px] [--p-banner-max-w:70ch]" onDismiss={onDismiss}>
        <PHeading slot="heading" size="sm" weight="semibold">
          Some heading
        </PHeading>
        <PText slot="description">
          Some description. You can also add inline 
          <PLinkPure href="https://porsche.com" icon="none" underline={true}>
            links
          </PLinkPure>
           to route to another page.
        </PText>
      </PBanner>
    </>
  )
}
