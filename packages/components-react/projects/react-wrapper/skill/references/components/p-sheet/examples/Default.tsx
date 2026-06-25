import React from 'react';
import { useState } from 'react';
import { PButton, PHeading, PSheet, PText } from '@porsche-design-system/components-react';

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
        Open Sheet
      </PButton>

      <PSheet open={open} aria={{'aria-label': 'Some Heading'}} onDismiss={onDismiss}>
        <PHeading slot="header" size="large" tag="h2">
          Some Heading
        </PHeading>
        <PText>
          Some Content
        </PText>
      </PSheet>
    </>
  )
}
