import React from 'react';
import { PLinkTile, PSelect, PSelectOption, SelectChangeEventDetail } from '@porsche-design-system/components-react';
import { Property } from 'csstype';
import { useState } from 'react';

export const Example = () => {
  const [hyphens, setHyphens] = useState<Property.Hyphens>('auto');

  const onChange = (e: CustomEvent<SelectChangeEventDetail>) => {
    setHyphens(e.detail.value as Property.Hyphens);
  };

  return (
    <>
      <PSelect label="Select hyphens" name="hyphens" value={hyphens} onChange={onChange}>
        <PSelectOption value="auto">style="hyphens: auto;"</PSelectOption>
        <PSelectOption value="manual">style="hyphens: manual;"</PSelectOption>
        <PSelectOption value="none">style="hyphens: none;"</PSelectOption>
      </PSelect>

      <PLinkTile
        href="https://porsche.com"
        label="Some label"
        description="An extra&shy;ordinarily Porsche"
        compact={true}
        size="inherit"
        style={{ colorScheme: 'dark', maxWidth: '400px', fontSize: '45px', hyphens }}
        className="mt-fluid-sm"
      >
        <img src="assets/lights.jpg" alt="Some image description" />
      </PLinkTile>
    </>
  );
};
