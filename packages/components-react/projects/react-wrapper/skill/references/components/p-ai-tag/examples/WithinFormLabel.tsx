import React from 'react';
import { PAiTag, POptgroup, PSelect, PSelectOption } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PSelect name="options" description="Some description">
        <span slot="label">
          Pick your favorite Fruits
          <PAiTag variant="abbreviation" className="ms-static-sm"></PAiTag>
        </span>
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
        </POptgroup>
        <POptgroup label="Some optgroup label 2">
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
      </PSelect>
    </>
  )
}
