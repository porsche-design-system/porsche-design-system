/* Auto Generated File */
import { PFlyoutMultilevel, PFlyoutMultilevelItem, PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';

const FlyoutMultilevelPrefixedPage = (): JSX.Element => {
  return (
    <>
      <PorscheDesignSystemProvider prefix="my-prefix">
        <div>
          <PFlyoutMultilevel open={true}>
            <PFlyoutMultilevelItem identifier="id-1" label="Some Label">
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
            </PFlyoutMultilevelItem>
            <PFlyoutMultilevelItem identifier="id-2" label="Some Label">
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
            </PFlyoutMultilevelItem>
            <PFlyoutMultilevelItem identifier="id-3" label="Some Label">
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
            </PFlyoutMultilevelItem>
            <PFlyoutMultilevelItem identifier="id-4" label="Some Label">
              <a href="#some-anchor">Some anchor</a>
            </PFlyoutMultilevelItem>
            <PFlyoutMultilevelItem identifier="id-5" label="Some Label">
              <a href="#some-anchor">Some anchor</a>
            </PFlyoutMultilevelItem>
            <PFlyoutMultilevelItem identifier="id-6" label="Some Label">
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
            </PFlyoutMultilevelItem>
          </PFlyoutMultilevel>
        </div>
      </PorscheDesignSystemProvider>
    </>
  );
};

export default FlyoutMultilevelPrefixedPage;
