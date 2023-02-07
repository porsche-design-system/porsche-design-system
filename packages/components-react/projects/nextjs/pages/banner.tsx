/* Auto Generated File */
import type { NextPage } from 'next';
import { PBanner } from '@porsche-design-system/components-react/ssr';

const BannerPage: NextPage = (): JSX.Element => {
  const style = `
    .visualize-grid {
      /* TODO: We should generate the grid visualization based on styles sub package */
      margin: 0;
      display: grid;
      padding: 0 max(0px, (100% - 2560px) / 2);
      grid-gap: clamp(16px, 3.6vw, 36px);
      max-width: 2560px;
      min-width: 320px;
      box-sizing: content-box;
      grid-template-columns:
        [full-start] minmax(0, calc(var(--pds-internal-grid-safe-zone) - clamp(16px, 3.6vw, 36px)))
        [extended-start basic-start narrow-start] repeat(6, minmax(0, 1fr))
        [narrow-end basic-end extended-end] minmax(0, calc(var(--pds-internal-grid-safe-zone) - clamp(16px, 3.6vw, 36px)))
        [full-end];
      --pds-internal-grid-safe-zone: clamp(22px, 10.625vw - 12px, 192px);
      --pds-grid-basic-span-one-half: span 3;
      --pds-grid-basic-span-one-third: span 2;
      --pds-grid-narrow-span-one-half: span 3;
      --pds-grid-basic-span-two-thirds: span 4;
      --pds-grid-extended-span-one-half: span 3;
      position: fixed;
      inset: 0;
      pointer-events: none;
    }

    @media (min-width: 760px) {
      .visualize-grid {
        grid-template-columns:
          [full-start] minmax(0, calc(var(--pds-internal-grid-safe-zone) - clamp(16px, 3.6vw, 36px)))
          [extended-start] repeat(1, minmax(0, 1fr)) [basic-start] repeat(2, minmax(0, 1fr)) [narrow-start] repeat(
            8,
            minmax(0, 1fr)
          )
          [narrow-end] repeat(2, minmax(0, 1fr)) [basic-end] repeat(1, minmax(0, 1fr)) [extended-end] minmax(
            0,
            calc(var(--pds-internal-grid-safe-zone) - clamp(16px, 3.6vw, 36px))
          )
          [full-end];
        --pds-grid-basic-span-one-half: span 6;
        --pds-grid-basic-span-one-third: span 4;
        --pds-grid-narrow-span-one-half: span 4;
        --pds-grid-basic-span-two-thirds: span 8;
        --pds-grid-extended-span-one-half: span 7;
      }
    }

    @media (min-width: 1920px) {
      .visualize-grid {
        --pds-internal-grid-safe-zone: clamp(192px, 50vw - 768px, 512px);
      }
    }

    .visualize-grid-columns {
      transform: translate3d(0, 0, 0);
    }

    @media (max-width: 759px) {
      .visualize-grid-columns:nth-child(n + 9) {
        display: none;
      }
    }

    .visualize-grid-columns::before {
      content: '';
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      background: rgba(0, 0, 255, 0.1);
    }

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

    div:not(.visualize-grid):not(.playground) + div {
      margin-top: 300px;
    }

    div.playground:last-child {
      margin-bottom: 300px;
    }

    .playground {
      padding: 0;
    }

    .playground p-banner {
      --p-banner-position-type: static;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="visualize-grid">
        <span className="visualize-grid-columns" />
        <span className="visualize-grid-columns" /><span className="visualize-grid-columns"></span
        ><span className="visualize-grid-columns" /><span className="visualize-grid-columns"></span
        ><span className="visualize-grid-columns" /><span className="visualize-grid-columns"></span
        ><span className="visualize-grid-columns" /><span className="visualize-grid-columns"></span
        ><span className="visualize-grid-columns" /><span className="visualize-grid-columns"></span
        ><span className="visualize-grid-columns" /><span className="visualize-grid-columns"></span
        ><span className="visualize-grid-columns" /><span className="visualize-grid-columns"></span
        ><span className="visualize-grid-columns" />
      </div>

      <div title="should show banner info position fixed">
        <PBanner>
          <span slot="title">Some notification position fixed (1)</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </PBanner>
      </div>

      <div className="playground light" title="should show banner info on light background">
        <PBanner>
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </PBanner>
      </div>

      <div className="playground light" title="should show banner info with state neutral on light background">
        <PBanner state="neutral">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </PBanner>
      </div>

      <div className="playground dark" title="should show banner info on dark background">
        <PBanner theme="dark">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </PBanner>
      </div>

      <div className="playground dark" title="should show banner info with state neutral on dark background">
        <PBanner state="neutral" theme="dark">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </PBanner>
      </div>

      <div className="playground light" title="should show banner warning on light background">
        <PBanner state="warning">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </PBanner>
      </div>

      <div className="playground dark" title="should show banner warning on dark background">
        <PBanner state="warning" theme="dark">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </PBanner>
      </div>

      <div className="playground light" title="should show banner error on light background">
        <PBanner state="error">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </PBanner>
      </div>

      <div className="playground dark" title="should show banner error on dark background">
        <PBanner state="error" theme="dark">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </PBanner>
      </div>

      <div className="playground light" title="should show banner in persistent mode">
        <PBanner persistent={true}>
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </PBanner>
      </div>

      <div className="playground light" title="should show banner in extended width">
        <PBanner width="extended">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </PBanner>
      </div>

      <div className="playground light" title="should show banner in fluid width">
        <PBanner width="fluid">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </PBanner>
      </div>
    </>
  );
};

export default BannerPage;
