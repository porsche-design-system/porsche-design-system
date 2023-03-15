/* Auto Generated File */
import type { NextPage } from 'next';
import { PButtonPure } from '@porsche-design-system/components-react/ssr';

const ButtonPurePage: NextPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light auto-layout" title="should render button with label">
        <PButtonPure>Label default</PButtonPure>
        <PButtonPure disabled={true}>Label disabled</PButtonPure>
        <PButtonPure loading={true}>Label loading</PButtonPure>
      </div>
      <div className="playground dark auto-layout" title="should render button with label on dark theme">
        <PButtonPure theme="dark">Label default</PButtonPure>
        <PButtonPure disabled={true} theme="dark">Label disabled</PButtonPure>
        <PButtonPure loading={true} theme="dark">Label loading</PButtonPure>
      </div>

      <div className="playground light auto-layout" title="should render button without label">
        <PButtonPure hideLabel={true}>Some label</PButtonPure>
        <PButtonPure hideLabel={true} disabled={true}>Some label</PButtonPure>
        <PButtonPure hideLabel={true} loading={true}>Some label</PButtonPure>
      </div>
      <div className="playground dark auto-layout" title="should render button without label on dark theme">
        <PButtonPure hideLabel={true} theme="dark">Some label</PButtonPure>
        <PButtonPure hideLabel={true} disabled={true} theme="dark">Some label</PButtonPure>
        <PButtonPure hideLabel={true} loading={true} theme="dark">Some label</PButtonPure>
      </div>

      <div className="playground light auto-layout" title="should render button with responsive label">
        <PButtonPure hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}>
          Label responsive
        </PButtonPure>
      </div>

      <div className="playground light auto-layout" title="should render button without icon">
        <PButtonPure icon="none">Label default</PButtonPure>
        <PButtonPure icon="none" disabled={true}>Label disabled</PButtonPure>
        <PButtonPure icon="none" loading={true}>Label loading</PButtonPure>
      </div>
      <div className="playground dark auto-layout" title="should render button with label on dark theme">
        <PButtonPure icon="none" theme="dark">Label default</PButtonPure>
        <PButtonPure icon="none" disabled={true} theme="dark">Label disabled</PButtonPure>
        <PButtonPure icon="none" loading={true} theme="dark">Label loading</PButtonPure>
      </div>

      <div className="playground light auto-layout" title="should not render button with different weight">
        <PButtonPure weight="regular">Label weight regular</PButtonPure>
        <PButtonPure weight="semi-bold">Label weight semi-bold</PButtonPure>
        <PButtonPure weight="bold">Label weight bold</PButtonPure>
      </div>

      <div className="playground light auto-layout" title="should render with active state">
        <PButtonPure active={true}>Label active</PButtonPure>
        <PButtonPure active={true} disabled={true}>Label active disabled</PButtonPure>
        <PButtonPure active={true} loading={true}>Label active loading</PButtonPure>
        <PButtonPure active={true} icon="none">Label active</PButtonPure>
        <PButtonPure active={true} icon="none" disabled={true}>Label active disabled</PButtonPure>
        <PButtonPure active={true} icon="none" loading={true}>Label active loading</PButtonPure>
        <PButtonPure active={true} hideLabel={true}>Label active</PButtonPure>
        <PButtonPure active={true} hideLabel={true} disabled={true}>Label active disabled</PButtonPure>
        <PButtonPure active={true} hideLabel={true} loading={true}>Label active loading</PButtonPure>
      </div>

      <div className="playground dark auto-layout" title="should render with active state on dark background">
        <PButtonPure active={true} theme="dark">Label active</PButtonPure>
        <PButtonPure active={true} disabled={true} theme="dark">Label active disabled</PButtonPure>
        <PButtonPure active={true} loading={true} theme="dark">Label active loading</PButtonPure>
        <PButtonPure active={true} icon="none" theme="dark">Label active</PButtonPure>
        <PButtonPure active={true} icon="none" disabled={true} theme="dark">Label active disabled</PButtonPure>
        <PButtonPure active={true} icon="none" loading={true} theme="dark">Label active loading</PButtonPure>
        <PButtonPure active={true} hideLabel={true} theme="dark">Label active</PButtonPure>
        <PButtonPure active={true} hideLabel={true} disabled={true} theme="dark">Label active disabled</PButtonPure>
        <PButtonPure active={true} hideLabel={true} loading={true} theme="dark">Label active loading</PButtonPure>
      </div>

      <div className="playground light auto-layout" title="should render button with specific icon">
        <PButtonPure icon="delete">Label with specific icon</PButtonPure>
        <PButtonPure iconSource="./assets/icon-custom-kaixin.svg">Label with local icon-source</PButtonPure>
      </div>

      <div className="playground dark auto-layout" title="should render button with specific icon on dark background">
        <PButtonPure icon="delete" theme="dark">Label with specific icon</PButtonPure>
        <PButtonPure iconSource="./assets/icon-custom-kaixin.svg" theme="dark"
          >Label with local icon-source
        </PButtonPure>
      </div>

      <div className="playground light auto-layout" title="should render button with multiline label">
        <PButtonPure style={{ width: '15rem' }}>Label multiline lorem ipsum dolor sit amet, consetetur sadipscing</PButtonPure>
      </div>

      <div className="playground light auto-layout" title="should render button-pure with custom clickable area">
        <PButtonPure style={{ padding: '1rem' }}>Label with custom click-area</PButtonPure>
        <PButtonPure hideLabel={true} style={{ padding: '1rem' }}>Label with custom click-area</PButtonPure>
      </div>

      <div className="playground light auto-layout" title="should render with no icon">
        <PButtonPure icon="none">Label icon none</PButtonPure>
      </div>

      <div className="playground light auto-layout" title="should render icon if hide-label and icon none is set">
        <PButtonPure hideLabel={true} icon="none">Label hide-label icon none</PButtonPure>
      </div>

      <div className="playground light auto-layout" title="should align label to the left">
        <PButtonPure alignLabel="left">Label align left</PButtonPure>
      </div>
      <div className="playground light auto-layout" title="should align label to the left or right depending on viewport">
        <PButtonPure alignLabel={{ base: 'left', xs: 'right', s: 'left', m: 'right', l: 'left', xl: 'right' }}>
          Label align responsive
        </PButtonPure>
      </div>

      <div className="playground light auto-layout" title="should render with stretched label">
        <PButtonPure stretch={true}>Label stretch</PButtonPure>
        <PButtonPure stretch={true} alignLabel="left">Label stretch align left</PButtonPure>
      </div>
      <div className="playground light auto-layout" title="should render with stretched label depending on viewport">
        <PButtonPure stretch={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}>
          Label stretch responsive
        </PButtonPure>
      </div>

      <div className="playground light" title="should render button with different size">
        <PButtonPure size="xx-small">Label size xx-small</PButtonPure>
        <br />
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

      <div className="playground light auto-layout" title="should render button with responsive size">
        <PButtonPure
          size={{ base: 'x-small', xs: 'small', s: 'medium', m: 'large', l: 'x-large', xl: 'inherit' }}
          style={{ fontSize: '48px' }}
        >
          Label size responsive
        </PButtonPure>
      </div>

      <div className="playground light" title="should render with no icon and size inherit">
        <PButtonPure icon="none" size="inherit" style={{ fontSize: '48px' }}>Label icon none size inherit</PButtonPure>
        <br />
        <PButtonPure
          icon="none"
          size={{ base: 'x-small', xs: 'small', s: 'medium', m: 'large', l: 'x-large', xl: 'inherit' }}
          style={{ fontSize: '48px' }}
          >Label icon none size responsive
        </PButtonPure>
      </div>
    </>
  );
};

export default ButtonPurePage;
