/* Auto Generated File */
import type { NextPage } from 'next';
import { PTabsBar } from '@porsche-design-system/components-react/ssr';

const TabsBarPage: NextPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render tabs-bar">
        <PTabsBar activeTabIndex={0}>
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </PTabsBar>
      </div>

      <div className="playground light" title="should render tabs-bar with last tab selected">
        <PTabsBar activeTabIndex={6}>
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </PTabsBar>
      </div>

      <div className="playground light" title="should render tabs-bar size medium">
        <PTabsBar activeTabIndex={0} size="medium">
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </PTabsBar>
      </div>

      <div className="playground light" title="should render tabs-bar size medium with last tab selected">
        <PTabsBar activeTabIndex={6} size="medium">
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </PTabsBar>
      </div>

      <div className="playground light" title="should render tabs-bar size BreakpointCustomizable">
        <PTabsBar
          activeTabIndex={9}
          size={{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }}
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

      <div className="playground light" title="should render tabs-bar semibold">
        <PTabsBar activeTabIndex={0} weight="semibold">
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </PTabsBar>
      </div>

      <div className="playground light" title="should render tabs-bar semibold and medium">
        <PTabsBar activeTabIndex={0} weight="semibold" size="medium">
          <a href="#">Tab 1</a>
          <a href="#">Tab 2</a>
          <a href="#">Tab 3</a>
          <a href="#">Tab 4</a>
          <a href="#">Tab 5</a>
          <a href="#">Tab 6</a>
          <a href="#">Tab 7</a>
        </PTabsBar>
      </div>

      <div className="playground light surface" title="should render tabs-bar gradientColorScheme surface">
        <PTabsBar activeTabIndex={0} gradientColorScheme="surface">
          <a href="#">Tab gradientColorScheme 1</a>
          <a href="#">Tab gradientColorScheme 2</a>
          <a href="#">Tab gradientColorScheme 3</a>
          <a href="#">Tab gradientColorScheme 4</a>
          <a href="#">Tab gradientColorScheme 5</a>
          <a href="#">Tab gradientColorScheme 6</a>
          <a href="#">Tab gradientColorScheme 7</a>
        </PTabsBar>
      </div>

      <div className="playground light surface" title="should render tabs-bar gradientColor surface">
        <PTabsBar activeTabIndex={0} gradientColor="background-surface">
          <a href="#">Tab gradientColor 1</a>
          <a href="#">Tab gradientColor 2</a>
          <a href="#">Tab gradientColor 3</a>
          <a href="#">Tab gradientColor 4</a>
          <a href="#">Tab gradientColor 5</a>
          <a href="#">Tab gradientColor 6</a>
          <a href="#">Tab gradientColor 7</a>
        </PTabsBar>
      </div>

      <div className="playground light" title="should render selected tab in viewport">
        <PTabsBar activeTabIndex={3}>
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
        </PTabsBar>
      </div>

      <div className="playground light" title="should render no selected tab when active-tab-index is not set">
        <PTabsBar>
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
        </PTabsBar>
      </div>

      <div className="playground light" style={{ padding: '0 50px' }} title="should render tabs-bar with parent padding">
        <PTabsBar activeTabIndex={0}>
          <a href="#">Parent padding 1</a>
          <a href="#">Parent padding 2</a>
          <a href="#">Parent padding 3</a>
          <a href="#">Parent padding 4</a>
          <a href="#">Parent padding 5</a>
          <a href="#">Parent padding 6</a>
          <a href="#">Parent padding 7</a>
          <a href="#">Parent padding 8</a>
          <a href="#">Parent padding 9</a>
          <a href="#">Parent padding 10</a>
        </PTabsBar>
      </div>
    </>
  );
};

export default TabsBarPage;
