/* Auto Generated File */
import type { NextPage } from 'next';
import { PTabs, PTabsItem } from '@porsche-design-system/components-react/ssr';

const TabsPage: NextPage = (): JSX.Element => {
  const style = `
    @media only screen and (min-width: 760px) {
      #app,
      :host {
        display: grid;
        grid-template-columns: repeat(2, 50%);
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

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

      <div className="playground light" title="should render tabs size BreakpointCustomizable on light background">
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

      <div className="playground dark" title="should render tabs size BreakpointCustomizable on dark background">
        <PTabs
          theme="dark"
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
          <PTabsItem label="Tab 1">Tab gradientColorScheme 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab gradientColorScheme 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab gradientColorScheme 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab gradientColorScheme 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab gradientColorScheme 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab gradientColorScheme 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab gradientColorScheme 7</PTabsItem>
        </PTabs>
      </div>

      <div className="playground dark surface" title="should render tabs gradientColorScheme surface on dark background">
        <PTabs theme="dark" gradientColorScheme="surface">
          <PTabsItem label="Tab 1">Tab gradientColorScheme 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab gradientColorScheme 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab gradientColorScheme 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab gradientColorScheme 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab gradientColorScheme 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab gradientColorScheme 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab gradientColorScheme 7</PTabsItem>
        </PTabs>
      </div>

      <div className="playground light surface" title="should render tabs gradientColor surface on light background">
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

      <div className="playground dark surface" title="should render tabs gradientColor surface on dark background">
        <PTabs theme="dark" gradientColor="background-surface">
          <PTabsItem label="Tab 1">Tab gradientColor 1</PTabsItem>
          <PTabsItem label="Tab 2">Tab gradientColor 2</PTabsItem>
          <PTabsItem label="Tab 3">Tab gradientColor 3</PTabsItem>
          <PTabsItem label="Tab 4">Tab gradientColor 4</PTabsItem>
          <PTabsItem label="Tab 5">Tab gradientColor 5</PTabsItem>
          <PTabsItem label="Tab 6">Tab gradientColor 6</PTabsItem>
          <PTabsItem label="Tab 7">Tab gradientColor 7</PTabsItem>
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

      <div className="playground light" title="should render tabs with slotted and deeply nested anchor on light background">
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

      <div className="playground dark" title="should render tabs with slotted and deeply nested anchor on dark background">
        <PTabs theme="dark">
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
