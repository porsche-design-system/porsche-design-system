import React from 'react';
import { useState } from 'react';
import { PTabsBar, type TabsBarUpdateEventDetail } from '@porsche-design-system/components-react';

export const Example = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const onUpdate = (e: CustomEvent<TabsBarUpdateEventDetail>) => {
    setActiveTabIndex(e.detail.activeTabIndex);
  }

  return (
    <>
      <PTabsBar activeTabIndex={activeTabIndex} aria={{'aria-label': 'Some label for the tablist', 'aria-description': 'Some description for the tablist'}} onUpdate={onUpdate}>
        <button type="button">
          Tab One
        </button>
        <button type="button">
          Tab Two
        </button>
        <button type="button">
          Tab Three
        </button>
      </PTabsBar>
    </>
  )
}
