import { PTabsBar as TabsBar } from '@porsche-design-system/components-react';
import React from 'react';

export const TabsBarNavPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render tabsNav on light background">
        <TabsBar>
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </TabsBar>
      </div>

      <div className="playground dark" title="should render tabsNav on dark background">
        <TabsBar theme="dark">
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </TabsBar>
      </div>

      <div className="playground light" title="should render tabsNav with last tab selected on light background">
        <TabsBar activeTabIndex={6}>
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </TabsBar>
      </div>

      <div className="playground dark" title="should render tabsNav with last tab selected on dark background">
        <TabsBar activeTabIndex={6} theme="dark">
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </TabsBar>
      </div>

      <div className="playground light" title="should render tabsNav size medium on light background">
        <TabsBar size="medium">
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </TabsBar>
      </div>

      <div className="playground dark" title="should render tabsNav size medium on dark background">
        <TabsBar theme="dark" size="medium">
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </TabsBar>
      </div>

      <div
        className="playground light"
        title="should render tabsNav size medium with last tab selected on light background"
      >
        <TabsBar activeTabIndex={6} size="medium">
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </TabsBar>
      </div>

      <div
        className="playground dark"
        title="should render tabsNav size medium with last tab selected on dark background"
      >
        <TabsBar activeTabIndex={6} theme="dark" size="medium">
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </TabsBar>
      </div>

      <div className="playground light" title="should render tabsNav semibold on light background">
        <TabsBar weight="semibold">
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </TabsBar>
      </div>

      <div className="playground dark" title="should render tabsNav semibold on dark background">
        <TabsBar theme="dark" weight="semibold">
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </TabsBar>
      </div>

      <div className="playground light" title="should render tabsNav semibold and medium on light background">
        <TabsBar weight="semibold" size="medium">
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </TabsBar>
      </div>

      <div className="playground dark" title="should render tabsNav semibold and medium on dark background">
        <TabsBar theme="dark" weight="semibold" size="medium">
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </TabsBar>
      </div>

      <div className="playground light" title="should render tabsNav gradientColorScheme surface on light background">
        <TabsBar gradient-color-scheme="surface">
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </TabsBar>
      </div>

      <div className="playground dark" title="should render tabsNav gradientColorScheme surface on dark background">
        <TabsBar theme="dark" gradient-color-scheme="surface">
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </TabsBar>
      </div>

      <div className="playground light" title="should render selected tab in viewport on light background">
        <TabsBar activeTabIndex={3}>
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
          <a href="#">Tab 8</a>
          <a href="#">Tab 9</a>
          <a href="#">Tab 10</a>
        </TabsBar>
      </div>

      <div className="playground dark" title="should render selected tab in viewport in viewport on dark background">
        <TabsBar activeTabIndex={3} theme="dark">
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
          <a href="#">Tab 8</a>
          <a href="#">Tab 9</a>
          <a href="#">Tab 10</a>
        </TabsBar>
      </div>
    </>
  );
};
