import React from 'react';
import { useState } from 'react';
import { PBanner, PButton } from '@porsche-design-system/components-react';

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

      <PBanner open={open} heading="Some Heading" headingTag="h3" description="Some Description" onDismiss={onDismiss}></PBanner>
    </>
  )
}
