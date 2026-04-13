/* Auto Generated File */
import { PHeading, PModal, PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';

const ModalPrefixedPage = () => {
  return (
    <>
      <PorscheDesignSystemProvider prefix="my-prefix">
        <div>
          <PModal open={true}>
            <PHeading slot="header" size="large" tag="h2">Some Heading</PHeading>
            Some Content
          </PModal>
        </div>
      </PorscheDesignSystemProvider>
    </>
  );
};

export default ModalPrefixedPage;
