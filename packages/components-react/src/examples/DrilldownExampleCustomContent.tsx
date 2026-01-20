import {
  type DrilldownUpdateEventDetail,
  PButton,
  PButtonTile,
  PDrilldown,
  PDrilldownItem,
  PDrilldownLink,
  PLink,
  PModelSignature,
} from '@porsche-design-system/components-react';
import { spacingFluidSmall } from '@porsche-design-system/components-react/emotion';
import React, { useCallback, useState } from 'react';

export const DrilldownExampleCustomContentPage = (): JSX.Element => {
  const [isDrilldownOpen, setIsDrilldownOpen] = useState<boolean>(false);
  const [drilldownActiveIdentifier, setDrilldownActiveIdentifier] =
    useState<DrilldownUpdateEventDetail['activeIdentifier']>('id-1');
  const onOpen = useCallback(() => {
    setIsDrilldownOpen(true);
  }, []);
  const onDismiss = useCallback(() => {
    setIsDrilldownOpen(false);
  }, []);
  const onUpdate = useCallback(
    (e: CustomEvent<DrilldownUpdateEventDetail>) => setDrilldownActiveIdentifier(e.detail.activeIdentifier),
    []
  );

  return (
    <>
      <nav aria-label="Main">
        <PButton type="button" aria={{ 'aria-haspopup': 'dialog' }} onClick={onOpen}>
          Open Drilldown
        </PButton>
        <PDrilldown
          open={isDrilldownOpen}
          activeIdentifier={drilldownActiveIdentifier}
          onDismiss={onDismiss}
          onUpdate={onUpdate}
          style={{ '--p-drilldown-grid-template': 'repeat(5, auto) minmax(0, 1fr) / auto' } as React.CSSProperties}
        >
          <PDrilldownItem
            identifier="id-1"
            label="Motorsport"
            style={
              {
                '--p-drilldown-grid-template': 'auto / repeat(2, minmax(0, 1fr))',
                '--p-drilldown-gap': '0 16px',
              } as React.CSSProperties
            }
          >
            <PDrilldownItem identifier="id-1-1" label="718">
              <PModelSignature slot="header" model="718"></PModelSignature>
              <PButtonTile
                slot="button"
                label="Some label"
                description="718"
                weight="semi-bold"
                compact={true}
                aspectRatio={{ base: '1/1', s: '9/16' }}
                style={{ marginBottom: spacingFluidSmall }}
              >
                <img
                  srcSet="http://localhost:3002/porsche-963@2x.webp 2x"
                  src="http://localhost:3002/porsche-963.webp"
                  width="636"
                  height="847"
                  alt="Porsche 963"
                />
              </PButtonTile>
              <PDrilldownLink href="#">Some anchor</PDrilldownLink>
              <PDrilldownLink href="#">Some anchor</PDrilldownLink>
              <PDrilldownLink href="#">Some anchor</PDrilldownLink>
              <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            </PDrilldownItem>
            <PDrilldownItem identifier="id-1-2" label="911">
              <PModelSignature slot="header" model="911"></PModelSignature>
              <PButtonTile
                slot="button"
                label="Some label"
                description="911"
                weight="semi-bold"
                compact={true}
                aspectRatio={{ base: '1/1', s: '9/16' }}
                style={{ marginBottom: spacingFluidSmall }}
              >
                <img
                  srcSet="http://localhost:3002/porsche-963@2x.webp 2x"
                  src="http://localhost:3002/porsche-963.webp"
                  width="636"
                  height="847"
                  alt="Porsche 963"
                />
              </PButtonTile>
              <PDrilldownLink href="#">Some anchor</PDrilldownLink>
              <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            </PDrilldownItem>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#" active={true}>
              Some anchor
            </PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-2" label="Some Label">
            <PDrilldownItem identifier="id-2-1" label="Some Label">
              <PDrilldownLink href="#">Some anchor</PDrilldownLink>
              <PDrilldownLink href="#">Some anchor</PDrilldownLink>
              <PDrilldownLink href="#">Some anchor</PDrilldownLink>
              <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            </PDrilldownItem>
            <PDrilldownItem identifier="id-2-2" label="Some Label">
              <PDrilldownLink href="#">Some anchor</PDrilldownLink>
              <PDrilldownLink href="#">Some anchor</PDrilldownLink>
              <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            </PDrilldownItem>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-3" label="Some Label">
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-4" label="Some Label">
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-5" label="Some Label">
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
          </PDrilldownItem>
          <PLink href="#" icon="external" variant="secondary" style={{ alignSelf: 'end' }}>
            Some external anchor
          </PLink>
        </PDrilldown>
      </nav>
    </>
  );
};
