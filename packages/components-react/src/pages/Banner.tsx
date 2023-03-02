/* Auto Generated File */
import { PBanner } from '@porsche-design-system/components-react';

export const BannerPage = (): JSX.Element => {
  const style = `
    p-content-wrapper > p {
      margin: 0;
      padding: 4px 2vw;
      text-align: center;
      color: white;
      background-color: lightskyblue;
    }

    div:not(.visualize-grid) {
      margin: 16px 0;
    }

    .playground {
      padding: 0;
    }

    .content-wrapper {
      padding: 300px 0;
    }

    .playground p-banner {
      --p-banner-position-type: static;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="visualize-grid">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div title="should show banner position fixed">
        <PBanner>
          <span slot="title">Slotted title</span>
          <span slot="description">Slotted description</span>
        </PBanner>
      </div>

      <div className="content-wrapper">
        <div className="playground light" title="should show banner on light background">
          <PBanner>
            <span slot="title">Slotted title (--p-banner-position-type: static)</span>
            <span slot="description">
              Slotted description.
              <span>
                And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
                {' '}<em>emphasized</em> and <i>italic</i> text.
              </span>
            </span>
          </PBanner>
        </div>

        <div className="playground light" title="should show banner with state neutral on light background">
          <PBanner state="neutral">
            <span slot="title">Slotted Title (state=neutral --p-banner-position-type: static)</span>
            <span slot="description">
              Slotted description.
              <span>
                And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
                {' '}<em>emphasized</em> and <i>italic</i> text.
              </span>
            </span>
          </PBanner>
        </div>

        <div className="playground dark" title="should show banner on dark background">
          <PBanner theme="dark">
            <span slot="title">Slotted Title (--p-banner-position-type: static)</span>
            <span slot="description">
              Slotted description.
              <span>
                And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
                {' '}<em>emphasized</em> and <i>italic</i> text.
              </span>
            </span>
          </PBanner>
        </div>

        <div className="playground dark" title="should show banner with state neutral on dark background">
          <PBanner state="neutral" theme="dark">
            <span slot="title">Slotted Title (state=neutral --p-banner-position-type: static)</span>
            <span slot="description">
              Slotted description.
              <span>
                And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
                {' '}<em>emphasized</em> and <i>italic</i> text.
              </span>
            </span>
          </PBanner>
        </div>

        <div className="playground light" title="should show banner warning on light background">
          <PBanner state="warning">
            <span slot="title">Slotted Title (state=warning --p-banner-position-type: static)</span>
            <span slot="description">
              Slotted description.
              <span>
                And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
                {' '}<em>emphasized</em> and <i>italic</i> text.
              </span>
            </span>
          </PBanner>
        </div>

        <div className="playground dark" title="should show banner warning on dark background">
          <PBanner state="warning" theme="dark">
            <span slot="title">Slotted Title (state=warning --p-banner-position-type: static)</span>
            <span slot="description">
              Slotted description.
              <span>
                And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
                {' '}<em>emphasized</em> and <i>italic</i> text.
              </span>
            </span>
          </PBanner>
        </div>

        <div className="playground light" title="should show banner error on light background">
          <PBanner state="error">
            <span slot="title">Slotted Title (state=error --p-banner-position-type: static)</span>
            <span slot="description">
              Slotted description.
              <span>
                And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
                {' '}<em>emphasized</em> and <i>italic</i> text.
              </span>
            </span>
          </PBanner>
        </div>

        <div className="playground dark" title="should show banner error on dark background">
          <PBanner state="error" theme="dark">
            <span slot="title">Slotted Title (state=error --p-banner-position-type: static)</span>
            <span slot="description">
              Slotted description.
              <span>
                And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
                {' '}<em>emphasized</em> and <i>italic</i> text.
              </span>
            </span>
          </PBanner>
        </div>

        <div className="playground light" title="should show banner in persistent mode">
          <PBanner persistent={true}>
            <span slot="title">Slotted Title (persistent=true --p-banner-position-type: static)</span>
            <span slot="description">Slotted description</span>
          </PBanner>
        </div>

        <div className="playground light" title="should show banner in basic width">
          <PBanner width="basic">
            <span slot="title">Slotted Title (width=basic --p-banner-position-type: static)</span>
            <span slot="description">Slotted description</span>
          </PBanner>
        </div>

        <div className="playground light" title="should show banner in fluid width which is mapped to extended">
          <PBanner width="fluid">
            <span slot="title">Slotted Title (width=fluid --p-banner-position-type: static)</span>
            <span slot="description">Slotted description</span>
          </PBanner>
        </div>
      </div>
    </>
  );
};
