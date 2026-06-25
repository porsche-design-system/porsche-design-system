import React from 'react';
import { useState } from 'react';
import { PButton, PDrilldown, PDrilldownItem, PDrilldownLink, type DrilldownUpdateEventDetail } from '@porsche-design-system/components-react';

export const Example = () => {
  const [activeIdentifier, setActiveIdentifier] = useState(undefined);
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
        <PDrilldown open={open} activeIdentifier={activeIdentifier} onUpdate={onUpdate} onDismiss={onDismiss}>
          <PDrilldownItem identifier="id-1" label="Some Label (1)">
            <PDrilldownItem identifier="id-1-1" label="Some Label (1-1)">
              <PDrilldownLink href="#">
                Some anchor (1-1)
              </PDrilldownLink>
              <PDrilldownLink>
                <a href="#">
                  Some anchor (1-1)
                </a>
              </PDrilldownLink>
            </PDrilldownItem>
            <PDrilldownItem identifier="id-1-2" label="Some Label (1-2)">
              <PDrilldownLink href="#">
                Some anchor (1-2)
              </PDrilldownLink>
              <PDrilldownLink href="#">
                Some anchor (1-2)
              </PDrilldownLink>
              <PDrilldownLink href="#">
                Some anchor (1-2)
              </PDrilldownLink>
              <PDrilldownItem identifier="id-1-2-1" label="Some Label (1-2-1)">
                <PDrilldownLink href="#">
                  Some anchor (1-2-1)
                </PDrilldownLink>
                <PDrilldownLink href="#">
                  Some anchor (1-2-1)
                </PDrilldownLink>
              </PDrilldownItem>
              <PDrilldownLink href="#">
                Some anchor (1-2)
              </PDrilldownLink>
            </PDrilldownItem>
            <PDrilldownLink href="#">
              Some anchor (1-1)
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor (1-1)
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor (1-1)
            </PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-2" label="Some Label (2)">
            <PDrilldownLink href="#">
              Some anchor (2)
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor (2)
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor (2)
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor (2)
            </PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-3" label="Some Label (3)">
            <PDrilldownLink href="#">
              Some anchor (3)
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor (3)
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor (3)
            </PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-4" label="Some Label (4)">
            <PDrilldownLink href="#">
              Some anchor (4)
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor (4)
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor (4)
            </PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-5" label="Some Label (5)">
            <PDrilldownLink href="#">
              Some anchor (5)
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor (5)
            </PDrilldownLink>
          </PDrilldownItem>
        </PDrilldown>
      </nav>
    </>
  )
}
