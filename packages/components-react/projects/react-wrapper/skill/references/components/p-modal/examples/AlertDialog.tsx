import React from 'react';
import { useState } from 'react';
import { PButton, PHeading, PModal, PText } from '@porsche-design-system/components-react';

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
        Open Modal
      </PButton>

      <PModal open={open} aria={{'role': 'alertdialog'}} disableBackdropClick={true} onDismiss={onDismiss}>
        <PHeading slot="header" size="large" tag="h2">
          Some important Heading
        </PHeading>
        <PText>
          Some important Content
        </PText>
        <div slot="footer" role="group" className="flex flex-wrap gap-fluid-sm max-xs:flex-col">
          <PButton type="button">
            Accept
          </PButton>
          <PButton type="button" variant="secondary">
            Deny
          </PButton>
        </div>
      </PModal>
    </>
  )
}
