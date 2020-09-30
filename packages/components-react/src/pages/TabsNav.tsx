import { PTabsNav as TabsNav } from '@porsche-design-system/components-react';
import React from 'react';

export const TabsNavNavPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render tabsNav on light background">
        <TabsNav>
          <a>Tab 1</a>
          <a>Tab 2</a>
          <a>Tab 3</a>
          <a>Tab 4</a>
          <a>Tab 5</a>
          <a>Tab 6</a>
          <a>Tab 7</a>
        </TabsNav>
      </div>

      <div className="playground dark" title="should render tabsNav on dark background">
        <TabsNav theme="dark">
          <a>Tab 1</a>
          <a>Tab 2</a>
          <a>Tab 3</a>
          <a>Tab 4</a>
          <a>Tab 5</a>
          <a>Tab 6</a>
          <a>Tab 7</a>
        </TabsNav>
      </div>

      <div className="playground light" title="should render tabsNav with last tab selected on light background">
        <TabsNav activeTabIndex={6}>
          <a>Tab 1</a>
          <a>Tab 2</a>
          <a>Tab 3</a>
          <a>Tab 4</a>
          <a>Tab 5</a>
          <a>Tab 6</a>
          <a>Tab 7</a>
        </TabsNav>
      </div>

      <div className="playground dark" title="should render tabsNav with last tab selected on dark background">
        <TabsNav activeTabIndex={6} theme="dark">
          <a>Tab 1</a>
          <a>Tab 2</a>
          <a>Tab 3</a>
          <a>Tab 4</a>
          <a>Tab 5</a>
          <a>Tab 6</a>
          <a>Tab 7</a>
        </TabsNav>
      </div>

      <div className="playground light" title="should render tabsNav size medium on light background">
        <TabsNav size="medium">
          <a>Tab 1</a>
          <a>Tab 2</a>
          <a>Tab 3</a>
          <a>Tab 4</a>
          <a>Tab 5</a>
          <a>Tab 6</a>
          <a>Tab 7</a>
        </TabsNav>
      </div>

      <div className="playground dark" title="should render tabsNav size medium on dark background">
        <TabsNav theme="dark" size="medium">
          <a>Tab 1</a>
          <a>Tab 2</a>
          <a>Tab 3</a>
          <a>Tab 4</a>
          <a>Tab 5</a>
          <a>Tab 6</a>
          <a>Tab 7</a>
        </TabsNav>
      </div>

      <div
        className="playground light"
        title="should render tabsNav size medium with last tab selected on light background"
      >
        <TabsNav activeTabIndex={6} size="medium">
          <a>Tab 1</a>
          <a>Tab 2</a>
          <a>Tab 3</a>
          <a>Tab 4</a>
          <a>Tab 5</a>
          <a>Tab 6</a>
          <a>Tab 7</a>
        </TabsNav>
      </div>

      <div
        className="playground dark"
        title="should render tabsNav size medium with last tab selected on dark background"
      >
        <TabsNav activeTabIndex={6} theme="dark" size="medium">
          <a>Tab 1</a>
          <a>Tab 2</a>
          <a>Tab 3</a>
          <a>Tab 4</a>
          <a>Tab 5</a>
          <a>Tab 6</a>
          <a>Tab 7</a>
        </TabsNav>
      </div>

      <div className="playground light" title="should render tabsNav semibold on light background">
        <TabsNav weight="semibold">
          <a>Tab 1</a>
          <a>Tab 2</a>
          <a>Tab 3</a>
          <a>Tab 4</a>
          <a>Tab 5</a>
          <a>Tab 6</a>
          <a>Tab 7</a>
        </TabsNav>
      </div>

      <div className="playground dark" title="should render tabsNav semibold on dark background">
        <TabsNav theme="dark" weight="semibold">
          <a>Tab 1</a>
          <a>Tab 2</a>
          <a>Tab 3</a>
          <a>Tab 4</a>
          <a>Tab 5</a>
          <a>Tab 6</a>
          <a>Tab 7</a>
        </TabsNav>
      </div>

      <div className="playground light" title="should render tabsNav semibold and medium on light background">
        <TabsNav weight="semibold" size="medium">
          <a>Tab 1</a>
          <a>Tab 2</a>
          <a>Tab 3</a>
          <a>Tab 4</a>
          <a>Tab 5</a>
          <a>Tab 6</a>
          <a>Tab 7</a>
        </TabsNav>
      </div>

      <div className="playground dark" title="should render tabsNav semibold and medium on dark background">
        <TabsNav theme="dark" weight="semibold" size="medium">
          <a>Tab 1</a>
          <a>Tab 2</a>
          <a>Tab 3</a>
          <a>Tab 4</a>
          <a>Tab 5</a>
          <a>Tab 6</a>
          <a>Tab 7</a>
        </TabsNav>
      </div>

      <div className="playground light" title="should render tabsNav gradientColorScheme surface on light background">
        <TabsNav gradient-color-scheme="surface">
          <a>Tab 1</a>
          <a>Tab 2</a>
          <a>Tab 3</a>
          <a>Tab 4</a>
          <a>Tab 5</a>
          <a>Tab 6</a>
          <a>Tab 7</a>
        </TabsNav>
      </div>

      <div className="playground dark" title="should render tabsNav gradientColorScheme surface on dark background">
        <TabsNav theme="dark" gradient-color-scheme="surface">
          <a>Tab 1</a>
          <a>Tab 2</a>
          <a>Tab 3</a>
          <a>Tab 4</a>
          <a>Tab 5</a>
          <a>Tab 6</a>
          <a>Tab 7</a>
        </TabsNav>
      </div>

      <div className="playground light" title="should render selected tab in viewport on light background">
        <TabsNav activeTabIndex={3}>
          <a>Tab 1</a>
          <a>Tab 2</a>
          <a>Tab 3</a>
          <a>Tab 4</a>
          <a>Tab 5</a>
          <a>Tab 6</a>
          <a>Tab 7</a>
          <a>Tab 8</a>
          <a>Tab 9</a>
          <a>Tab 10</a>
        </TabsNav>
      </div>

      <div className="playground dark" title="should render selected tab in viewport in viewport on dark background">
        <TabsNav activeTabIndex={3} theme="dark">
          <a>Tab 1</a>
          <a>Tab 2</a>
          <a>Tab 3</a>
          <a>Tab 4</a>
          <a>Tab 5</a>
          <a>Tab 6</a>
          <a>Tab 7</a>
          <a>Tab 8</a>
          <a>Tab 9</a>
          <a>Tab 10</a>
        </TabsNav>
      </div>
    </>
  );
};
