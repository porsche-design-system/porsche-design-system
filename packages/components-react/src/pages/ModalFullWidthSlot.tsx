/* Auto Generated File */
import { PContentWrapper, PModal, PText } from '@porsche-design-system/components-react';

export const ModalFullWidthSlotPage = (): JSX.Element => {
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
        <PModal open={true} aria={{ 'aria-label': 'Some Heading' }}>
          <div className="stretch-to-full-modal-width" style={{ background: 'deeppink', height: '60px' }} />
          <PText>Some Content between two full width slotted divs</PText>
          <div className="stretch-to-full-modal-width" style={{ background: 'deeppink', height: '60px' }} />
          <PText>Some Content between two full width slotted divs</PText>
          <div className="stretch-to-full-modal-width" style={{ background: 'deeppink', height: '60px' }} />
        </PModal>
      </div>
    </>
  );
};
