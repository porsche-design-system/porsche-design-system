import { PTabsBar as TabsBar } from '@porsche-design-system/components-react';

export const TabsBarPage = (): JSX.Element => {
  const renderTabs = (amount: number) =>
    Array.from(Array(amount)).map((_, i) => (
      <a key={i} href="#x">
        Tab {i + 1}
      </a>
    ));

  return (
    <>
      <div className="playground light" title="should render tabs-bar on light background">
        <TabsBar>{renderTabs(7)}</TabsBar>
      </div>

      <div className="playground dark" title="should render tabs-bar on dark background">
        <TabsBar theme="dark">{renderTabs(7)}</TabsBar>
      </div>

      <div className="playground light" title="should render tabs-bar with last tab selected on light background">
        <TabsBar activeTabIndex={6}>{renderTabs(7)}</TabsBar>
      </div>

      <div className="playground dark" title="should render tabs-bar with last tab selected on dark background">
        <TabsBar activeTabIndex={6} theme="dark">
          {renderTabs(7)}
        </TabsBar>
      </div>

      <div className="playground light" title="should render tabs-bar size medium on light background">
        <TabsBar size="medium">{renderTabs(7)}</TabsBar>
      </div>

      <div className="playground dark" title="should render tabs-bar size medium on dark background">
        <TabsBar theme="dark" size="medium">
          {renderTabs(7)}
        </TabsBar>
      </div>

      <div
        className="playground light"
        title="should render tabs-bar size medium with last tab selected on light background"
      >
        <TabsBar activeTabIndex={6} size="medium">
          {renderTabs(7)}
        </TabsBar>
      </div>

      <div
        className="playground dark"
        title="should render tabs-bar size medium with last tab selected on dark background"
      >
        <TabsBar activeTabIndex={6} theme="dark" size="medium">
          {renderTabs(7)}
        </TabsBar>
      </div>

      <div className="playground light" title="should render tabs-bar semibold on light background">
        <TabsBar weight="semibold">{renderTabs(7)}</TabsBar>
      </div>

      <div className="playground dark" title="should render tabs-bar semibold on dark background">
        <TabsBar theme="dark" weight="semibold">
          {renderTabs(7)}
        </TabsBar>
      </div>

      <div className="playground light" title="should render tabs-bar semibold and medium on light background">
        <TabsBar weight="semibold" size="medium">
          {renderTabs(7)}
        </TabsBar>
      </div>

      <div className="playground dark" title="should render tabs-bar semibold and medium on dark background">
        <TabsBar theme="dark" weight="semibold" size="medium">
          {renderTabs(7)}
        </TabsBar>
      </div>

      <div className="playground light" title="should render tabs-bar gradientColorScheme surface on light background">
        <TabsBar gradient-color-scheme="surface">{renderTabs(7)}</TabsBar>
      </div>

      <div className="playground dark" title="should render tabs-bar gradientColorScheme surface on dark background">
        <TabsBar theme="dark" gradient-color-scheme="surface">
          {renderTabs(7)}
        </TabsBar>
      </div>

      <div className="playground light" title="should render selected tab in viewport on light background">
        <TabsBar activeTabIndex={3}>{renderTabs(10)}</TabsBar>
      </div>

      <div className="playground dark" title="should render selected tab in viewport in viewport on dark background">
        <TabsBar activeTabIndex={3} theme="dark">
          {renderTabs(10)}
        </TabsBar>
      </div>
    </>
  );
};
