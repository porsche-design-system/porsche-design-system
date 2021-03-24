import { PButton, PButtonGroup } from '@porsche-design-system/components-react';

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

      <div className="playground light" title="should render button-group with responsive direction">
        <PButtonGroup direction={{ base: 'row', xs: 'column', s: 'row', m: 'column', l: 'row', xl: 'column' }}>
          <PButton variant="primary">Some label</PButton>
          <PButton variant="secondary">Some label</PButton>
          <PButton variant="tertiary">Some label</PButton>
        </PButtonGroup>
      </div>
    </>
  );
};
