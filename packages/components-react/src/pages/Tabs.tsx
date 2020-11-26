import { PTabs as Tabs, PTabsItem as TabsItem } from '@porsche-design-system/components-react';

export const TabsPage = (): JSX.Element => {
  const renderTabs = (amount: number, wrapAtIndex?: number) =>
    Array.from(Array(amount)).map((_, i) => (
      <TabsItem key={i} label={`Tab ${i + 1}`}>
        {wrapAtIndex === i ? <div style={{ color: 'white' }}>Tab Content {i + 1}</div> : `Tab Content ${i + 1}`}
      </TabsItem>
    ));

  return (
    <>
      <div className="playground light" title="should render tabs on light background">
        <Tabs>{renderTabs(7)}</Tabs>
      </div>

      <div className="playground dark" title="should render tabs on dark background">
        <Tabs theme="dark">{renderTabs(7, 0)}</Tabs>
      </div>

      <div className="playground light" title="should render tabs with last tab selected on light background">
        <Tabs activeTabIndex={6}>{renderTabs(7)}</Tabs>
      </div>

      <div className="playground dark" title="should render tabs with last tab selected on dark background">
        <Tabs activeTabIndex={6} theme="dark">
          {renderTabs(7, 6)}
        </Tabs>
      </div>

      <div className="playground light" title="should render tabs size medium on light background">
        <Tabs size="medium">{renderTabs(7)}</Tabs>
      </div>

      <div className="playground dark" title="should render tabs size medium on dark background">
        <Tabs theme="dark" size="medium">
          {renderTabs(7, 0)}
        </Tabs>
      </div>

      <div
        className="playground light"
        title="should render tabs size medium with last tab selected on light background"
      >
        <Tabs activeTabIndex={6} size="medium">
          {renderTabs(7)}
        </Tabs>
      </div>

      <div className="playground dark" title="should render tabs size medium with last tab selected on dark background">
        <Tabs activeTabIndex={6} theme="dark" size="medium">
          {renderTabs(7, 6)}
        </Tabs>
      </div>

      <div className="playground light" title="should render tabs semibold on light background">
        <Tabs weight="semibold">{renderTabs(7)}</Tabs>
      </div>

      <div className="playground dark" title="should render tabs semibold on dark background">
        <Tabs theme="dark" weight="semibold">
          {renderTabs(7, 0)}
        </Tabs>
      </div>

      <div className="playground light" title="should render tabs semibold and medium on light background">
        <Tabs weight="semibold" size="medium">
          {renderTabs(7)}
        </Tabs>
      </div>

      <div className="playground dark" title="should render tabs semibold and medium on dark background">
        <Tabs theme="dark" weight="semibold" size="medium">
          {renderTabs(7, 0)}
        </Tabs>
      </div>

      <div className="playground light" title="should render tabs gradientColorScheme surface on light background">
        <Tabs gradient-color-scheme="surface">{renderTabs(7)}</Tabs>
      </div>

      <div className="playground dark" title="should render tabs gradientColorScheme surface on dark background">
        <Tabs theme="dark" gradient-color-scheme="surface">
          {renderTabs(7, 0)}
        </Tabs>
      </div>

      <div className="playground light" title="should render selected tab in viewport on light background">
        <Tabs activeTabIndex={3}>{renderTabs(10)}</Tabs>
      </div>

      <div className="playground dark" title="should render selected tab in viewport in viewport on dark background">
        <Tabs activeTabIndex={3} theme="dark">
          {renderTabs(10, 3)}
        </Tabs>
      </div>
    </>
  );
};
