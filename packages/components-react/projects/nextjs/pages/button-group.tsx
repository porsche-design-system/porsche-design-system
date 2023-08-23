/* Auto Generated File */
import type { NextPage } from 'next';
import { PButton, PButtonGroup, PButtonPure } from '@porsche-design-system/components-react/ssr';

const ButtonGroupPage: NextPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render button-group">
        <PButtonGroup>
          <PButton variant="primary">Some label</PButton>
          <PButton variant="secondary">Some label</PButton>
          <PButton variant="secondary" icon="arrow-right">Some label</PButton>
        </PButtonGroup>
      </div>

      <div className="playground light" title="should render button-group with responsive direction">
        <PButtonGroup direction={{ base: 'row', xs: 'column', s: 'row', m: 'column', l: 'row', xl: 'column' }}>
          <PButton variant="primary">Some label</PButton>
          <PButton variant="secondary">Some label</PButton>
          <PButton variant="secondary" icon="arrow-right">Some label</PButton>
          <PButtonPure>Some label</PButtonPure>
        </PButtonGroup>
      </div>

      <div
        className="playground light"
        title="should render button-group with p-button-pure, long text p-button and p-button with limited max-width and responsive direction"
      >
        <PButtonGroup direction={{ base: 'row', xs: 'column', s: 'row', m: 'column', l: 'row', xl: 'column' }}>
          <PButtonPure>Some label</PButtonPure>
          <PButton hideLabel={true} icon="arrow-right">Some label</PButton>
          <PButton>Some label</PButton>
          <PButton icon="arrow-right">Lorem ipsum dolor sit amet, consetetur sadipscing</PButton>
          <PButton>Some label</PButton>
          <PButtonPure>Some label</PButtonPure>
          <PButton>Some label</PButton>
          <PButton>Some label</PButton>
          <PButton style={{ maxWidth: '15rem' }} icon="arrow-right">Lorem ipsum dolor sit amet, consetetur sadipscing</PButton>
          <PButton>Some label</PButton>
          <PButton>Some label</PButton>
          <PButton icon="arrow-right">Some label</PButton>
        </PButtonGroup>
      </div>
    </>
  );
};

export default ButtonGroupPage;
