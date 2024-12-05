import {
  type FlyoutMultilevelUpdateEventDetail,
  PButton,
  PFlyoutMultilevel,
  PFlyoutMultilevelItem,
} from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const FlyoutMultilevelExampleActiveIdentifierPage = (): JSX.Element => {
  const [isFlyoutMultilevelOpen, setIsFlyoutMultilevelOpen] = useState<boolean>(false);
  const [flyoutMultilevelActiveIdentifier, setFlyoutMultilevelActiveIdentifier] =
    useState<FlyoutMultilevelUpdateEventDetail['activeIdentifier']>('id-2');
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
      <nav aria-label="Main">
        <PButton type="button" aria={{ 'aria-haspopup': 'dialog' }} onClick={onOpen}>
          Open Flyout Multilevel
        </PButton>
        <PFlyoutMultilevel
          open={isFlyoutMultilevelOpen}
          activeIdentifier={flyoutMultilevelActiveIdentifier}
          onDismiss={onDismiss}
          onUpdate={onUpdate}
        >
          <PFlyoutMultilevelItem identifier="id-1" label="Some Label">
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
          </PFlyoutMultilevelItem>
          <PFlyoutMultilevelItem identifier="id-2" label="Some Label">
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#" aria-current="page">
              Some anchor
            </a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
          </PFlyoutMultilevelItem>
          <PFlyoutMultilevelItem identifier="id-3" label="Some Label">
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
          </PFlyoutMultilevelItem>
          <PFlyoutMultilevelItem identifier="id-4" label="Some Label">
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
          </PFlyoutMultilevelItem>
          <PFlyoutMultilevelItem identifier="id-5" label="Some Label">
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
          </PFlyoutMultilevelItem>
        </PFlyoutMultilevel>
      </nav>
    </>
  );
};
