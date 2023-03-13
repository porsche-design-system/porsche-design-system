import { PTabsBar } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';
import type { TabsBarChangeEvent } from '@porsche-design-system/components-react';

export const TabsBarExampleBasicPage = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useState<number>();
  const onChange = useCallback((e: CustomEvent<TabsBarChangeEvent>) => {
    setTabIndex(e.detail.activeTabIndex);
  }, []);

  return (
    <PTabsBar activeTabIndex={tabIndex} onChange={onChange}>
      <button type="button">Tab One</button>
      <button type="button">Tab Two</button>
      <button type="button">Tab Three</button>
    </PTabsBar>
  );
};
