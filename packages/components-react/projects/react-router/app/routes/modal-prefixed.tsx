/* Auto Generated File */
import { PModal, PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';

const ModalPrefixedPage = (): JSX.Element => {
  return (
    <>
      <PorscheDesignSystemProvider prefix="my-prefix">
        <div>
          <PModal heading="Heading" open={true}>Some Content</PModal>
        </div>
      </PorscheDesignSystemProvider>
    </>
  );
};

export default ModalPrefixedPage;
