/* Auto Generated File */
import type { NextPage } from 'next';
import { PAccordion, PLinkPure } from '@porsche-design-system/components-react/ssr';

const AccordionPage: NextPage = (): JSX.Element => {
  const style = `
    @media only screen and (min-width: 760px) {
      #app,
      :host {
        display: grid;
        grid-template-columns: repeat(2, 50%);
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render accordion on light background">
        <PAccordion heading="Heading" />
      </div>

      <div className="playground dark" title="should render accordion on dark background">
        <PAccordion heading="Heading" theme="dark" />
      </div>

      <div className="playground light" title="should render accordion with slotted heading on light background">
        <PAccordion>
          <span slot="heading">Slotted heading</span>
        </PAccordion>
      </div>

      <div className="playground dark" title="should render accordion with slotted heading on dark background">
        <PAccordion theme="dark">
          <span slot="heading">Slotted heading</span>
        </PAccordion>
      </div>

      <div className="playground light" title="should render accordion size medium on light background">
        <PAccordion heading="Heading (size=medium)" size="medium" />
      </div>

      <div className="playground dark" title="should render accordion size medium on dark background">
        <PAccordion heading="Heading (size=medium)" theme="dark" size="medium" />
      </div>

      <div className="playground light" title="should render accordion with breakpoint customizable size on light background">
        <PAccordion
          heading="Heading (size=responsive)"
          size={{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }}
         />
      </div>

      <div className="playground dark" title="should render accordion with breakpoint customizable size on dark background">
        <PAccordion
          heading="Heading (size=responsive)"
          theme="dark"
          size={{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }}
         />
      </div>

      <div
        className="playground light"
        title="should render accordion with long heading that breaks to second line on light background"
      >
        <PAccordion style={{ maxWidth: '400px' }}>
          <span slot="heading">Multiline heading, some extra long heading that should break to the second line</span>
        </PAccordion>
      </div>

      <div
        className="playground dark"
        title="should render accordion with long heading that breaks to second line on dark background"
      >
        <PAccordion theme="dark" style={{ maxWidth: '400px' }}>
          <span slot="heading">Multiline heading, some extra long heading that should break to the second line</span>
        </PAccordion>
      </div>

      <div className="playground light" title="should render multiple accordions with one open on light background">
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

      <div className="playground dark" title="should render multiple accordions with one open on dark background">
        <PAccordion heading="Heading" theme="dark">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PAccordion>
        <PAccordion heading="Heading (open=true)" theme="dark" open={true}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PAccordion>
        <PAccordion heading="Heading" theme="dark">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PAccordion>
      </div>

      <div className="playground light" title="should render multiple compact accordions with one open on light background">
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

      <div className="playground dark" title="should render multiple compact accordions with one open on dark background">
        <PAccordion heading="Heading (compact=true)" compact={true} theme="dark">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PAccordion>
        <PAccordion heading="Heading (compact=true open=true)" compact={true} open={true} theme="dark">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PAccordion>
        <PAccordion heading="Heading (compact=true)" compact={true} theme="dark">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PAccordion>
      </div>

      <div className="playground light" title="should render navigation like accordion on light background">
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

      <div className="playground dark" title="should render navigation like accordion on dark background">
        <PAccordion heading="Navigation Category (compact=true)" compact={true} theme="dark">
          <PLinkPure href="https://www.porsche.com" theme="dark">Some link</PLinkPure>
          <br />
          <PLinkPure href="https://www.porsche.com" theme="dark">Some link</PLinkPure>
        </PAccordion>
        <PAccordion heading="Navigation Category (compact=true open=true)" compact={true} open={true} theme="dark">
          <PLinkPure href="https://www.porsche.com" theme="dark">Some link</PLinkPure>
          <br />
          <PLinkPure href="https://www.porsche.com" theme="dark">Some link</PLinkPure>
        </PAccordion>
      </div>

      <div className="playground light" title="should render compact accordion with size medium on light background">
        <PAccordion heading="Heading (compact=true size=medium)" compact={true} size="medium" />
      </div>

      <div className="playground dark" title="should render compact accordion with size medium on dark background">
        <PAccordion theme="dark" heading="Heading (compact=true size=medium)" compact={true} size="medium" />
      </div>

      <div
        className="playground light"
        title="should render compact accordion with breakpoint customizable size on light background"
      >
        <PAccordion
          heading="Heading (compact=true size=responsive)"
          compact={true}
          size={{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }}
         />
      </div>

      <div
        className="playground dark"
        title="should render compact accordion with breakpoint customizable size on dark background"
      >
        <PAccordion
          theme="dark"
          heading="Heading (compact=true size=responsive)"
          compact={true}
          size={{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }}
         />
      </div>

      <div className="playground light" title="should render accordion with slotted and deeply nested anchor on light background">
        <PAccordion heading="Heading" open={true}>
          <span>
            Some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
            {' '}<em>emphasized</em> and <i>italic</i> text.
          </span>
        </PAccordion>
      </div>

      <div className="playground dark" title="should render accordion with slotted and deeply nested anchor on dark background">
        <PAccordion heading="Heading" open={true} theme="dark">
          <span>
            Some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
            {' '}<em>emphasized</em> and <i>italic</i> text.
          </span>
        </PAccordion>
      </div>

      <div
        className="playground light"
        title="should show correct alignment of accordion icon and link-pure icon on light background"
      >
        <PLinkPure stretch={true} alignLabel="left" href="https://www.porsche.com">Some label</PLinkPure>
        <PAccordion heading="Heading" />
      </div>

      <div
        className="playground dark"
        title="should show correct alignment of accordion icon and link-pure icon on dark background"
      >
        <PLinkPure stretch={true} alignLabel="left" href="https://www.porsche.com" theme="dark">Some label</PLinkPure>
        <PAccordion heading="Heading" theme="dark" />
      </div>
    </>
  );
};

export default AccordionPage;
