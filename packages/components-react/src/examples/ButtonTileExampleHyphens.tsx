import { PButtonTile, PSelect, type PSelectChangeEvent, PSelectOption } from '@porsche-design-system/components-react';
import type { Property } from 'csstype';
import { useState } from 'react';

export const ButtonTileExampleHyphensPage = () => {
  const [hyphens, setHyphens] = useState<Property.Hyphens>('auto');

  const onChange = (e: PSelectChangeEvent) => {
    setHyphens(e.detail.value as Property.Hyphens);
  };

  return (
    <>
      <PSelect label="Select hyphens" name="hyphens" value={hyphens} onChange={onChange}>
        <PSelectOption value="auto">style="hyphens: auto;"</PSelectOption>
        <PSelectOption value="manual">style="hyphens: manual;"</PSelectOption>
        <PSelectOption value="none">style="hyphens: none;"</PSelectOption>
      </PSelect>

      <PButtonTile
        label="Some label"
        description="An extra&shy;ordinarily Porsche"
        compact={true}
        size="inherit"
        style={{ colorScheme: 'dark', maxWidth: '400px', fontSize: '45px', hyphens }}
        className="mt-fluid-sm"
      >
        <img src="http://localhost:3002/lights.jpg" alt="Some image description" />
      </PButtonTile>
    </>
  );
};
