import { PBannerInline } from '@porsche-design-system/components-react';

export const BannerInlinePage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should show banner-inline neutral on light background">
        <PBannerInline heading="Some banner-inline heading" description="Some banner-inline description." />
      </div>

      <div className="playground dark" title="should show banner-inline neutral on dark background">
        <PBannerInline
          heading="Some banner-inline heading"
          description="Some banner-inline description."
          theme="dark"
        />
      </div>

      <div className="playground light" title="should show banner-inline warning on light background">
        <PBannerInline
          heading="Some warning banner-inline heading"
          description="Some banner-inline description."
          state="warning"
        />
      </div>

      <div className="playground dark" title="should show banner-inline warning on dark background">
        <PBannerInline
          heading="Some warning banner-inline heading"
          description="Some banner-inline description."
          state="warning"
          theme="dark"
        />
      </div>

      <div className="playground light" title="should show banner-inline success on light background">
        <PBannerInline
          heading="Some success banner-inline heading"
          description="Some banner-inline description."
          state="success"
        />
      </div>

      <div className="playground dark" title="should show banner-inline success on dark background">
        <PBannerInline
          heading="Some success banner-inline heading"
          description="Some banner-inline description."
          state="success"
          theme="dark"
        />
      </div>

      <div className="playground light" title="should show banner-inline error on light background">
        <PBannerInline
          heading="Some error banner-inline heading"
          description="Some banner-inline description."
          state="error"
        />
      </div>

      <div className="playground dark" title="should show banner-inline error on dark background">
        <PBannerInline
          heading="Some error banner-inline heading"
          description="Some banner-inline description."
          state="error"
          theme="dark"
        />
      </div>

      <div className="playground light" title="should show banner-inline with slotted content on light background">
        <PBannerInline>
          <span slot="heading">Some slotted banner-inline heading</span>
          Some slotted banner-inline description. And some <a href="https://www.porsche.com/">LINK</a> element.
        </PBannerInline>
      </div>

      <div className="playground dark" title="should show banner-inline with slotted content on dark background">
        <PBannerInline theme="dark">
          <span slot="heading">Some slotted banner-inline heading</span>
          Some slotted banner-inline description. And some <a href="https://www.porsche.com/">LINK</a> element.
        </PBannerInline>
      </div>

      <div className="playground light" title="should show banner-inline with action button">
        <PBannerInline
          heading="Some action button banner-inline heading"
          description="Some banner-inline description."
          actionLabel="Some action"
          actionIcon="arrow-double-right"
        />
      </div>

      <div className="playground light" title="should show banner-inline with loading action button">
        <PBannerInline
          heading="Some action button banner-inline heading"
          description="Some banner-inline description."
          actionLabel="Some loading action"
          actionLoading
        />
      </div>

      <div className="playground light" title="should show banner-inline in persistent mode">
        <PBannerInline
          heading="Some persistent banner-inline heading"
          description="Some banner-inline description."
          persistent
        />
      </div>

      <div className="playground light" title="should show banner-inline in persistent mode with action button">
        <PBannerInline
          heading="Some persistent banner-inline heading"
          description="Some banner-inline description."
          persistent
          actionLabel="Some action"
        />
      </div>
    </>
  );
};
