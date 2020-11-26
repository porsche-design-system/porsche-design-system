import { PBanner as Banner } from '@porsche-design-system/components-react';

export const BannerPage = (): JSX.Element => {
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
      <style children={style}/>

      <div title="should show banner neutral position fixed">
        <Banner>
          <span slot="title">Some notification position fixed (1)</span>
          <span slot="description">Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.</span>
        </Banner>
      </div>

      <div className="content-wrapper">
        <div className="playground light" title="should show banner neutral on light background">
          <Banner>
            <span slot="title">Some notification title</span>
            <span slot="description">Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.</span>
          </Banner>
        </div>

        <div className="playground dark" title="should show banner neutral on dark background">
          <Banner theme="dark">
            <span slot="title">Some notification title</span>
            <span slot="description">Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.</span>
          </Banner>
        </div>

        <div className="playground light" title="should show banner warning on light background">
          <Banner state="warning">
            <span slot="title">Some notification title</span>
            <span slot="description">Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.</span>
          </Banner>
        </div>

        <div className="playground dark" title="should show banner warning on dark background">
          <Banner state="warning" theme="dark">
            <span slot="title">Some notification title</span>
            <span slot="description">Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.</span>
          </Banner>
        </div>

        <div className="playground light" title="should show banner error on light background">
          <Banner state="error">
            <span slot="title">Some notification title</span>
            <span slot="description">Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.</span>
          </Banner>
        </div>

        <div className="playground dark" title="should show banner error on dark background">
          <Banner state="error" theme="dark">
            <span slot="title">Some notification title</span>
            <span slot="description">Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.</span>
          </Banner>
        </div>

        <div className="playground light" title="should show banner in persistent mode">
          <Banner persistent={true}>
            <span slot="title">Some notification title</span>
            <span slot="description">Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.</span>
          </Banner>
        </div>

        <div className="playground light" title="should show banner in extended width">
          <Banner width="extended">
            <span slot="title">Some notification title</span>
            <span slot="description">Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.</span>
          </Banner>
        </div>

        <div className="playground light" title="should show banner in fluid width">
          <Banner width="fluid">
            <span slot="title">Some notification title</span>
            <span slot="description">Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.</span>
          </Banner>
        </div>

      </div>
    </>
  );
};
