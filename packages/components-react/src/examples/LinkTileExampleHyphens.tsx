import { PLinkTile, PSelect, PSelectOption, SelectUpdateEventDetail } from '@porsche-design-system/components-react';
import { Property } from 'csstype';
import { useState } from 'react';

export const LinkTileExampleHyphensPage = (): JSX.Element => {
  const [hyphens, setHyphens] = useState<Property.Hyphens>('auto');

  const onUpdate = (e: CustomEvent<SelectUpdateEventDetail>) => {
    setHyphens(e.detail.value as Property.Hyphens);
  };

  return (
    <>
      <PSelect label="Select hyphens" name="hyphens" value={hyphens} onUpdate={onUpdate}>
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
        style={{ maxWidth: '400px', fontSize: '45px', hyphens }}
      >
        <img src="assets/lights.jpg" alt="Some image description" />
      </PLinkTile>
    </>
  );
};
