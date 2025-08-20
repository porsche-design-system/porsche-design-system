/* Auto Generated File */
import { PHeading, PorscheDesignSystemProvider, PSheet, PText } from '@porsche-design-system/components-react/ssr';

const SheetPrefixedPage = (): JSX.Element => {
  return (
    <>
      <PorscheDesignSystemProvider prefix="my-prefix">
        <div>
          <PSheet open={true} aria={{ 'aria-label': 'Some Heading' }}>
            <PHeading slot="header" size="large" tag="h2">Some Heading</PHeading>
            <PText>Some Content</PText>
          </PSheet>
        </div>
      </PorscheDesignSystemProvider>
    </>
  );
};

export default SheetPrefixedPage;
