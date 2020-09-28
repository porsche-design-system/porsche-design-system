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
      </Tabs>
    </div>
{/*
    <div className="playground dark" title="should render tabs on dark background">
      <Tabs theme="dark">
        <TabsItem label="Tab 1">
          <div style={{color: "white"}}>Tab Content 1</div>
        </TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
      </Tabs>
    </div>

    <div className="playground light" title="should render tabs size medium on light background">
      <Tabs size="medium">
        <TabsItem label="Tab 1">Tab Content 1</TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
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
      </Tabs>
    </div>

    <div className="playground light" title="should render tabs semibold on light background">
      <Tabs weight="semibold">
        <TabsItem label="Tab 1">Tab Content 1</TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
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
      </Tabs>
    </div>

    <div className="playground light" title="should render tabs semibold and medium on light background">
      <Tabs weight="semibold" size="medium">
        <TabsItem label="Tab 1">Tab Content 1</TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
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
      </Tabs>
    </div>

    <div className="playground light" title="should render tabs colorScheme surface on light background"
         style={{width: "200px"}}>
      <Tabs color-scheme="surface">
        <TabsItem label="Tab 1">Tab Content 1</TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
      </Tabs>
    </div>

    <div className="playground dark" title="should render tabs colorScheme surface on dark background"
         style={{width: "200px"}}>
      <Tabs theme="dark" color-scheme="surface">
        <TabsItem label="Tab 1">
          <div style={{color: "white"}}>Tab Content 1</div>
        </TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
      </Tabs>
    </div>

    <div className="playground light"
         title="should render tabs with arrow right on smaller viewport on light background" style={{width: "200px"}}>
      <Tabs>
        <TabsItem label="Tab 1">Tab Content 1</TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
      </Tabs>
    </div>

    <div className="playground dark" title="should render tabs with arrow right on smaller viewport on dark background"
         style={{width: "200px"}}>
      <Tabs theme="dark">
        <TabsItem label="Tab 1">
          <div style={{color: "white"}}>Tab Content 1</div>
        </TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem label="Tab 6">Tab Content 6</TabsItem>
      </Tabs>
    </div>

    <div className="playground light" title="should render tabs with arrow left on smaller viewport on light background"
         style={{width: "200px"}}>
      <Tabs>
        <TabsItem label="Tab 1">Tab Content 1</TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem selected={true} label="Tab 6">Tab Content 6</TabsItem>
      </Tabs>
    </div>

    <div className="playground dark" title="should render tabs with arrow left on smaller viewport on dark background"
         style={{width: "200px"}}>
      <Tabs theme="dark">
        <TabsItem label="Tab 1">Tab Content 1</TabsItem>
        <TabsItem label="Tab 2">Tab Content 2</TabsItem>
        <TabsItem label="Tab 3">Tab Content 3</TabsItem>
        <TabsItem label="Tab 4">Tab Content 4</TabsItem>
        <TabsItem label="Tab 5">Tab Content 5</TabsItem>
        <TabsItem selected={true} label="Tab 6">
          <div style={{color: "white"}}>Tab Content 6</div>
        </TabsItem>
      </Tabs>
    </div>

    <div className="playground light" title="should render selected=true tab in viewport on light background"
         style={{width: "200px"}}>
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

    <div className="playground dark" title="should render selected=true tab in viewport in viewport on dark background"
         style={{width: "200px"}}>
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
    </div>*/}
  </>;
};
