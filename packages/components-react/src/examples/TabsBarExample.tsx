import {
  PTabsBar,
  PText
} from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';
import type { TabChangeEvent } from '@porsche-design-system/components-react';

export const TabsBarExamplePage = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const onTabChange = useCallback((e: CustomEvent<TabChangeEvent>) => {
    setTabIndex(e.detail.activeTabIndex);
  }, []);

  return (
    <>
      <PTabsBar activeTabIndex={tabIndex} onTabChange={onTabChange}>
        <button type="button" id="tab-item-1" aria-controls="tab-panel-1">Tab One</button>
        <button type="button" id="tab-item-2" aria-controls="tab-panel-2">Tab Two</button>
        <button type="button" id="tab-item-3" aria-controls="tab-panel-3">Tab Three</button>
      </PTabsBar>

      <style>{`
        div[role=tabpanel] {
          outline: 1px solid transparent;
          outline-offset: 1px;
          margin-top: 8px;
        }
        div[role=tabpanel]:focus {
          outline-color: black;
        }
        div[role=tabpanel]:focus:not(:focus-visible) {
          outline-color: transparent;
        }
      `}</style>
      <div id="tab-panel-1" hidden={tabIndex === 0 ? false : true} tabIndex={tabIndex === 0 ? 0 : -1} role="tabpanel" aria-labelledby="tab-item-1">
        <PText>Your content of Tab 1</PText>
      </div>
      <div id="tab-panel-2" hidden={tabIndex === 1 ? false : true} tabIndex={tabIndex === 1 ? 0 : -1} role="tabpanel" aria-labelledby="tab-item-2">
        <PText>Your content of Tab 2</PText>
      </div>
      <div id="tab-panel-3" hidden={tabIndex === 2 ? false : true} tabIndex={tabIndex === 2 ? 0 : -1} role="tabpanel" aria-labelledby="tab-item-3">
        <PText>Your content of Tab 3</PText>
      </div>
    </>
  );
};
