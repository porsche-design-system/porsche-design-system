import React from 'react';
import { PMultiSelect, PMultiSelectOption, POptgroup } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PMultiSelect name="options" label="Some Label">
        <POptgroup label="Some optgroup label 1">
          <PMultiSelectOption value="a">
            Option A
          </PMultiSelectOption>
          <PMultiSelectOption value="b">
            Option B
          </PMultiSelectOption>
          <PMultiSelectOption value="c">
            Option C
          </PMultiSelectOption>
          <PMultiSelectOption value="d">
            Option D
          </PMultiSelectOption>
          <PMultiSelectOption value="e">
            Option E
          </PMultiSelectOption>
          <PMultiSelectOption value="f">
            Option F
          </PMultiSelectOption>
        </POptgroup>
        <POptgroup label="Some optgroup label 2">
          <PMultiSelectOption value="g">
            Option G
          </PMultiSelectOption>
          <PMultiSelectOption value="h">
            Option H
          </PMultiSelectOption>
          <PMultiSelectOption value="i">
            Option I
          </PMultiSelectOption>
        </POptgroup>
      </PMultiSelect>
    </>
  )
}
