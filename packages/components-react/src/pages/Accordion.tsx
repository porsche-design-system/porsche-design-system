import { PAccordion } from '@porsche-design-system/components-react';

export const AccordionPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render accordion on light background">
        <PAccordion heading="Some heading">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
      </div>

      <div className="playground dark" title="should render accordion on dark background">
        <PAccordion heading="Some heading" theme="dark">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
      </div>

      <div className="playground light" title="should render accordion with slotted heading on light background">
        <PAccordion>
          <span slot="heading">Some heading</span>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
      </div>

      <div className="playground dark" title="should render accordion with slotted heading on dark background">
        <PAccordion theme="dark">
          <span slot="heading">Some heading</span>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
      </div>

      <div className="playground light" title="should render accordion open on light background">
        <PAccordion heading="Some heading" open>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
      </div>

      <div className="playground dark" title="should render accordion open on dark background">
        <PAccordion heading="Some heading" theme="dark" open>
          <p style={{ color: 'white' }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
      </div>

      <div className="playground light" title="should render accordion size medium on light background">
        <PAccordion heading="Some heading" size="medium">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
      </div>

      <div className="playground dark" title="should render accordion size medium on dark background">
        <PAccordion heading="Some heading" theme="dark" size="medium">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
      </div>

      <div
        className="playground light"
        title="should render accordion with breakpoint customizable size on light background"
      >
        <PAccordion heading="Some heading" size={{ base: 'small', m: 'medium', l: 'small' }}>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
      </div>

      <div
        className="playground dark"
        title="should render accordion with breakpoint customizable size on dark background"
      >
        <PAccordion heading="Some heading" theme="dark" size={{ base: 'small', m: 'medium', l: 'small' }}>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
      </div>

      <div className="playground light" title="should render accordion weight regular on light background">
        <PAccordion heading="Some heading" weight="regular">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
      </div>

      <div className="playground dark" title="should render accordion weight regular on dark background">
        <PAccordion heading="Some heading" theme="dark" weight="regular">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
      </div>

      <div
        className="playground light"
        title="should render accordion weight regular and size medium on light background"
      >
        <PAccordion heading="Some heading" weight="regular" size="medium">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
      </div>

      <div
        className="playground dark"
        title="should render accordion weight regular and size medium on dark background"
      >
        <PAccordion heading="Some heading" theme="dark" weight="regular" size="medium">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
      </div>

      <div style={{ width: '400px' }}>
        <div
          className="playground light"
          title="should render accordion with long heading that breaks to second line on light background"
        >
          <PAccordion heading="Some extra long heading that should break to the second line">
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
              et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            </p>
          </PAccordion>
        </div>

        <div
          className="playground dark"
          title="should render accordion with long heading that breaks to second line on dark background"
        >
          <PAccordion heading="Some extra long heading that should break to the second line" theme="dark">
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
              et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            </p>
          </PAccordion>
        </div>
      </div>

      <div className="playground light" title="should render multiple accordions with one open on light background">
        <PAccordion heading="Some heading">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
        <PAccordion heading="Some heading" open>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
        <PAccordion heading="Some heading">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
      </div>

      <div className="playground dark" title="should render multiple accordions with one open on dark background">
        <PAccordion heading="Some heading" theme="dark">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
        <PAccordion heading="Some heading" theme="dark" open>
          <p style={{ color: 'white' }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
        <PAccordion heading="Some heading" theme="dark">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PAccordion>
      </div>
    </>
  );
};
