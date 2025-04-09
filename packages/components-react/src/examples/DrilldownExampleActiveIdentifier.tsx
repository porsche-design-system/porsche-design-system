import {
  type DrilldownUpdateEventDetail,
  PButton,
  PDrilldown,
  PDrilldownItem,
  PDrilldownButton,
  PDrilldownLink
} from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const DrilldownExampleActiveIdentifierPage = (): JSX.Element => {
  const [isDrilldownOpen, setIsDrilldownOpen] = useState<boolean>(false);
  const [drilldownActiveIdentifier, setDrilldownActiveIdentifier] =
    useState<DrilldownUpdateEventDetail['activeIdentifier']>('id-2');
  const onOpen = useCallback(() => {
    setIsDrilldownOpen(true);
  }, []);
  const onDismiss = useCallback(() => {
    setIsDrilldownOpen(false);
  }, []);
  const onUpdate = useCallback(
    (e: CustomEvent<DrilldownUpdateEventDetail>) =>
      setDrilldownActiveIdentifier(e.detail.activeIdentifier),
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
            <PDrilldownButton slot="button">Some Label</PDrilldownButton>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-2" label="Some Label">
            <PDrilldownButton slot="button">Some Label</PDrilldownButton>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#" active={true}>
              Some anchor
            </PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-3" label="Some Label">
            <PDrilldownButton slot="button">Some Label</PDrilldownButton>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-4" label="Some Label">
            <PDrilldownButton slot="button">Some Label</PDrilldownButton>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-5" label="Some Label">
            <PDrilldownButton slot="button">Some Label</PDrilldownButton>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor</PDrilldownLink>
          </PDrilldownItem>
        </PDrilldown>
      </nav>
    </>
  );
};
