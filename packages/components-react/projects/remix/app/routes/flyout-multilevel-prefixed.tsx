/* Auto Generated File */
import {
  PFlyoutMultilevel,
  PFlyoutMultilevelItem,
  PorscheDesignSystemProvider,
} from '@porsche-design-system/components-react/ssr';

const FlyoutMultilevelPrefixedPage = (): JSX.Element => {
  return (
    <>
      <PorscheDesignSystemProvider prefix="my-prefix">
        <div>
          <PFlyoutMultilevel open={true}>
            <PFlyoutMultilevelItem identifier="item-1" label="Some Label">
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
            </PFlyoutMultilevelItem>
            <PFlyoutMultilevelItem identifier="item-2" label="Some Label">
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
            </PFlyoutMultilevelItem>
            <PFlyoutMultilevelItem identifier="item-3" label="Some Label">
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
            </PFlyoutMultilevelItem>
            <PFlyoutMultilevelItem identifier="item-4" label="Some Label">
              <a href="#some-anchor">Some anchor</a>
            </PFlyoutMultilevelItem>
            <PFlyoutMultilevelItem identifier="item-5" label="Some Label">
              <a href="#some-anchor">Some anchor</a>
            </PFlyoutMultilevelItem>
            <PFlyoutMultilevelItem identifier="item-6" label="Some Label">
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor" className="scroll-into-view">
                Some anchor
              </a>
            </PFlyoutMultilevelItem>
          </PFlyoutMultilevel>
        </div>
      </PorscheDesignSystemProvider>
    </>
  );
};

export default FlyoutMultilevelPrefixedPage;
