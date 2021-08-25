import { PLinkPure } from '@porsche-design-system/components-react';

export const LinkPurePage = (): JSX.Element => {
  const style = `
    p-link-pure:not(:last-child) {
      margin-right: 8px;
    }
    .stretched-links p-link-pure {
      margin-right: 0;
    }
  `;
  return (
    <>
      <style children={style} />

      <div className="playground light" title="should render with label">
        <PLinkPure href="https://www.porsche.com">Label default</PLinkPure>
        <PLinkPure>
          <a href="https://www.porsche.com">Label slotted</a>
        </PLinkPure>
      </div>
      <div className="playground dark" title="should render with label on dark background">
        <PLinkPure href="https://www.porsche.com" theme="dark">
          Label default
        </PLinkPure>
        <PLinkPure theme="dark">
          <a href="https://www.porsche.com">Label slotted</a>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render without label">
        <PLinkPure href="https://www.porsche.com" hideLabel>
          Some label
        </PLinkPure>
        <PLinkPure hideLabel>
          <a href="https://www.porsche.com">Some label</a>
        </PLinkPure>
      </div>
      <div className="playground dark" title="should render without label on dark background">
        <PLinkPure href="https://www.porsche.com" hideLabel theme="dark">
          Some label
        </PLinkPure>
        <PLinkPure hideLabel theme="dark">
          <a href="https://www.porsche.com">Some label</a>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with responsive label">
        <PLinkPure
          href="https://www.porsche.com"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          Label responsive
        </PLinkPure>
        <PLinkPure
          href="https://www.porsche.com"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          Label responsive
          <p slot="subline">Some subline</p>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with different size">
        <PLinkPure href="https://www.porsche.com" size="x-small">
          Label size x-small
        </PLinkPure>
        <PLinkPure size="x-small">
          <a href="https://www.porsche.com">Label slotted size x-small</a>
        </PLinkPure>
        <br />
        <PLinkPure href="https://www.porsche.com" size="small">
          Label size small
        </PLinkPure>
        <PLinkPure size="small">
          <a href="https://www.porsche.com">Label slotted size small</a>
        </PLinkPure>
        <br />
        <PLinkPure href="https://www.porsche.com" size="medium">
          Label size medium
        </PLinkPure>
        <PLinkPure size="medium">
          <a href="https://www.porsche.com">Label slotted size medium</a>
        </PLinkPure>
        <br />
        <PLinkPure href="https://www.porsche.com" size="large">
          Label size large
        </PLinkPure>
        <PLinkPure size="large">
          <a href="https://www.porsche.com">Label slotted size large</a>
        </PLinkPure>
        <br />
        <PLinkPure href="https://www.porsche.com" size="x-large">
          Label size x-large
        </PLinkPure>
        <PLinkPure size="x-large">
          <a href="https://www.porsche.com">Label slotted size x-large</a>
        </PLinkPure>
        <br />
        <PLinkPure href="https://www.porsche.com" size="inherit" style={{ fontSize: 48 }}>
          Label size inherit
        </PLinkPure>
        <PLinkPure size="inherit" style={{ fontSize: 48 }}>
          <a href="https://www.porsche.com">Label slotted size inherit</a>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with responsive size">
        <PLinkPure
          href="https://www.porsche.com"
          size={{ base: 'x-small', xs: 'small', s: 'medium', m: 'large', l: 'x-large', xl: 'inherit' }}
          style={{ fontSize: 48 }}
        >
          Label size responsive
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with different weight">
        <PLinkPure href="https://www.porsche.com" weight="thin">
          Label weight thin
        </PLinkPure>
        <PLinkPure weight="thin">
          <a href="https://www.porsche.com">Label slotted weight thin</a>
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" weight="regular">
          Label weight regular
        </PLinkPure>
        <PLinkPure weight="regular">
          <a href="https://www.porsche.com">Label slotted weight regular</a>
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" weight="bold">
          Label weight bold
        </PLinkPure>
        <PLinkPure weight="bold">
          <a href="https://www.porsche.com">Label slotted weight bold</a>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with active state">
        <PLinkPure href="https://www.porsche.com" active>
          Label active
        </PLinkPure>
        <PLinkPure active>
          <a href="https://www.porsche.com">Label slotted active</a>
        </PLinkPure>
      </div>

      <div className="playground dark" title="should render with active state on dark background">
        <PLinkPure href="https://www.porsche.com" active theme="dark">
          Label active
        </PLinkPure>
        <PLinkPure active theme="dark">
          <a href="https://www.porsche.com">Label slotted active</a>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with specific icon">
        <PLinkPure href="https://www.porsche.com" icon="phone">
          Label with specific icon
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" iconSource="./assets/icon-custom-kaixin.svg">
          Label with iconSource
        </PLinkPure>
      </div>

      <div className="playground dark" title="should render with specific icon on dark background">
        <PLinkPure href="https://www.porsche.com" icon="phone" theme="dark">
          Label with specific icon
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" iconSource="./assets/icon-custom-kaixin.svg" theme="dark">
          Label with iconSource
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with multiline label">
        <PLinkPure href="https://www.porsche.com" style={{ width: 240 }}>
          Label multiline lorem ipsum dolor sit amet, consetetur sadipscing
        </PLinkPure>
        <PLinkPure style={{ width: 240 }}>
          <a href="https://www.porsche.com">
            Label slotted multiline lorem ipsum dolor sit amet, consetetur sadipscing
          </a>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with custom clickable area">
        <PLinkPure href="https://www.porsche.com" style={{ padding: '1rem' }}>
          Label with custom click-area
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" hideLabel style={{ padding: '1rem' }}>
          Label with custom click-area
        </PLinkPure>
        <PLinkPure style={{ padding: '1rem' }}>
          <a href="https://www.porsche.com">Label slotted with custom click-area</a>
        </PLinkPure>
        <PLinkPure hideLabel style={{ padding: '1rem' }}>
          <a href="https://www.porsche.com">Label slotted with custom click-area</a>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with subline">
        <PLinkPure href="https://www.porsche.com" size="small">
          Label size small
          <p slot="subline">Some subline</p>
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" size="medium">
          Label size medium
          <p slot="subline">Some subline</p>
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" size="large">
          Label size large
          <p slot="subline">Some subline</p>
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" size="x-large">
          Label size x-large
          <p slot="subline">Some subline</p>
        </PLinkPure>
        <PLinkPure size="large">
          <a href="https://www.porsche.com">Label slotted size large</a>
          <p slot="subline">Some subline</p>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render with no icon">
        <PLinkPure href="https://www.porsche.com" icon="none">
          Label without icon
        </PLinkPure>
        <PLinkPure icon="none">
          <a href="https://www.porsche.com">Label slotted without icon</a>
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" size="small" icon="none">
          Label without icon
          <p slot="subline">Some subline</p>
        </PLinkPure>
      </div>

      <div className="playground light" title="should render icon if hide-label and icon none is set">
        <PLinkPure href="https://www.porsche.com" hideLabel icon="none">
          Label with hideLabel and no icon
        </PLinkPure>
        <PLinkPure hideLabel icon="none">
          <a href="https://www.porsche.com">Label slotted with hideLabel and no icon</a>
        </PLinkPure>
        <PLinkPure hideLabel size="small" icon="none">
          <a href="https://www.porsche.com">Label with hideLabel and no icon</a>
          <p slot="subline">Some subline</p>
        </PLinkPure>
      </div>

      <div className="playground light" title="should align label to the left">
        <PLinkPure href="https://www.porsche.com" alignLabel="left">
          Label aligned left
        </PLinkPure>
        <PLinkPure alignLabel="left">
          <a href="https://www.porsche.com">Label slotted aligned left</a>
        </PLinkPure>
      </div>
      <div className="playground light" title="should align label to the left or right depending on viewport">
        <PLinkPure
          href="https://www.porsche.com"
          alignLabel={{ base: 'left', xs: 'right', s: 'left', m: 'right', l: 'left', xl: 'right' }}
        >
          Label align responsive
        </PLinkPure>
        <PLinkPure alignLabel={{ base: 'left', xs: 'right', s: 'left', m: 'right', l: 'left', xl: 'right' }}>
          <a href="https://www.porsche.com">Label slotted responsive aligned left</a>
        </PLinkPure>
      </div>

      <div className="playground light stretched-links" title="should render with stretched label">
        <PLinkPure href="https://www.porsche.com" stretch>
          Label stretched
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" stretch alignLabel="left">
          Label stretched aligned left
        </PLinkPure>
        <PLinkPure stretch>
          <a href="https://www.porsche.com">Label slotted stretched</a>
        </PLinkPure>
        <PLinkPure stretch alignLabel="left">
          <a href="https://www.porsche.com">Label slotted stretched aligned left</a>
        </PLinkPure>
      </div>
      <div
        className="playground light stretched-links"
        title="should render with stretched label depending on viewport"
      >
        <PLinkPure
          href="https://www.porsche.com"
          stretch={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          Label stretch responsive
        </PLinkPure>
        <PLinkPure stretch={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}>
          <a href="https://www.porsche.com">Label slotted responsive stretched</a>
        </PLinkPure>
      </div>

      <div className="playground light" title="should not align label left or stretch if it has a subline">
        <PLinkPure href="https://www.porsche.com" alignLabel="left">
          Label aligned left
          <p slot="subline">Some subline</p>
        </PLinkPure>
        <PLinkPure href="https://www.porsche.com" stretch>
          Label stretched
          <p slot="subline">Some subline</p>
        </PLinkPure>
      </div>
    </>
  );
};
