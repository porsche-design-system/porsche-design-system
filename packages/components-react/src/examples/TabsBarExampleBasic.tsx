import { PTabsBar } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';
import type { TabsBarUpdateEvent } from '@porsche-design-system/components-react';

export const TabsBarExampleBasicPage = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const onUpdate = useCallback((e: CustomEvent<TabsBarUpdateEvent>) => {
    setTabIndex(e.detail.activeTabIndex);
  }, []);

  return (
    <PTabsBar activeTabIndex={tabIndex} onUpdate={onUpdate}>
      <button type="button">Tab One</button>
      <button type="button">Tab Two</button>
      <button type="button">Tab Three</button>
    </PTabsBar>
  );
};
