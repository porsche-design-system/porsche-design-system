import {
  type DrilldownUpdateEventDetail,
  PButton,
  PDrilldown,
  PDrilldownItem,
  PLinkPure,
  PLinkTile,
} from '@porsche-design-system/components-react';
import { spacingFluidSmall } from '@porsche-design-system/components-react/styles';
import { useCallback, useState } from 'react';

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
            <PLinkTile
              href="#"
              label="Some label"
              description="Some Description"
              weight="semi-bold"
              compact={true}
              aspectRatio={{ base: '4/3', xs: '16/9', s: '1/1' }}
              style={{ marginBottom: spacingFluidSmall }}
            >
              <img
                srcSet="http://localhost:3002/porsche-963@2x.webp 2x"
                src="http://localhost:3002/porsche-963.webp"
                width="636"
                height="847"
                alt="Porsche 963"
              />
            </PLinkTile>
            <a href="#">Some anchor</a>
            <a href="#" aria-current="page">
              Some anchor
            </a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-2" label="Some Label">
            <PDrilldownItem identifier="id-2-1" label="Some Label">
              <a href="#">Some anchor</a>
              <a href="#">Some anchor</a>
              <a href="#">Some anchor</a>
              <a href="#">Some anchor</a>
            </PDrilldownItem>
            <PDrilldownItem identifier="id-2-2" label="Some Label">
              <a href="#">Some anchor</a>
              <a href="#">Some anchor</a>
              <a href="#">Some anchor</a>
            </PDrilldownItem>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-3" label="Some Label">
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-4" label="Some Label">
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
          </PDrilldownItem>
          <PDrilldownItem identifier="id-5" label="Some Label">
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
          </PDrilldownItem>
          <PLinkPure
            size="medium"
            href="#"
            icon="external"
            style={{ margin: `0 calc(${spacingFluidSmall} * -1)`, padding: spacingFluidSmall }}
          >
            Some external anchor
          </PLinkPure>
        </PDrilldown>
      </nav>
    </>
  );
};
