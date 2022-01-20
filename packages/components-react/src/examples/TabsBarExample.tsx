import { PTabsBar, PText } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';
import type { TabChangeEvent } from '@porsche-design-system/components-react';

export const TabsBarExamplePage = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const onTabChange = useCallback((e: CustomEvent<TabChangeEvent>) => {
    setTabIndex(e.detail.activeTabIndex);
  }, []);

  const tabPanels: string[] = ['One', 'Two', 'Three'];

  return (
    <>
      <style>{`
        div[role=tabpanel] {
          outline: 1px solid transparent;
          outline-offset: 2px;
          margin-top: 8px;
        }
        div[role=tabpanel]:focus {
          outline-color: #000;
        }
        div[role=tabpanel]:focus:not(:focus-visible) {
          outline-color: transparent;
        }
      `}</style>
      <PTabsBar activeTabIndex={tabIndex} onTabChange={onTabChange}>
        {tabPanels.map((tabPanel, i) => (
          <button type="button" id={`tab-item-${i}`} aria-controls={`tab-panel-${i}`}>
            Tab {tabPanel}
          </button>
        ))}
      </PTabsBar>

      {tabPanels.map((content, i) => (
        <div
          role="tabpanel"
          id={`tab-panel-${i}`}
          hidden={tabIndex !== i}
          tabIndex={tabIndex === i ? 0 : -1}
          aria-labelledby={`tab-item-${i}`}
        >
          <PText>Your content of Tab {i + 1}</PText>
        </div>
      ))}
    </>
  );
};
