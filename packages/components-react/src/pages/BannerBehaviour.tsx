import { PBanner } from '@porsche-design-system/components-react';

export const BannerBehaviourPage = (): JSX.Element => {
  const style = `
    .playground p-banner {
      --p-banner-position-type: static;
    }
  `;

  return (
    <>
      <style children={style} />

      <div className="playground" title="should keep banners unaltered after closing and opening new banners">
        <PBanner id="banner-close">
          <span slot="title">This banner is closed immediately</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </PBanner>

        <PBanner>
          <span slot="title">Some open banner</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </PBanner>
      </div>
    </>
  );
};
