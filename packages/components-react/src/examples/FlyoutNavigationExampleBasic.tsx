import { useCallback, useState } from 'react';
import { PButton, PFlyoutNavigation, PFlyoutNavigationItem } from '@porsche-design-system/components-react';

export const FlyoutNavigationExampleBasicPage = (): JSX.Element => {
  const [isFlyoutNavigationOpen, setIsFlyoutNavigationOpen] = useState<boolean>(false);
  const onOpen = useCallback(() => {
    setIsFlyoutNavigationOpen(true);
  }, []);
  const onDismiss = useCallback(() => {
    setIsFlyoutNavigationOpen(false);
  }, []);

  return (
    <>
      <PButton type="button" aria={{ 'aria-haspopup': 'dialog' }} onClick={onOpen}>
        Open Flyout Navigation
      </PButton>
      <PFlyoutNavigation open={isFlyoutNavigationOpen} onDismiss={onDismiss}>
        <PFlyoutNavigationItem identifier="item-1" label="Some Label">
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
        </PFlyoutNavigationItem>
        <PFlyoutNavigationItem identifier="item-2" label="Some Label">
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
        </PFlyoutNavigationItem>
        <PFlyoutNavigationItem identifier="item-3" label="Some Label">
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
        </PFlyoutNavigationItem>
        <PFlyoutNavigationItem identifier="item-4" label="Some Label">
          <a href="#some-anchor">Some anchor</a>
        </PFlyoutNavigationItem>
        <PFlyoutNavigationItem identifier="item-5" label="Some Label">
          <a href="#some-anchor">Some anchor</a>
        </PFlyoutNavigationItem>
        <PFlyoutNavigationItem identifier="item-6" label="Some Label">
          <a href="#some-anchor">Some anchor</a>
          <a href="#some-anchor">Some anchor</a>
        </PFlyoutNavigationItem>
      </PFlyoutNavigation>
    </>
  );
};
