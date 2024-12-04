import {
  type FlyoutMultilevelUpdateEventDetail,
  PButton,
  PFlyoutMultilevel,
  PFlyoutMultilevelItem,
} from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const FlyoutMultilevelExamplePage = (): JSX.Element => {
  const [isFlyoutMultilevelOpen, setIsFlyoutMultilevelOpen] = useState<boolean>(false);
  const [flyoutMultilevelActiveIdentifier, setFlyoutMultilevelActiveIdentifier] =
    useState<FlyoutMultilevelUpdateEventDetail['activeIdentifier']>(undefined);
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
          <h3>Some heading</h3>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
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
      </PFlyoutMultilevel>
    </>
  );
};
