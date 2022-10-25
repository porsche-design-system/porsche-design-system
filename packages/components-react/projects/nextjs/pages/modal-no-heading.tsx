/* Auto Generated File */
import type { NextPage } from 'next';
import { PContentWrapper, PModal } from '@porsche-design-system/components-react/ssr';

const ModalNoHeadingPage: NextPage = (): JSX.Element => {
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

      <div className="playground light" title="should display close button on the correct position without a heading">
        <PContentWrapper>
          <div style={{ background: 'deeppink', height: '100vh' }} />
        </PContentWrapper>
        <PModal open={true} aria={{ 'aria-label': 'Some Heading' }}>
          Some Content without a heading that will be covered by the close button
        </PModal>
      </div>
    </>
  );
};

export default ModalNoHeadingPage;
