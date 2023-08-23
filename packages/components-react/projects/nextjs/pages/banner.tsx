/* Auto Generated File */
import type { NextPage } from 'next';
import { PBanner } from '@porsche-design-system/components-react/ssr';

const BannerPage: NextPage = (): JSX.Element => {
  const style = `
    .playground {
      padding: 0;
      transform: translate3d(0, 0, 0);
      margin: 16px 0 0;
      height: 20rem;
    }

    .playground::before {
      position: relative;
      top: 16px;
      left: 16px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should show banner with heading and description">
        <PBanner open={true} heading="Heading" description="Description" />
      </div>

      <div className="playground light" title="should show banner with slotted heading and description">
        <PBanner open={true}>
          <span slot="heading">Slotted heading</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PBanner>
      </div>

      <div className="playground light" title="should show banner">
        <PBanner open={true}>
          <span slot="title">Slotted title</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PBanner>
      </div>

      <div className="playground light" title="should show banner with state neutral">
        <PBanner open={true} state="neutral">
          <span slot="title">Slotted Title (state=neutral)</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PBanner>
      </div>

      <div className="playground light" title="should show banner with state warning">
        <PBanner open={true} state="warning">
          <span slot="title">Slotted Title (state=warning)</span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PBanner>
      </div>

      <div className="playground light" title="should show banner with state error">
        <PBanner open={true} state="error">
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
        <PBanner open={true} persistent={true}>
          <span slot="title">Slotted Title (persistent=true)</span>
          <span slot="description">Slotted description</span>
        </PBanner>
      </div>

      <div className="playground light" title="should show banner without dismiss button">
        <PBanner open={true} dismissButton={false}>
          <span slot="title">Slotted Title (dismissButton=false)</span>
          <span slot="description">Slotted description</span>
        </PBanner>
      </div>

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
    </>
  );
};

export default BannerPage;
