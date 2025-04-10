import {
  type DrilldownUpdateEventDetail,
  PButton,
  PDrilldown,
  PDrilldownItem,
  PDrilldownLink,
} from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const DrilldownExamplePage = (): JSX.Element => {
  const [isDrilldownOpen, setIsDrilldownOpen] = useState<boolean>(false);
  const [drilldownActiveIdentifier, setDrilldownActiveIdentifier] =
    useState<DrilldownUpdateEventDetail['activeIdentifier']>(undefined);
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
        >
          <PDrilldownItem identifier="id-1" label="Some Label">
            <PDrilldownItem identifier="id-1-1" label="Some Label (1-1)">
              <PDrilldownLink href="#">Some anchor (1-1)</PDrilldownLink>
              <PDrilldownLink>
                <a href="#">Some anchor (1-1)</a>
              </PDrilldownLink>
            </PDrilldownItem>
            <PDrilldownItem identifier="id-1-2" label="Some Label (1-2)">
              <PDrilldownLink href="#">Some anchor (1-2)</PDrilldownLink>
              <PDrilldownLink href="#">Some anchor (1-2)</PDrilldownLink>
              <PDrilldownLink href="#">Some anchor (1-2)</PDrilldownLink>
              <PDrilldownItem identifier="id-1-2-1" label="Some Label (1-2-1)">
                <PDrilldownLink href="#">Some anchor (1-2-1)</PDrilldownLink>
                <PDrilldownLink href="#">Some anchor (1-2-1)</PDrilldownLink>
              </PDrilldownItem>
              <PDrilldownLink href="#">Some anchor (1-2)</PDrilldownLink>
            </PDrilldownItem>
            <PDrilldownLink href="#">Some anchor (1)</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor (1)</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor (1)</PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-2" label="Some Label (2)">
            <PDrilldownLink href="#">Some anchor (2)</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor (2)</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor (2)</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor (2)</PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-3" label="Some Label (3)">
            <PDrilldownLink href="#">Some anchor (3)</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor (3)</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor (3)</PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-4" label="Some Label (4)">
            <PDrilldownLink href="#">Some anchor (4)</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor (4)</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor (4)</PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-5" label="Some Label (5)">
            <PDrilldownLink href="#">Some anchor (5)</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor (5)</PDrilldownLink>
          </PDrilldownItem>
        </PDrilldown>
      </nav>
    </>
  );
};
