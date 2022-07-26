/* Auto Generated File */
import { PTabs, PTabsBar, PTabsItem } from '@porsche-design-system/components-react';

export const TabsPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render tabs on light background">
        <PTabs>
          <PTabsItem label="Tab 1">Tab Content 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab Content 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab Content 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab Content 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab Content 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab Content 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab Content 7</PTabsItem>
        </PTabs>
      </div>

      <div className="playground dark" title="should render tabs on dark background">
        <PTabs theme="dark">
          <PTabsItem label="Tab 1">Tab Content 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab Content 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab Content 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab Content 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab Content 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab Content 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab Content 7</PTabsItem>
        </PTabs>
      </div>

      <div className="playground light" title="should render tabs with last tab selected on light background">
        <PTabs activeTabIndex={6}>
          <PTabsItem label="Tab 1">Tab Content 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab Content 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab Content 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab Content 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab Content 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab Content 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab Content 7</PTabsItem>
        </PTabs>
      </div>

      <div className="playground dark" title="should render tabs with last tab selected on dark background">
        <PTabs activeTabIndex={6} theme="dark">
          <PTabsItem label="Tab 1">Tab Content 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab Content 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab Content 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab Content 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab Content 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab Content 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab Content 7</PTabsItem>
        </PTabs>
      </div>

      <div className="playground light" title="should render tabs size medium on light background">
        <PTabs size="medium">
          <PTabsItem label="Tab 1">Tab Content 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab Content 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab Content 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab Content 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab Content 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab Content 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab Content 7</PTabsItem>
        </PTabs>
      </div>

      <div className="playground dark" title="should render tabs size medium on dark background">
        <PTabs theme="dark" size="medium">
          <PTabsItem label="Tab 1">Tab Content 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab Content 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab Content 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab Content 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab Content 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab Content 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab Content 7</PTabsItem>
        </PTabs>
      </div>

      <div className="playground light" title="should render tabs size medium with last tab selected on light background">
        <PTabs activeTabIndex={6} size="medium">
          <PTabsItem label="Tab 1">Tab Content 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab Content 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab Content 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab Content 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab Content 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab Content 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab Content 7</PTabsItem>
        </PTabs>
      </div>

      <div className="playground dark" title="should render tabs size medium with last tab selected on dark background">
        <PTabs activeTabIndex={6} theme="dark" size="medium">
          <PTabsItem label="Tab 1">Tab Content 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab Content 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab Content 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab Content 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab Content 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab Content 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab Content 7</PTabsItem>
        </PTabs>
      </div>

      <div className="playground light" title="should render tabs-bar size BreakpointCustomizable on light background">
        <PTabsBar
          activeTabIndex={9}
          size={{ base: 'small', xs: 'small', s: 'medium', m: 'small', l: 'medium', xl: 'small' }}
        >
          <button type="button">Tab One</button>
          <button type="button">Tab Two</button>
          <button type="button">Tab Three</button>
          <button type="button">Tab Four</button>
          <button type="button">Tab Five</button>
          <button type="button">Tab Six</button>
          <button type="button">Tab Seven</button>
          <button type="button">Tab Eight</button>
          <button type="button">Tab Nine</button>
          <button type="button">Tab Ten</button>
          <button type="button">Tab Eleven</button>
          <button type="button">Tab Twelve</button>
          <button type="button">Tab Thirteen</button>
          <button type="button">Tab Fourteen</button>
          <button type="button">Tab Fifteen</button>
          <button type="button">Tab Sixteen</button>
          <button type="button">Tab Seventeen</button>
          <button type="button">Tab Eighteen</button>
          <button type="button">Tab Nineteen</button>
          <button type="button">Tab Twenty</button>
        </PTabsBar>
      </div>
c

      <div className="playground light" title="should render tabs semibold on light background">
        <PTabs weight="semibold">
          <PTabsItem label="Tab 1">Tab Content 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab Content 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab Content 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab Content 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab Content 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab Content 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab Content 7</PTabsItem>
        </PTabs>
      </div>

      <div className="playground dark" title="should render tabs semibold on dark background">
        <PTabs theme="dark" weight="semibold">
          <PTabsItem label="Tab 1">Tab Content 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab Content 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab Content 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab Content 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab Content 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab Content 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab Content 7</PTabsItem>
        </PTabs>
      </div>

      <div className="playground light" title="should render tabs semibold and medium on light background">
        <PTabs weight="semibold" size="medium">
          <PTabsItem label="Tab 1">Tab Content 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab Content 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab Content 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab Content 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab Content 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab Content 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab Content 7</PTabsItem>
        </PTabs>
      </div>

      <div className="playground dark" title="should render tabs semibold and medium on dark background">
        <PTabs theme="dark" weight="semibold" size="medium">
          <PTabsItem label="Tab 1">Tab Content 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab Content 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab Content 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab Content 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab Content 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab Content 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab Content 7</PTabsItem>
        </PTabs>
      </div>

      <div className="playground light surface" title="should render tabs gradientColorScheme surface on light background">
        <PTabs gradientColorScheme="surface">
          <PTabsItem label="Tab 1">Tab Content 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab Content 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab Content 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab Content 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab Content 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab Content 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab Content 7</PTabsItem>
        </PTabs>
      </div>

      <div className="playground dark surface" title="should render tabs gradientColorScheme surface on dark background">
        <PTabs theme="dark" gradientColorScheme="surface">
          <PTabsItem label="Tab 1">Tab Content 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab Content 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab Content 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab Content 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab Content 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab Content 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab Content 7</PTabsItem>
        </PTabs>
      </div>

      <div className="playground light" title="should render selected tab in viewport on light background">
        <PTabs activeTabIndex={3}>
          <PTabsItem label="Tab 1">Tab Content 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab Content 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab Content 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab Content 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab Content 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab Content 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab Content 7</PTabsItem>
          <PTabsItem label="Tab 8">Tab Content 8</PTabsItem>
          <PTabsItem label="Tab 9">Tab Content 9</PTabsItem>
          <PTabsItem label="Tab 10">Tab Content 10</PTabsItem>
        </PTabs>
      </div>

      <div className="playground dark" title="should render selected tab in viewport in viewport on dark background">
        <PTabs activeTabIndex={3} theme="dark">
          <PTabsItem label="Tab 1">Tab Content 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab Content 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab Content 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab Content 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab Content 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab Content 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab Content 7</PTabsItem>
          <PTabsItem label="Tab 8">Tab Content 8</PTabsItem>
          <PTabsItem label="Tab 9">Tab Content 9</PTabsItem>
          <PTabsItem label="Tab 10">Tab Content 10</PTabsItem>
        </PTabs>
      </div>
    </>
  );
};
