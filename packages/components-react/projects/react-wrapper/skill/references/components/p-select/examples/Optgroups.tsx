import React from 'react';
import { POptgroup, PSelect, PSelectOption } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PSelect name="options" label="Some Label" description="Some description">
        <POptgroup label="Some optgroup label 1">
          <PSelectOption value="a">
            Option A
          </PSelectOption>
          <PSelectOption value="b">
            Option B
          </PSelectOption>
          <PSelectOption value="c">
            Option C
          </PSelectOption>
          <PSelectOption value="d">
            Option D
          </PSelectOption>
          <PSelectOption value="e">
            Option E
          </PSelectOption>
          <PSelectOption value="f">
            Option F
          </PSelectOption>
        </POptgroup>
        <POptgroup label="Some optgroup label 2">
          <PSelectOption value="g">
            Option G
          </PSelectOption>
          <PSelectOption value="h">
            Option H
          </PSelectOption>
          <PSelectOption value="i">
            Option I
          </PSelectOption>
        </POptgroup>
      </PSelect>
    </>
  )
}
