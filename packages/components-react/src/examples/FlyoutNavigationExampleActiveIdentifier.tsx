import { useCallback, useState } from 'react';
import {
  type FlyoutNavigationUpdateEvent,
  PButton,
  PFlyoutNavigation,
  PFlyoutNavigationItem,
} from '@porsche-design-system/components-react';

export const FlyoutNavigationExampleActiveIdentifierPage = (): JSX.Element => {
  const [isFlyoutNavigationOpen, setIsFlyoutNavigationOpen] = useState<boolean>(false);
  const [flyoutNavigationActiveIdentifier, setFlyoutNavigationActiveIdentifier] = useState<string>('item-2');
  const onOpen = useCallback(() => {
    setIsFlyoutNavigationOpen(true);
  }, []);
  const onDismiss = useCallback(() => {
    setIsFlyoutNavigationOpen(false);
  }, []);
  const onUpdate = useCallback(
    (e: CustomEvent<FlyoutNavigationUpdateEvent>) => setFlyoutNavigationActiveIdentifier(e.detail.activeIdentifier),
    []
  );

  return (
    <>
      <PButton type="button" aria={{ 'aria-haspopup': 'dialog' }} onClick={onOpen}>
        Open Flyout Navigation
      </PButton>
      <PFlyoutNavigation
        open={isFlyoutNavigationOpen}
        activeIdentifier={flyoutNavigationActiveIdentifier}
        onDismiss={onDismiss}
        onUpdate={onUpdate}
      >
        <PFlyoutNavigationItem identifier="item-1" label="Some Label">
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
        </PFlyoutNavigationItem>
        <PFlyoutNavigationItem identifier="item-2" label="Some Label">
          <h3>Some heading</h3>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
          <h3>Some heading</h3>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
        </PFlyoutNavigationItem>
        <PFlyoutNavigationItem identifier="item-3" label="Some Label">
          <h3>Some heading</h3>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
          <h3>Some heading</h3>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
        </PFlyoutNavigationItem>
        <PFlyoutNavigationItem identifier="item-4" label="Some Label">
          <h3>Some heading</h3>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
        </PFlyoutNavigationItem>
        <PFlyoutNavigationItem identifier="item-5" label="Some Label">
          <h3>Some heading</h3>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
        </PFlyoutNavigationItem>
      </PFlyoutNavigation>
    </>
  );
};
