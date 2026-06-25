import React from 'react';
import { useState } from 'react';
import { PButton, PModal } from '@porsche-design-system/components-react';

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

      <PModal open={open} backdrop="shading" aria={{'aria-label': 'Some Label'}} className="[--p-modal-width:clamp(276px,45.25vw+131px,1000px)] [--p-modal-spacing-top:200px] [--p-modal-spacing-bottom:50px]" onDismiss={onDismiss}>
        <img src="assets/porsche-992-carrera-s.jpg" className="-mt-(--ref-p-modal-pt) -mx-(--ref-p-modal-px) -mb-(--ref-p-modal-pb) max-w-(--p-modal-width) rounded-xl" />
      </PModal>
    </>
  )
}
