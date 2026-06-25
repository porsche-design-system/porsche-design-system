import React from 'react';
import { useState } from 'react';
import { PButton, PButtonTile, PDrilldown, PDrilldownItem, PDrilldownLink, PLink, PModelSignature, type DrilldownUpdateEventDetail } from '@porsche-design-system/components-react';

export const Example = () => {
  const [activeIdentifier, setActiveIdentifier] = useState("id-1");
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(true);
  }
  const onUpdate = (e: CustomEvent<DrilldownUpdateEventDetail>) => {
    setActiveIdentifier(e.detail.activeIdentifier);
  }
  const onDismiss = () => {
    setOpen(false);
  }

  return (
    <>
      <nav aria-label="Main">
        <PButton type="button" aria={{'aria-haspopup': 'dialog'}} onClick={onClick}>
          Open Drilldown
        </PButton>
        <PDrilldown open={open} activeIdentifier={activeIdentifier} className="[--p-drilldown-grid-template:repeat(5,auto)_minmax(0,1fr)/auto]" onUpdate={onUpdate} onDismiss={onDismiss}>
          <PDrilldownItem identifier="id-1" label="Motorsport" className="[--p-drilldown-grid-template:auto/repeat(2,minmax(0,1fr))] [--p-drilldown-gap:0px_16px]">
            <PDrilldownItem identifier="id-1-1" label="718">
              <PModelSignature slot="header" model="718"></PModelSignature>
              <PButtonTile slot="button" label="Some label" description="718" weight="semi-bold" compact={true} aspectRatio={{'base': '1/1', 's': '9/16'}} className="mb-fluid-sm">
                <img srcSet="assets/porsche-963@2x.webp 2x" src="assets/porsche-963.webp" width={636} height={847} alt="Porsche 963" />
              </PButtonTile>
              <PDrilldownLink href="#">
                Some anchor
              </PDrilldownLink>
              <PDrilldownLink href="#">
                Some anchor
              </PDrilldownLink>
              <PDrilldownLink href="#">
                Some anchor
              </PDrilldownLink>
              <PDrilldownLink href="#">
                Some anchor
              </PDrilldownLink>
            </PDrilldownItem>
            <PDrilldownItem identifier="id-1-2" label="911">
              <PModelSignature slot="header" model="911"></PModelSignature>
              <PButtonTile slot="button" label="Some label" description="911" weight="semi-bold" compact={true} aspectRatio={{'base': '1/1', 's': '9/16'}} className="mb-fluid-sm">
                <img srcSet="assets/porsche-963@2x.webp 2x" src="assets/porsche-963.webp" width={636} height={847} alt="Porsche 963" />
              </PButtonTile>
              <PDrilldownLink href="#">
                Some anchor
              </PDrilldownLink>
              <PDrilldownLink href="#">
                Some anchor
              </PDrilldownLink>
            </PDrilldownItem>
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
            <PDrilldownLink href="#" aria-current="page">
              Some anchor
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-2" label="Some label">
            <PDrilldownItem identifier="id-2-1" label="Some label">
              <PDrilldownLink href="#">
                Some anchor
              </PDrilldownLink>
              <PDrilldownLink href="#">
                Some anchor
              </PDrilldownLink>
              <PDrilldownLink href="#">
                Some anchor
              </PDrilldownLink>
              <PDrilldownLink href="#">
                Some anchor
              </PDrilldownLink>
            </PDrilldownItem>
            <PDrilldownItem identifier="id-2-2" label="Some label">
              <PDrilldownLink href="#">
                Some anchor
              </PDrilldownLink>
              <PDrilldownLink href="#">
                Some anchor
              </PDrilldownLink>
              <PDrilldownLink href="#">
                Some anchor
              </PDrilldownLink>
            </PDrilldownItem>
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-3" label="Some label">
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-4" label="Some label">
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-5" label="Some label">
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor
            </PDrilldownLink>
          </PDrilldownItem>
          <PLink href="#" variant="secondary" icon="external" className="self-end">
            Some external anchor
          </PLink>
        </PDrilldown>
      </nav>
    </>
  )
}
