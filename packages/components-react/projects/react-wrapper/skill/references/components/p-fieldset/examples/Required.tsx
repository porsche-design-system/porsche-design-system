import React from 'react';
import { PFieldset, PInputText } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PFieldset label="Some legend label" required={true}>
        <PInputText label="Some label" name="some-name-1" required={true}></PInputText>
        <PInputText label="Some label" name="some-name-2" required={true} className="mt-fluid-sm"></PInputText>
      </PFieldset>
    </>
  )
}
