/* Auto Generated File */
import type { NextPage } from 'next';
import { PContentWrapper, PModal } from '@porsche-design-system/components-react/ssr';

const ModalFullscreenBreakpointPage: NextPage = (): JSX.Element => {
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

      <div className="playground light" title="should show fullscreen breakpoint modal on light background">
        <PContentWrapper>
          <div style={{ background: 'deeppink', height: '100vh' }} />
        </PContentWrapper>
        <PModal
          heading="Some Heading with a very long title across multiple lines"
          open={true}
          fullscreen={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          Some Content
        </PModal>
      </div>
    </>
  );
};

export default ModalFullscreenBreakpointPage;
