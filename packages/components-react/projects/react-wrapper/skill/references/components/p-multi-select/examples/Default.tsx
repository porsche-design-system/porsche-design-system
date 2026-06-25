import React from 'react';
import { PMultiSelect, PMultiSelectOption } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PMultiSelect name="name" label="Some Label" description="Some description">
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
      </PMultiSelect>
    </>
  )
}
