/* Auto Generated File */
import { componentsReady, PBanner } from '@porsche-design-system/components-react';
import { useEffect, useState } from 'react';

export const BannerPage = (): JSX.Element => {
  const [allReady, setAllReady] = useState(false);
  useEffect(() => {
    componentsReady().then(() => {
      setAllReady(true);
    });
  }, []);

  const style = `
    .playground p-banner {
      --p-banner-position-type: static;
    }
    .content-wrapper {
      padding: 300px 0;
    }
  `;

  return (
    <>
      <style children={style} />

      <div title="should show banner neutral position fixed">
        <PBanner>
          <span slot="title">Some notification position fixed (1)</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </PBanner>
      </div>

      <div className="content-wrapper">
        <div className="playground light" title="should show banner neutral on light background">
          <PBanner>
            <span slot="title">Some notification title</span>
            <span slot="description">
              Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
            </span>
          </PBanner>
        </div>

        <div className="playground dark" title="should show banner neutral on dark background">
          <PBanner theme="dark">
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

        {allReady && (
          <div className="playground light" title="should show banner in fluid width">
            <PBanner width="fluid">
              <span slot="title">Some notification title</span>
              <span slot="description">
              Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
              </span>
            </PBanner>
          </div>
        )}
      </div>
    </>
  );
};
