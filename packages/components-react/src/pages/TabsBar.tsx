import { PTabsBar } from '@porsche-design-system/components-react';

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
        <PTabsBar>{renderTabs(7)}</PTabsBar>
      </div>

      <div className="playground dark" title="should render tabs-bar on dark background">
        <PTabsBar theme="dark">{renderTabs(7)}</PTabsBar>
      </div>

      <div className="playground light" title="should render tabs-bar with last tab selected on light background">
        <PTabsBar activeTabIndex={6}>{renderTabs(7)}</PTabsBar>
      </div>

      <div className="playground dark" title="should render tabs-bar with last tab selected on dark background">
        <PTabsBar activeTabIndex={6} theme="dark">
          {renderTabs(7)}
        </PTabsBar>
      </div>

      <div className="playground light" title="should render tabs-bar size medium on light background">
        <PTabsBar size="medium">{renderTabs(7)}</PTabsBar>
      </div>

      <div className="playground dark" title="should render tabs-bar size medium on dark background">
        <PTabsBar theme="dark" size="medium">
          {renderTabs(7)}
        </PTabsBar>
      </div>

      <div
        className="playground light"
        title="should render tabs-bar size medium with last tab selected on light background"
      >
        <PTabsBar activeTabIndex={6} size="medium">
          {renderTabs(7)}
        </PTabsBar>
      </div>

      <div
        className="playground dark"
        title="should render tabs-bar size medium with last tab selected on dark background"
      >
        <PTabsBar activeTabIndex={6} theme="dark" size="medium">
          {renderTabs(7)}
        </PTabsBar>
      </div>

      <div className="playground light" title="should render tabs-bar semibold on light background">
        <PTabsBar weight="semibold">{renderTabs(7)}</PTabsBar>
      </div>

      <div className="playground dark" title="should render tabs-bar semibold on dark background">
        <PTabsBar theme="dark" weight="semibold">
          {renderTabs(7)}
        </PTabsBar>
      </div>

      <div className="playground light" title="should render tabs-bar semibold and medium on light background">
        <PTabsBar weight="semibold" size="medium">
          {renderTabs(7)}
        </PTabsBar>
      </div>

      <div className="playground dark" title="should render tabs-bar semibold and medium on dark background">
        <PTabsBar theme="dark" weight="semibold" size="medium">
          {renderTabs(7)}
        </PTabsBar>
      </div>

      <div className="playground light" title="should render tabs-bar gradientColorScheme surface on light background">
        <PTabsBar gradientColorScheme="surface">{renderTabs(7)}</PTabsBar>
      </div>

      <div className="playground dark" title="should render tabs-bar gradientColorScheme surface on dark background">
        <PTabsBar theme="dark" gradientColorScheme="surface">
          {renderTabs(7)}
        </PTabsBar>
      </div>

      <div className="playground light" title="should render selected tab in viewport on light background">
        <PTabsBar activeTabIndex={3}>{renderTabs(10)}</PTabsBar>
      </div>

      <div className="playground dark" title="should render selected tab in viewport in viewport on dark background">
        <PTabsBar activeTabIndex={3} theme="dark">
          {renderTabs(10)}
        </PTabsBar>
      </div>
    </>
  );
};
