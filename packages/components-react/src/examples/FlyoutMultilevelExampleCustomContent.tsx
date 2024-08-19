import { useCallback, useState } from 'react';
import {
  type FlyoutMultilevelUpdateEventDetail,
  PButton,
  PFlyoutMultilevel,
  PFlyoutMultilevelItem,
  PLinkPure,
  PLinkTile,
} from '@porsche-design-system/components-react';
import { spacingFluidSmall } from '@porsche-design-system/components-react/styles';

export const FlyoutMultilevelExampleCustomContentPage = (): JSX.Element => {
  const [isFlyoutMultilevelOpen, setIsFlyoutMultilevelOpen] = useState<boolean>(false);
  const [flyoutMultilevelActiveIdentifier, setFlyoutMultilevelActiveIdentifier] = useState<string>('item-1');
  const onOpen = useCallback(() => {
    setIsFlyoutMultilevelOpen(true);
  }, []);
  const onDismiss = useCallback(() => {
    setIsFlyoutMultilevelOpen(false);
  }, []);
  const onUpdate = useCallback(
    (e: CustomEvent<FlyoutMultilevelUpdateEventDetail>) =>
      setFlyoutMultilevelActiveIdentifier(e.detail.activeIdentifier),
    []
  );

  return (
    <>
      <PButton type="button" aria={{ 'aria-haspopup': 'dialog' }} onClick={onOpen}>
        Open Flyout Multilevel
      </PButton>
      <PFlyoutMultilevel
        open={isFlyoutMultilevelOpen}
        activeIdentifier={flyoutMultilevelActiveIdentifier}
        onDismiss={onDismiss}
        onUpdate={onUpdate}
      >
        <PFlyoutMultilevelItem identifier="item-1" label="Some Label">
          <PLinkTile
            href="#"
            label="Some label"
            description="Some Description"
            weight="semi-bold"
            compact={true}
            aspectRatio={{ base: '4:3', xs: '16:9', s: '1:1' }}
          >
            <img
              srcSet="https://porsche-design-system.github.io/dummyasset/porsche-963@2x.webp 2x"
              src="https://porsche-design-system.github.io/dummyasset/porsche-963.webp"
              width="636"
              height="847"
              alt="Porsche 963"
            />
          </PLinkTile>
          <h3>Some heading</h3>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor" aria-current="page">
            Some anchor
          </a>
          <a href="#some-anchor">Some anchor</a>
          <h3>Some heading</h3>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
        </PFlyoutMultilevelItem>
        <PFlyoutMultilevelItem identifier="item-2" label="Some Label">
          <h3>Some heading</h3>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
          <h3>Some heading</h3>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
        </PFlyoutMultilevelItem>
        <PFlyoutMultilevelItem identifier="item-3" label="Some Label">
          <h3>Some heading</h3>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
          <h3>Some heading</h3>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
        </PFlyoutMultilevelItem>
        <PFlyoutMultilevelItem identifier="item-4" label="Some Label">
          <h3>Some heading</h3>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
        </PFlyoutMultilevelItem>
        <PFlyoutMultilevelItem identifier="item-5" label="Some Label">
          <h3>Some heading</h3>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
        </PFlyoutMultilevelItem>
        <PLinkPure
          size="medium"
          href="#"
          icon="external"
          style={{ margin: `0 calc(${spacingFluidSmall} * -1)`, padding: spacingFluidSmall }}
        >
          Some external anchor
        </PLinkPure>
      </PFlyoutMultilevel>
    </>
  );
};
