import React from 'react';
import { useState } from 'react';
import { PSwitch, type SwitchUpdateEventDetail } from '@porsche-design-system/components-react';

export const Example = () => {
  const [checked, setChecked] = useState(false);

  const onUpdate = (e: CustomEvent<SwitchUpdateEventDetail>) => {
    setChecked(e.detail.checked);
  }

  return (
    <>
      <PSwitch checked={checked} onUpdate={onUpdate}>
        Some label
      </PSwitch>
    </>
  )
}
