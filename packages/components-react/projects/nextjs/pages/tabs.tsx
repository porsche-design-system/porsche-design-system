/* Auto Generated File */
import type { NextPage } from 'next';
import { PTabs, PTabsItem } from '@porsche-design-system/components-react/ssr';

const TabsPage: NextPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render tabs">
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

      <div className="playground light" title="should render tabs with last tab selected">
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

      <div className="playground light" title="should render tabs size medium">
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

      <div className="playground light" title="should render tabs size medium with last tab selected">
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

      <div className="playground light" title="should render tabs size BreakpointCustomizable">
        <PTabs
          activeTabIndex={9}
          size={{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }}
        >
          <PTabsItem label="Tab One">Tab Content 1</PTabsItem>
          <PTabsItem label="Tab Two">Tab Content 2</PTabsItem>
          <PTabsItem label="Tab Three">Tab Content 3</PTabsItem>
          <PTabsItem label="Tab Four">Tab Content 4</PTabsItem>
          <PTabsItem label="Tab Five">Tab Content 5</PTabsItem>
          <PTabsItem label="Tab Six">Tab Content 6</PTabsItem>
          <PTabsItem label="Tab Seven">Tab Content 7</PTabsItem>
          <PTabsItem label="Tab Eight">Tab Content 8</PTabsItem>
          <PTabsItem label="Tab Nine">Tab Content 9</PTabsItem>
          <PTabsItem label="Tab Ten">Tab Content 10</PTabsItem>
          <PTabsItem label="Tab Eleven">Tab Content 11</PTabsItem>
          <PTabsItem label="Tab Twelve">Tab Content 12</PTabsItem>
          <PTabsItem label="Tab Thirteen">Tab Content 13</PTabsItem>
          <PTabsItem label="Tab Fourteen">Tab Content 14</PTabsItem>
          <PTabsItem label="Tab Fifteen">Tab Content 15</PTabsItem>
          <PTabsItem label="Tab Sixteen">Tab Content 16</PTabsItem>
          <PTabsItem label="Tab Seventeen">Tab Content 17</PTabsItem>
          <PTabsItem label="Tab Eighteen">Tab Content 18</PTabsItem>
          <PTabsItem label="Tab Nineteen">Tab Content 19</PTabsItem>
          <PTabsItem label="Tab Twenty">Tab Content 20</PTabsItem>
        </PTabs>
      </div>

      <div className="playground light" title="should render tabs semibold">
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

      <div className="playground light" title="should render tabs semibold and medium">
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

      <div className="playground light surface" title="should render tabs gradientColorScheme surface">
        <PTabs gradientColorScheme="surface">
          <PTabsItem label="Tab 1">Tab gradientColorScheme 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab gradientColorScheme 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab gradientColorScheme 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab gradientColorScheme 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab gradientColorScheme 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab gradientColorScheme 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab gradientColorScheme 7</PTabsItem>
        </PTabs>
      </div>

      <div className="playground light surface" title="should render tabs gradientColor surface">
        <PTabs gradientColor="background-surface">
          <PTabsItem label="Tab 1">Tab gradientColor 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab gradientColor 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab gradientColor 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab gradientColor 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab gradientColor 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab gradientColor 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab gradientColor 7</PTabsItem>
        </PTabs>
      </div>

      <div className="playground light" title="should render selected tab in viewport">
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

      <div className="playground light" title="should render tabs with slotted and deeply nested anchor">
        <PTabs>
          <PTabsItem label="Tab 1">
            <span>
              Some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
              {' '}<em>emphasized</em> and <i>italic</i> text.
            </span>
          </PTabsItem>
          <PTabsItem label="Tab 2" />
          <PTabsItem label="Tab 3" />
          <PTabsItem label="Tab 4" />
          <PTabsItem label="Tab 5" />
          <PTabsItem label="Tab 6" />
          <PTabsItem label="Tab 7" />
        </PTabs>
      </div>
    </>
  );
};

export default TabsPage;
