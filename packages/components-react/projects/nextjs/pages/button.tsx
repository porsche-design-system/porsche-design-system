/* Auto Generated File */
import type { NextPage } from 'next';
import { PButton } from '@porsche-design-system/components-react/ssr';

const ButtonPage: NextPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light auto-layout" title="should render button primary with label only">
        <PButton variant="primary">Some label</PButton>
        <PButton variant="primary" loading={true}>Some label</PButton>
        <PButton variant="primary" disabled={true}>Some label</PButton>
      </div>
      <div className="playground light auto-layout" title="should render button primary with label and icon">
        <PButton variant="primary" icon="arrow-right">Some label</PButton>
        <PButton variant="primary" icon="arrow-right" loading={true}>Some label</PButton>
        <PButton variant="primary" icon="arrow-right" disabled={true}>Some label</PButton>
      </div>
      <div className="playground light auto-layout" title="should render button primary without label">
        <PButton variant="primary" hideLabel={true} icon="arrow-right">Some label</PButton>
        <PButton variant="primary" hideLabel={true} icon="arrow-right" loading={true}>Some label</PButton>
        <PButton variant="primary" hideLabel={true} icon="arrow-right" disabled={true}>Some label</PButton>
      </div>

      <div className="playground light auto-layout" title="should render button primary as default with label only">
        <PButton>Some label</PButton>
        <PButton loading={true}>Some label</PButton>
        <PButton disabled={true}>Some label</PButton>
      </div>
      <div className="playground light auto-layout" title="should render button primary as default with label and icon">
        <PButton icon="arrow-right">Some label</PButton>
        <PButton icon="arrow-right" loading={true}>Some label</PButton>
        <PButton icon="arrow-right" disabled={true}>Some label</PButton>
      </div>
      <div className="playground light auto-layout" title="should render button primary as default without label">
        <PButton hideLabel={true} icon="arrow-right">Some label</PButton>
        <PButton hideLabel={true} icon="arrow-right" loading={true}>Some label</PButton>
        <PButton hideLabel={true} icon="arrow-right" disabled={true}>Some label</PButton>
      </div>

      <div className="playground light auto-layout" title="should render button secondary with label only">
        <PButton variant="secondary">Some label</PButton>
        <PButton variant="secondary" loading={true}>Some label</PButton>
        <PButton variant="secondary" disabled={true}>Some label</PButton>
      </div>
      <div className="playground light auto-layout" title="should render button secondary with label and icon">
        <PButton variant="secondary" icon="arrow-right">Some label</PButton>
        <PButton variant="secondary" icon="arrow-right" loading={true}>Some label</PButton>
        <PButton variant="secondary" icon="arrow-right" disabled={true}>Some label</PButton>
      </div>
      <div className="playground light auto-layout" title="should render button secondary without label">
        <PButton variant="secondary" hideLabel={true} icon="arrow-right">Some label</PButton>
        <PButton variant="secondary" hideLabel={true} icon="arrow-right" loading={true}>Some label</PButton>
        <PButton variant="secondary" hideLabel={true} icon="arrow-right" disabled={true}>Some label</PButton>
      </div>

      <div
        className="playground light auto-layout"
        title="should render button secondary if tertiary prop is set (deprecated) with label"
      >
        <PButton variant="tertiary">Some label</PButton>
        <PButton variant="tertiary" loading={true}>Some label</PButton>
        <PButton variant="tertiary" disabled={true}>Some label</PButton>
      </div>
      <div
        className="playground light auto-layout"
        title="should render button secondary if tertiary prop is set (deprecated) with label and icon"
      >
        <PButton variant="tertiary" icon="arrow-right">Some label</PButton>
        <PButton variant="tertiary" icon="arrow-right" loading={true}>Some label</PButton>
        <PButton variant="tertiary" icon="arrow-right" disabled={true}>Some label</PButton>
      </div>
      <div
        className="playground light auto-layout"
        title="should render button secondary if tertiary prop is set (deprecated) without label"
      >
        <PButton variant="tertiary" hideLabel={true} icon="arrow-right">Some label</PButton>
        <PButton variant="tertiary" hideLabel={true} icon="arrow-right" loading={true}>Some label</PButton>
        <PButton variant="tertiary" hideLabel={true} icon="arrow-right" disabled={true}>Some label</PButton>
      </div>

      <div className="playground light auto-layout" title="should render button primary with responsive label">
        <PButton hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }} icon="arrow-right"
          >Some label</PButton
        >
      </div>

      <div className="playground light auto-layout" title="should render button with specific icon">
        <PButton icon="delete">Some label</PButton>
        <PButton iconSource="./assets/icon-custom-kaixin.svg">Some label</PButton>
        <PButton icon="delete" variant="primary">Some label</PButton>
        <PButton iconSource="./assets/icon-custom-kaixin.svg" variant="primary">Some label</PButton>
        <PButton icon="delete" variant="tertiary">Some label</PButton>
        <PButton iconSource="./assets/icon-custom-kaixin.svg" variant="tertiary">Some label</PButton>
      </div>

      <div className="playground light auto-layout" title="should render button with multiline label">
        <PButton style={{ width: '15rem' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</PButton>
        <PButton style={{ width: '15rem' }} icon="arrow-right">Lorem ipsum dolor sit amet, consetetur sadipscing</PButton>
        <PButton style={{ width: '15rem' }} icon="arrow-right" loading={true}
          >Lorem ipsum dolor sit amet, consetetur sadipscing</PButton
        >
      </div>

      <div className="playground light auto-layout" title="should render button with centered text/icon if set to 100% width">
        <PButton variant="primary" style={{ width: '100%' }}>Some label</PButton>
        <PButton variant="primary" icon="arrow-right" style={{ width: '100%' }}>Some label</PButton>
        <PButton variant="primary" hideLabel={true} icon="arrow-right" style={{ width: '100%' }}>Some label</PButton>
        <PButton variant="primary" loading={true} style={{ width: '100%' }}>Some label</PButton>
        <PButton variant="primary" disabled={true} style={{ width: '100%' }}>Some label</PButton>
      </div>
    </>
  );
};

export default ButtonPage;
