import { PButton, PButtonGroup, PButtonPure } from '@porsche-design-system/components-react';

export const ButtonGroupPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render button-group">
        <PButtonGroup>
          <PButton variant="primary">Some label</PButton>
          <PButton variant="secondary">Some label</PButton>
          <PButton variant="tertiary">Some label</PButton>
        </PButtonGroup>
      </div>

      <div className="playground light" title="should show PButtonGroup default style when direction is undefined">
        <PButtonGroup direction={undefined}>
          <PButton variant="primary">Some label</PButton>
          <PButton variant="secondary">Some label</PButton>
          <PButton variant="tertiary">Some label</PButton>
        </PButtonGroup>
      </div>

      <div className="playground light" title="should render button-group with responsive direction">
        <PButtonGroup direction={{ base: 'row', xs: 'column', s: 'row', m: 'column', l: 'row', xl: 'column' }}>
          <PButton variant="primary">Some label</PButton>
          <PButton variant="secondary">Some label</PButton>
          <PButton variant="tertiary">Some label</PButton>
        </PButtonGroup>
      </div>

      <div
        className="playground light"
        title="should render button-group with PButtonPure, long text PButton and PButton with limited max-width and responsive direction"
        style={{ background: 'deeppink' }}
      >
        <PButtonGroup direction={{ base: 'row', xs: 'column', s: 'row', m: 'column', l: 'row', xl: 'column' }}>
          <PButtonPure>Some label</PButtonPure>
          <PButton hideLabel={true}>Some label</PButton>
          <PButton>Some label</PButton>
          <PButton>Lorem ipsum dolor sit amet, consetetur sadipscing</PButton>
          <PButton>Some label</PButton>
          <PButtonPure>Some label</PButtonPure>
          <PButton>Some label</PButton>
          <PButton>Some label</PButton>
          <PButton style={{ maxWidth: '150px' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</PButton>
          <PButton>Some label</PButton>
          <PButton>Some label</PButton>
          <PButton>Some label</PButton>
        </PButtonGroup>
      </div>
    </>
  );
};
