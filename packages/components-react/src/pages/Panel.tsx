import { PPanel } from '@porsche-design-system/components-react';

export const PanelPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render panel on light background">
        <PPanel heading="Some heading">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
      </div>

      <div className="playground dark" title="should render panel on dark background">
        <PPanel heading="Some heading" theme="dark">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
      </div>

      <div className="playground light" title="should render panel with slotted heading on light background">
        <PPanel>
          <span slot="heading">Some heading</span>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
      </div>

      <div className="playground dark" title="should render panel with slotted heading on dark background">
        <PPanel theme="dark">
          <span slot="heading">Some heading</span>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
      </div>

      <div className="playground light" title="should render panel open on light background">
        <PPanel heading="Some heading" open>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
      </div>

      <div className="playground dark" title="should render panel open on dark background">
        <PPanel heading="Some heading" theme="dark" open>
          <p style={{ color: 'white' }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
      </div>

      <div className="playground light" title="should render panel size medium on light background">
        <PPanel heading="Some heading" size="medium">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
      </div>

      <div className="playground dark" title="should render panel size medium on dark background">
        <PPanel heading="Some heading" theme="dark" size="medium">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
      </div>

      <div
        className="playground light"
        title="should render panel with breakpoint customizable size on light background"
      >
        <PPanel heading="Some heading" size={{ base: 'small', m: 'medium', l: 'small' }}>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
      </div>

      <div className="playground dark" title="should render panel with breakpoint customizable size on dark background">
        <PPanel heading="Some heading" theme="dark" size={{ base: 'small', m: 'medium', l: 'small' }}>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
      </div>

      <div className="playground light" title="should render panel weight regular on light background">
        <PPanel heading="Some heading" weight="regular">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
      </div>

      <div className="playground dark" title="should render panel weight regular on dark background">
        <PPanel heading="Some heading" theme="dark" weight="regular">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
      </div>

      <div className="playground light" title="should render panel weight regular and size medium on light background">
        <PPanel heading="Some heading" weight="regular" size="medium">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
      </div>

      <div className="playground dark" title="should render panel weight regular and size medium on dark background">
        <PPanel heading="Some heading" theme="dark" weight="regular" size="medium">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
      </div>

      <div className="playground light" title="should render multiple panels with one open on light background">
        <PPanel heading="Some heading">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
        <PPanel heading="Some heading" open>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
        <PPanel heading="Some heading">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
      </div>

      <div className="playground dark" title="should render multiple panels with one open on dark background">
        <PPanel heading="Some heading" theme="dark">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
        <PPanel heading="Some heading" theme="dark" open>
          <p style={{ color: 'white' }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
        <PPanel heading="Some heading" theme="dark">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
        </PPanel>
      </div>
    </>
  );
};
