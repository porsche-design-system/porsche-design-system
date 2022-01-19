import { PTabsBar, PText } from '@porsche-design-system/components-react';
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
        {['One', 'Two', 'Three'].map((tabPanel, idx) => (
          <button type="button" id={`tab-item-${idx + 1}`} aria-controls={`tab-panel-${idx + 1}`}>
            Tab {tabPanel}
          </button>
        ))}
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

      {[0, 1, 2].map((idx) => (
        <div
          role="tabpanel"
          id={`tab-panel-${idx + 1}`}
          hidden={tabIndex !== idx}
          tabIndex={tabIndex === idx ? 0 : -1}
          aria-labelledby={`tab-item-${idx + 1}`}
        >
          <PText>Your content of Tab {idx + 1}</PText>
        </div>
      ))}
    </>
  );
};
