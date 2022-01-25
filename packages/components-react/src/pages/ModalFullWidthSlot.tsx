import { PContentWrapper, PModal, PText } from '@porsche-design-system/components-react';

export const ModalFullWidthSlot = (): JSX.Element => {
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
      <div className="playground light" title="should display a full width div when using .stretch-to-full-modal-width">
        <PContentWrapper>
          <div style={{ background: 'deeppink', height: '100vh' }} />
        </PContentWrapper>
        <PModal open aria={{ 'aria-label': 'Some Headline' }}>
          <div className="stretch-to-full-modal-width" style={{ background: 'deeppink', height: 50 }}></div>
          <PText>Some Content between two full width slotted divs</PText>
          <div className="stretch-to-full-modal-width" style={{ background: 'deeppink', height: 50 }}></div>
          <PText>Some Content between two full width slotted divs</PText>
          <div className="stretch-to-full-modal-width" style={{ background: 'deeppink', height: 50 }}></div>
        </PModal>
      </div>
    </>
  );
};
