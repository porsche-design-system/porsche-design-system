import { PTabs as Tabs, PTabsItem as TabsItem } from '@porsche-design-system/components-react';
import React from 'react';

export const TabsPage = (): JSX.Element => {
  return <>
    <div className="playground light" title="should render tabs on light background">
      <Tabs>
        <TabsItem label="Tab 1">Tab Content 1</TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
        <TabsItem label="Tab 7">Tab Content 7</TabsItem>
      </Tabs>
    </div>

    <div className="playground dark" title="should render tabs on dark background">
      <Tabs theme="dark">
        <TabsItem label="Tab 1">
          <div style={{color: "white"}}>Tab Content 1</div>
        </TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
        <TabsItem label="Tab 7">Tab Content 7</TabsItem>
      </Tabs>
    </div>

    <div className="playground light" title="should render tabs with last tab selected on light background">
      <Tabs>
        <TabsItem label="Tab 1">Tab Content 1</TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
        <TabsItem selected={true} label="Tab 7">Tab Content 7</TabsItem>
      </Tabs>
    </div>

    <div className="playground dark" title="should render tabs with last tab selected on dark background">
      <Tabs theme="dark">
        <TabsItem label="Tab 1">Tab Content 1</TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
        <TabsItem selected={true} label="Tab 7">
          <div style={{color: "white"}}>Tab Content 7</div>
        </TabsItem>
      </Tabs>
    </div>

    <div className="playground light" title="should render tabs size medium on light background">
      <Tabs size="medium">
        <TabsItem label="Tab 1">Tab Content 1</TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
        <TabsItem label="Tab 7">Tab Content 7</TabsItem>
      </Tabs>
    </div>

    <div className="playground dark" title="should render tabs size medium on dark background">
      <Tabs theme="dark" size="medium">
        <TabsItem label="Tab 1">
          <div style={{color: "white"}}>Tab Content 1</div>
        </TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
        <TabsItem label="Tab 7">Tab Content 7</TabsItem>
      </Tabs>
    </div>

    <div className="playground light" title="should render tabs size medium with last tab selected on light background">
      <Tabs size="medium">
        <TabsItem label="Tab 1">Tab Content 1</TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
        <TabsItem selected={true} label="Tab 7">Tab Content 7</TabsItem>
      </Tabs>
    </div>

    <div className="playground dark" title="should render tabs size medium with last tab selected on dark background">
      <Tabs theme="dark" size="medium">
        <TabsItem label="Tab 1">Tab Content 1</TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
        <TabsItem selected={true} label="Tab 7">
          <div style={{color: "white"}}>Tab Content 7</div>
        </TabsItem>
      </Tabs>
    </div>

    <div className="playground light" title="should render tabs semibold on light background">
      <Tabs weight="semibold">
        <TabsItem label="Tab 1">Tab Content 1</TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
        <TabsItem label="Tab 7">Tab Content 7</TabsItem>
      </Tabs>
    </div>

    <div className="playground dark" title="should render tabs semibold on dark background">
      <Tabs theme="dark" weight="semibold">
        <TabsItem label="Tab 1">
          <div style={{color: "white"}}>Tab Content 1</div>
        </TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
        <TabsItem label="Tab 7">Tab Content 7</TabsItem>
      </Tabs>
    </div>

    <div className="playground light" title="should render tabs semibold and medium on light background">
      <Tabs weight="semibold" size="medium">
        <TabsItem label="Tab 1">Tab Content 1</TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
        <TabsItem label="Tab 7">Tab Content 7</TabsItem>
      </Tabs>
    </div>

    <div className="playground dark" title="should render tabs semibold and medium on dark background">
      <Tabs theme="dark" weight="semibold" size="medium">
        <TabsItem label="Tab 1">
          <div style={{color: "white"}}>Tab Content 1</div>
        </TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
        <TabsItem label="Tab 7">Tab Content 7</TabsItem>
      </Tabs>
    </div>

    <div className="playground light" title="should render tabs gradientColorScheme surface on light background">
      <Tabs gradient-color-scheme="surface">
        <TabsItem label="Tab 1">Tab Content 1</TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
        <TabsItem label="Tab 7">Tab Content 7</TabsItem>
      </Tabs>
    </div>

    <div className="playground dark" title="should render tabs gradientColorScheme surface on dark background">
      <Tabs theme="dark" gradient-color-scheme="surface">
        <TabsItem label="Tab 1">
          <div style={{color: "white"}}>Tab Content 1</div>
        </TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
        <TabsItem label="Tab 7">Tab Content 7</TabsItem>
      </Tabs>
    </div>

    <div className="playground light" title="should render selected tab in viewport on light background">
      <Tabs>
        <TabsItem label="Tab 1">Tab Content 1</TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem selected={true} label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
        <TabsItem label="Tab 7">Tab Content 7</TabsItem>
        <TabsItem label="Tab 8">Tab Content 8</TabsItem>
        <TabsItem label="Tab 9">Tab Content 9</TabsItem>
        <TabsItem label="Tab 10">Tab Content 10</TabsItem>
      </Tabs>
    </div>

    <div className="playground dark" title="should render selected tab in viewport in viewport on dark background">
      <Tabs theme="dark">
        <TabsItem label="Tab 1">Tab Content 1</TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem selected={true} label="Tab 4">
          <div style={{color: "white"}}>Tab Content 4</div>
        </TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
        <TabsItem label="Tab 7">Tab Content 7</TabsItem>
        <TabsItem label="Tab 8">Tab Content 8</TabsItem>
        <TabsItem label="Tab 9">Tab Content 9</TabsItem>
        <TabsItem label="Tab 10">Tab Content 10</TabsItem>
      </Tabs>
    </div>

  </>;
};
