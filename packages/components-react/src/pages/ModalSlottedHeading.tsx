/* Auto Generated File */
// @ts-nocheck
import { PContentWrapper, PHeadline, PModal, PText } from '@porsche-design-system/components-react';

export const ModalSlottedHeadingPage = (): JSX.Element => {
  const style = `
    .playground {
      height: 500px;
      padding: 0;
      transform: translate3d(0, 0, 0);
    }
  `;

  return (
    <>
      <style children={style} />

      <div className="playground light" title="should display slotted heading">
        <PContentWrapper>
          <div style={{ background: 'deeppink', height: '100vh' }} />
        </PContentWrapper>
        <PModal open={true} aria={{'aria-label': 'Slotted Headline'}}>
          <div slot="heading">
            <PText tag="div" role="doc-subtitle">Slotted Subtitle</PText>
            <PHeadline tag="h2">Slotted Headline</PHeadline>
          </div>
          Some Content
        </PModal>
      </div>
    </>
  );
};
