/* Auto Generated File */
import type { NextPage } from 'next';
import { PAccordion, PLinkPure } from '@porsche-design-system/components-react/ssr';

const AccordionPage: NextPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render accordion">
        <PAccordion heading="Heading" />
      </div>

      <div className="playground light" title="should render accordion with slotted heading">
        <PAccordion>
          <span slot="heading">Slotted heading</span>
        </PAccordion>
      </div>

      <div className="playground light" title="should render accordion size medium">
        <PAccordion heading="Heading (size=medium)" size="medium" />
      </div>

      <div className="playground light" title="should render accordion with breakpoint customizable size">
        <PAccordion
          heading="Heading (size=responsive)"
          size={{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }}
         />
      </div>

      <div className="playground light" title="should render accordion with long heading that breaks to second line">
        <PAccordion style={{ maxWidth: '400px' }}>
          <span slot="heading">Multiline heading, some extra long heading that should break to the second line</span>
        </PAccordion>
      </div>

      <div className="playground light" title="should render multiple accordions with one open">
        <PAccordion heading="Heading">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PAccordion>
        <PAccordion heading="Heading (open=true)" open={true}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PAccordion>
        <PAccordion heading="Heading">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PAccordion>
      </div>

      <div className="playground light" title="should render multiple compact accordions with one open">
        <PAccordion heading="Heading (compact=true)" compact={true}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PAccordion>
        <PAccordion heading="Heading (compact=true open=true)" compact={true} open={true}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PAccordion>
        <PAccordion heading="Heading (compact=true)" compact={true}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PAccordion>
      </div>

      <div className="playground light" title="should render navigation like accordion">
        <PAccordion heading="Navigation Category (compact=true)" compact={true}>
          <PLinkPure href="https://www.porsche.com">Some link</PLinkPure>
          <br />
          <PLinkPure href="https://www.porsche.com">Some link</PLinkPure>
        </PAccordion>
        <PAccordion heading="Navigation Category (compact=true open=true)" compact={true} open={true}>
          <PLinkPure href="https://www.porsche.com">Some link</PLinkPure>
          <br />
          <PLinkPure href="https://www.porsche.com">Some link</PLinkPure>
        </PAccordion>
      </div>

      <div className="playground light" title="should render compact accordion with size medium">
        <PAccordion heading="Heading (compact=true size=medium)" compact={true} size="medium" />
      </div>

      <div className="playground light" title="should render compact accordion with breakpoint customizable size">
        <PAccordion
          heading="Heading (compact=true size=responsive)"
          compact={true}
          size={{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }}
         />
      </div>

      <div className="playground light" title="should render accordion with slotted and deeply nested anchor">
        <PAccordion heading="Heading" open={true}>
          <span>
            Some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
            {' '}<em>emphasized</em> and <i>italic</i> text.
          </span>
        </PAccordion>
      </div>

      <div className="playground light" title="should show correct alignment of accordion icon and link-pure icon">
        <PLinkPure stretch={true} alignLabel="left" href="https://www.porsche.com">Some label</PLinkPure>
        <PAccordion heading="Heading" />
      </div>
    </>
  );
};

export default AccordionPage;
