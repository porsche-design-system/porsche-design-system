/* Auto Generated File */
import { PBanner } from '@porsche-design-system/components-react';

export const BannerPage = (): JSX.Element => {
  const style = `
    .playground {
      padding: 0;
      transform: translate3d(0, 0, 0);
      margin: 16px 0;
      height: 20rem;
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
        <span />
        <span />
      </div>

      <div
        className="playground light"
        title="should show banner with heading and description on light background"
        style={{ background: 'transparent' }}
      >
        <PBanner heading="Heading" description="Description" />
      </div>

      <div className="playground light" title="should show banner with slotted heading and description on light background">
        <PBanner>
          <span slot="heading">Slotted heading</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PBanner>
      </div>

      <div className="playground light" title="should show banner on light background">
        <PBanner>
          <span slot="title">Slotted title</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PBanner>
      </div>

      <div className="playground light" title="should show banner with state neutral on light background">
        <PBanner state="neutral">
          <span slot="title">Slotted Title (state=neutral)</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PBanner>
      </div>

      <div className="playground dark" title="should show banner on dark background">
        <PBanner theme="dark">
          <span slot="title">Slotted Title</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PBanner>
      </div>

      <div className="playground dark" title="should show banner with state neutral on dark background">
        <PBanner state="neutral" theme="dark">
          <span slot="title">Slotted Title (state=neutral)</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PBanner>
      </div>

      <div className="playground light" title="should show banner warning on light background">
        <PBanner state="warning">
          <span slot="title">Slotted Title (state=warning)</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PBanner>
      </div>

      <div className="playground dark" title="should show banner warning on dark background">
        <PBanner state="warning" theme="dark">
          <span slot="title">Slotted Title (state=warning)</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PBanner>
      </div>

      <div className="playground light" title="should show banner error on light background">
        <PBanner state="error">
          <span slot="title">Slotted Title (state=error)</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PBanner>
      </div>

      <div className="playground dark" title="should show banner error on dark background">
        <PBanner state="error" theme="dark">
          <span slot="title">Slotted Title (state=error)</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PBanner>
      </div>

      <div className="playground light" title="should show banner in persistent mode">
        <PBanner persistent={true}>
          <span slot="title">Slotted Title (persistent=true)</span>
          <span slot="description">Slotted description</span>
        </PBanner>
      </div>
    </>
  );
};
