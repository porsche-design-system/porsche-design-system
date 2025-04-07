/* Auto Generated File */
import { PDrilldown, PDrilldownItem, PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';

const DrilldownPrefixedPage = (): JSX.Element => {
  return (
    <>
      <PorscheDesignSystemProvider prefix="my-prefix">
        <div>
          <PDrilldown open={true}>
            <PDrilldownItem identifier="id-1" label="Some Label">
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
            </PDrilldownItem>
            <PDrilldownItem identifier="id-2" label="Some Label">
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
            </PDrilldownItem>
            <PDrilldownItem identifier="id-3" label="Some Label">
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
            </PDrilldownItem>
            <PDrilldownItem identifier="id-4" label="Some Label">
              <a href="#some-anchor">Some anchor</a>
            </PDrilldownItem>
            <PDrilldownItem identifier="id-5" label="Some Label">
              <a href="#some-anchor">Some anchor</a>
            </PDrilldownItem>
            <PDrilldownItem identifier="id-6" label="Some Label">
              <a href="#some-anchor">Some anchor</a>
              <a href="#some-anchor">Some anchor</a>
            </PDrilldownItem>
          </PDrilldown>
        </div>
      </PorscheDesignSystemProvider>
    </>
  );
};

export default DrilldownPrefixedPage;
