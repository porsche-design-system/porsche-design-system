/* Auto Generated File */
import { PDrilldown, PDrilldownButton, PDrilldownItem, PDrilldownLink, PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';

const DrilldownPrefixedPage = (): JSX.Element => {
  return (
    <>
      <PorscheDesignSystemProvider prefix="my-prefix">
        <div>
          <PDrilldown open={true}>
            <PDrilldownItem identifier="id-1" label="Some Label">
              <PDrilldownButton slot="button">Some Label</PDrilldownButton>
              <PDrilldownLink href="#some-anchor">Some anchor</PDrilldownLink>
              <PDrilldownLink href="#some-anchor">Some anchor</PDrilldownLink>
              <PDrilldownLink href="#some-anchor">Some anchor</PDrilldownLink>
              <PDrilldownLink href="#some-anchor">Some anchor</PDrilldownLink>
              <PDrilldownLink href="#some-anchor">Some anchor</PDrilldownLink>
            </PDrilldownItem>
            <PDrilldownItem identifier="id-2" label="Some Label">
              <PDrilldownButton slot="button">Some Label</PDrilldownButton>
              <PDrilldownLink href="#some-anchor">Some anchor</PDrilldownLink>
              <PDrilldownLink href="#some-anchor">Some anchor</PDrilldownLink>
              <PDrilldownLink href="#some-anchor">Some anchor</PDrilldownLink>
            </PDrilldownItem>
            <PDrilldownItem identifier="id-3" label="Some Label">
              <PDrilldownButton slot="button">Some Label</PDrilldownButton>
              <PDrilldownLink href="#some-anchor">Some anchor</PDrilldownLink>
              <PDrilldownLink href="#some-anchor">Some anchor</PDrilldownLink>
            </PDrilldownItem>
            <PDrilldownItem identifier="id-4" label="Some Label">
              <PDrilldownButton slot="button">Some Label</PDrilldownButton>
              <PDrilldownLink href="#some-anchor">Some anchor</PDrilldownLink>
            </PDrilldownItem>
            <PDrilldownItem identifier="id-5" label="Some Label">
              <PDrilldownButton slot="button">Some Label</PDrilldownButton>
              <PDrilldownLink href="#some-anchor">Some anchor</PDrilldownLink>
            </PDrilldownItem>
            <PDrilldownItem identifier="id-6" label="Some Label">
              <PDrilldownButton slot="button">Some Label</PDrilldownButton>
              <PDrilldownLink href="#some-anchor">Some anchor</PDrilldownLink>
              <PDrilldownLink href="#some-anchor">Some anchor</PDrilldownLink>
            </PDrilldownItem>
          </PDrilldown>
        </div>
      </PorscheDesignSystemProvider>
    </>
  );
};

export default DrilldownPrefixedPage;
