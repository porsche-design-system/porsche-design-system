import { PTabsBar } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';
import type { TabChangeEvent } from '@porsche-design-system/components-react';

export const TabsBarExampleBasicPage = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useState<number>();
  const onTabChange = useCallback((e: CustomEvent<TabChangeEvent>) => {
    setTabIndex(e.detail.activeTabIndex);
  }, []);

  return (
    <PTabsBar activeTabIndex={tabIndex} onTabChange={onTabChange}>
      <button type="button">Tab One</button>
      <button type="button">Tab Two</button>
      <button type="button">Tab Three</button>
    </PTabsBar>
  );
};
