import { PTabsBar, type TabsBarUpdateEventDetail } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const TabsBarExampleBasicPage = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const onUpdate = useCallback((e: CustomEvent<TabsBarUpdateEventDetail>) => {
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
