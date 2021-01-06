import { PTabs, PTabsItem } from '@porsche-design-system/components-react';

export const TabsPage = (): JSX.Element => {
  const renderTabs = (amount: number, wrapAtIndex?: number) =>
    Array.from(Array(amount)).map((_, i) => (
      <PTabsItem key={i} label={`Tab ${i + 1}`}>
        {wrapAtIndex === i ? <div style={{ color: 'white' }}>Tab Content {i + 1}</div> : `Tab Content ${i + 1}`}
      </PTabsItem>
    ));

  return (
    <>
      <div className="playground light" title="should render tabs on light background">
        <PTabs>{renderTabs(7)}</PTabs>
      </div>

      <div className="playground dark" title="should render tabs on dark background">
        <PTabs theme="dark">{renderTabs(7, 0)}</PTabs>
      </div>

      <div className="playground light" title="should render tabs with last tab selected on light background">
        <PTabs activeTabIndex={6}>{renderTabs(7)}</PTabs>
      </div>

      <div className="playground dark" title="should render tabs with last tab selected on dark background">
        <PTabs activeTabIndex={6} theme="dark">
          {renderTabs(7, 6)}
        </PTabs>
      </div>

      <div className="playground light" title="should render tabs size medium on light background">
        <PTabs size="medium">{renderTabs(7)}</PTabs>
      </div>

      <div className="playground dark" title="should render tabs size medium on dark background">
        <PTabs theme="dark" size="medium">
          {renderTabs(7, 0)}
        </PTabs>
      </div>

      <div
        className="playground light"
        title="should render tabs size medium with last tab selected on light background"
      >
        <PTabs activeTabIndex={6} size="medium">
          {renderTabs(7)}
        </PTabs>
      </div>

      <div className="playground dark" title="should render tabs size medium with last tab selected on dark background">
        <PTabs activeTabIndex={6} theme="dark" size="medium">
          {renderTabs(7, 6)}
        </PTabs>
      </div>

      <div className="playground light" title="should render tabs semibold on light background">
        <PTabs weight="semibold">{renderTabs(7)}</PTabs>
      </div>

      <div className="playground dark" title="should render tabs semibold on dark background">
        <PTabs theme="dark" weight="semibold">
          {renderTabs(7, 0)}
        </PTabs>
      </div>

      <div className="playground light" title="should render tabs semibold and medium on light background">
        <PTabs weight="semibold" size="medium">
          {renderTabs(7)}
        </PTabs>
      </div>

      <div className="playground dark" title="should render tabs semibold and medium on dark background">
        <PTabs theme="dark" weight="semibold" size="medium">
          {renderTabs(7, 0)}
        </PTabs>
      </div>

      <div className="playground light" title="should render tabs gradientColorScheme surface on light background">
        <PTabs gradient-color-scheme="surface">{renderTabs(7)}</PTabs>
      </div>

      <div className="playground dark" title="should render tabs gradientColorScheme surface on dark background">
        <PTabs theme="dark" gradient-color-scheme="surface">
          {renderTabs(7, 0)}
        </PTabs>
      </div>

      <div className="playground light" title="should render selected tab in viewport on light background">
        <PTabs activeTabIndex={3}>{renderTabs(10)}</PTabs>
      </div>

      <div className="playground dark" title="should render selected tab in viewport in viewport on dark background">
        <PTabs activeTabIndex={3} theme="dark">
          {renderTabs(10, 3)}
        </PTabs>
      </div>
    </>
  );
};
