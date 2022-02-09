/* Auto Generated File */
import { PButtonPure } from '@porsche-design-system/components-react';

export const ButtonPurePage = (): JSX.Element => {
  const style = `
    p-button-pure:not(:last-child) {
      margin-right: 0.5rem;
    }
    .stretched-buttons p-button-pure {
      margin-right: 0;
    }
  `;

  return (
    <>
      <style children={style} />

      <div className="playground light" title="should render button with label">
        <PButtonPure>Label default</PButtonPure>
        <PButtonPure disabled={true}>Label disabled</PButtonPure>
        <PButtonPure loading={true}>Label loading</PButtonPure>
      </div>
      <div className="playground dark" title="should render button with label on dark theme">
        <PButtonPure theme="dark">Label default</PButtonPure>
        <PButtonPure disabled={true} theme="dark">Label disabled</PButtonPure>
        <PButtonPure loading={true} theme="dark">Label loading</PButtonPure>
      </div>

      <div className="playground light" title="should render button without label">
        <PButtonPure hideLabel={true}>Some label</PButtonPure>
        <PButtonPure hideLabel={true} disabled={true}>Some label</PButtonPure>
        <PButtonPure hideLabel={true} loading={true}>Some label</PButtonPure>
      </div>
      <div className="playground dark" title="should render button without label on dark theme">
        <PButtonPure hideLabel={true} theme="dark">Some label</PButtonPure>
        <PButtonPure hideLabel={true} disabled={true} theme="dark">Some label</PButtonPure>
        <PButtonPure hideLabel={true} loading={true} theme="dark">Some label</PButtonPure>
      </div>

      <div className="playground light" title="should render button with responsive label">
        <PButtonPure hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}>
          Label responsive
        </PButtonPure>
        <PButtonPure hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}>
          Label responsive
          <p slot="subline">Some subline</p>
        </PButtonPure>
      </div>

      <div className="playground light" title="should render button with different size">
        <PButtonPure size="x-small">Label size x-small</PButtonPure>
        <br />
        <PButtonPure size="small">Label size small</PButtonPure>
        <br />
        <PButtonPure size="medium">Label size medium</PButtonPure>
        <br />
        <PButtonPure size="large">Label size large</PButtonPure>
        <br />
        <PButtonPure size="x-large">Label size x-large</PButtonPure>
        <br />
        <PButtonPure size="inherit" style={{ fontSize: '48px' }}>Label size inherit</PButtonPure>
      </div>

      <div className="playground light" title="should render button with responsive size">
        <PButtonPure
          size={{ base: 'x-small', xs: 'small', s: 'medium', m: 'large', l: 'x-large', xl: 'inherit' }}
          style={{ fontSize: '48px' }}
        >
          Label size responsive
        </PButtonPure>
      </div>

      <div className="playground light" title="should render button with different weight">
        <PButtonPure weight="thin">Label weight thin</PButtonPure>
        <PButtonPure weight="regular">Label weight regular</PButtonPure>
        <PButtonPure weight="semibold">Label weight semibold</PButtonPure>
        <PButtonPure weight="bold">Label weight bold</PButtonPure>
      </div>

      <div className="playground light" title="should render with active state">
        <PButtonPure active={true}>Label active</PButtonPure>
        <PButtonPure active={true} disabled={true}>Label active disabled</PButtonPure>
        <PButtonPure active={true} loading={true}>Label active loading</PButtonPure>
        <PButtonPure active={true}>
          Label active
          <p slot="subline">Some subline</p>
        </PButtonPure>
      </div>

      <div className="playground dark" title="should render with active state on dark background">
        <PButtonPure active={true} theme="dark">Label active</PButtonPure>
        <PButtonPure active={true} disabled={true} theme="dark">Label active disabled</PButtonPure>
        <PButtonPure active={true} loading={true} theme="dark">Label active loading</PButtonPure>
        <PButtonPure active={true} theme="dark">
          Label active
          <p slot="subline">Some subline</p>
        </PButtonPure>
      </div>

      <div className="playground light" title="should render button with specific icon">
        <PButtonPure icon="delete">Label with specific icon</PButtonPure>
        <PButtonPure iconSource="./assets/icon-custom-kaixin.svg">Label with local icon-source</PButtonPure>
      </div>

      <div className="playground dark" title="should render button with specific icon on dark background">
        <PButtonPure icon="delete" theme="dark">Label with specific icon</PButtonPure>
        <PButtonPure iconSource="./assets/icon-custom-kaixin.svg" theme="dark">Label with local icon-source</PButtonPure>
      </div>

      <div className="playground light" title="should render button with multiline label">
        <PButtonPure style={{ width: '240px' }}>Label multiline lorem ipsum dolor sit amet, consetetur sadipscing</PButtonPure>
      </div>

      <div className="playground light" title="should render button-pure with custom clickable area">
        <PButtonPure style={{ padding: '1rem' }}>Label with custom click-area</PButtonPure>
        <PButtonPure hideLabel={true} style={{ padding: '1rem' }}>Label with custom click-area</PButtonPure>
      </div>

      <div className="playground light" title="should render with subline">
        <PButtonPure size="small">
          Label size small
          <p slot="subline">Some subline</p>
        </PButtonPure>
        <PButtonPure size="medium">
          Label size medium
          <p slot="subline">Some subline</p>
        </PButtonPure>
        <PButtonPure size="large">
          Label size large
          <p slot="subline">Some subline</p>
        </PButtonPure>
        <PButtonPure size="x-large">
          Label size x-large
          <p slot="subline">Some subline</p>
        </PButtonPure>
        <PButtonPure size="medium" disabled={true}>
          Label size medium disabled
          <p slot="subline">Some subline</p>
        </PButtonPure>
      </div>

      <div className="playground light" title="should render with no icon">
        <PButtonPure icon="none">Label icon none</PButtonPure>
        <PButtonPure size="small" icon="none">
          Label icon none
          <p slot="subline">Some subline</p>
        </PButtonPure>
      </div>

      <div className="playground light" title="should render icon if hide-label and icon none is set">
        <PButtonPure hideLabel={true} icon="none">Label hide-label icon none</PButtonPure>
        <PButtonPure hideLabel={true} size="small" icon="none">
          Label hide-label icon none
          <p slot="subline">Some subline</p>
        </PButtonPure>
      </div>

      <div className="playground light" title="should align label to the left">
        <PButtonPure alignLabel="left">Label align left</PButtonPure>
      </div>
      <div className="playground light" title="should align label to the left or right depending on viewport">
        <PButtonPure alignLabel={{ base: 'left', xs: 'right', s: 'left', m: 'right', l: 'left', xl: 'right' }}>
          Label align responsive
        </PButtonPure>
      </div>

      <div className="playground light stretched-buttons" title="should render with stretched label">
        <PButtonPure stretch={true}>Label stretch</PButtonPure>
        <PButtonPure stretch={true} alignLabel="left">Label stretch align left</PButtonPure>
      </div>
      <div className="playground light" title="should render with stretched label depending on viewport">
        <PButtonPure stretch={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}>
          Label stretch responsive
        </PButtonPure>
      </div>

      <div className="playground light" title="should not align label left or stretch if it has a subline">
        <PButtonPure alignLabel="left">
          Label align left
          <p slot="subline">Some subline</p>
        </PButtonPure>
        <PButtonPure stretch={true}>
          Label stretch
          <p slot="subline">Some subline</p>
        </PButtonPure>
      </div>
    </>
  );
};
