/* Auto Generated File */
import type { NextPage } from 'next';
import { PContentWrapper, PModal } from '@porsche-design-system/components-react/ssr';

const ModalBasicPage: NextPage = (): JSX.Element => {
  const style = `
    .playground {
      height: 500px;
      padding: 0;
      transform: translate3d(0, 0, 0);
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should show basic modal on light background">
        <PContentWrapper>
          <div style={{ background: 'deeppink', height: '100vh' }} />
        </PContentWrapper>
        <PModal heading="Some Heading" open={true}>Some Content</PModal>
      </div>
    </>
  );
};

export default ModalBasicPage;
