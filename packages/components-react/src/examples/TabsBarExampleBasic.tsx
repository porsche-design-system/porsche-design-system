import { PTabsBar, type PTabsBarUpdateEvent } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const TabsBarExampleBasicPage = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const onUpdate = useCallback((e: PTabsBarUpdateEvent) => {
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
