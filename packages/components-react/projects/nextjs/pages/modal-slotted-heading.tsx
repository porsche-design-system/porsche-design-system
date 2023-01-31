/* Auto Generated File */
import type { NextPage } from 'next';
import { PContentWrapper, PHeading, PModal, PText } from '@porsche-design-system/components-react/ssr';

const ModalSlottedHeadingPage: NextPage = (): JSX.Element => {
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

      <div className="playground light" title="should display slotted heading">
        <PContentWrapper>
          <div style={{ background: 'deeppink', height: '100vh' }} />
        </PContentWrapper>
        <PModal open={true} aria={{ 'aria-label': 'Slotted Headline' }}>
          <div slot="heading">
            <PText tag="div" role="doc-subtitle">Slotted Subtitle</PText>
            <PHeading tag="h2">Slotted Headline</PHeading>
          </div>
          Some Content
        </PModal>
      </div>
    </>
  );
};

export default ModalSlottedHeadingPage;
