/* Auto Generated File */
import type { NextPage } from 'next';
import { PContentWrapper, PModal, PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';

const ModalPrefixedPage: NextPage = (): JSX.Element => {
  const style = `
    .playground {
      height: 500px;
      padding: 0;
      transform: translate3d(0, 0, 0);
    }
  `;

  return (
    <PorscheDesignSystemProvider prefix="my-prefix">
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should show prefixed modal on light background">
        <PContentWrapper width="basic">
          <div style={{ background: 'deeppink', height: '100vh' }} />
        </PContentWrapper>
        <PModal heading="Some Heading" open={true}>Some Content</PModal>
      </div>

      <div className="visualize-grid">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </PorscheDesignSystemProvider>
  );
};

export default ModalPrefixedPage;
