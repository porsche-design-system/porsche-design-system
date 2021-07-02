import { PAccordion } from '@porsche-design-system/components-react';

export const AccordionPage = (): JSX.Element => {
  const content =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ' +
    'dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.';

  return (
    <>
      <div className="playground light" title="should render accordion on light background">
        <PAccordion heading="Some heading">{content}</PAccordion>
      </div>

      <div className="playground dark" title="should render accordion on dark background">
        <PAccordion heading="Some heading" theme="dark">
          {content}
        </PAccordion>
      </div>

      <div className="playground light" title="should render accordion with slotted heading on light background">
        <PAccordion>
          <span slot="heading">Some slotted heading</span>
          {content}
        </PAccordion>
      </div>

      <div className="playground dark" title="should render accordion with slotted heading on dark background">
        <PAccordion theme="dark">
          <span slot="heading">Some slotted heading</span>
          {content}
        </PAccordion>
      </div>

      <div className="playground light" title="should render accordion size medium on light background">
        <PAccordion heading="Some heading size medium" size="medium">
          {content}
        </PAccordion>
      </div>

      <div className="playground dark" title="should render accordion size medium on dark background">
        <PAccordion heading="Some heading size medium" theme="dark" size="medium">
          {content}
        </PAccordion>
      </div>

      <div
        className="playground light"
        title="should render accordion with breakpoint customizable size on light background"
      >
        <PAccordion
          heading="Some heading responsive size"
          size={{ base: 'small', xs: 'small', s: 'medium', m: 'small', l: 'medium', xl: 'small' }}
        >
          {content}
        </PAccordion>
      </div>

      <div
        className="playground dark"
        title="should render accordion with breakpoint customizable size on dark background"
      >
        <PAccordion
          heading="Some heading responsive size"
          theme="dark"
          size={{ base: 'small', xs: 'small', s: 'medium', m: 'small', l: 'medium', xl: 'small' }}
        >
          {content}
        </PAccordion>
      </div>

      <div
        className="playground light"
        title="should render accordion with long heading that breaks to second line on light background"
        style={{ maxWidth: '400px' }}
      >
        <PAccordion>
          <span slot="heading" style={{ background: 'deeppink' }}>
            Some extra long heading that should break to the second line
          </span>
          {content}
        </PAccordion>
      </div>

      <div
        className="playground dark"
        title="should render accordion with long heading that breaks to second line on dark background"
        style={{ maxWidth: '400px' }}
      >
        <PAccordion theme="dark">
          <span slot="heading" style={{ background: 'deeppink' }}>
            Some extra long heading that should break to the second line
          </span>
          {content}
        </PAccordion>
      </div>

      <div className="playground light" title="should render multiple accordions with one open on light background">
        <PAccordion heading="Some heading">{content}</PAccordion>
        <PAccordion heading="Some heading" open>
          {content}
        </PAccordion>
      </div>

      <div className="playground dark" title="should render multiple accordions with one open on dark background">
        <PAccordion heading="Some heading" theme="dark">
          {content}
        </PAccordion>
        <PAccordion heading="Some heading" theme="dark" open>
          <div style={{ color: 'white' }}>{content}</div>
        </PAccordion>
      </div>
    </>
  );
};
