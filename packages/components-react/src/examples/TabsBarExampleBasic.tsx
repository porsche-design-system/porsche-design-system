import { PTabsBar } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';
import type { TabsBarChangeEvent } from '@porsche-design-system/components-react';

export const TabsBarExampleBasicPage = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useState<number>();
  const onUpdate = useCallback((e: CustomEvent<TabsBarChangeEvent>) => {
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
