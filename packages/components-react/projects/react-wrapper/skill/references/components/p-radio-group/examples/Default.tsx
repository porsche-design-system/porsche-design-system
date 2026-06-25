import React from 'react';
import { PRadioGroup, PRadioGroupOption } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PRadioGroup name="options" label="Some Label" description="Some description">
        <PRadioGroupOption value="a" label="Option A"></PRadioGroupOption>
        <PRadioGroupOption value="b" label="Option B"></PRadioGroupOption>
        <PRadioGroupOption value="c" label="Option C"></PRadioGroupOption>
        <PRadioGroupOption value="d" label="Option D"></PRadioGroupOption>
        <PRadioGroupOption value="e" label="Option E"></PRadioGroupOption>
        <PRadioGroupOption value="f" label="Option F"></PRadioGroupOption>
      </PRadioGroup>
    </>
  )
}
