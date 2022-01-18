import { PContentWrapper, PModal } from '@porsche-design-system/components-react';

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
      <div
        className="playground light"
        title="should display a full width image when using .stretch-to-full-modal-width"
      >
        <PContentWrapper>
          <div style={{ background: 'deeppink', height: '100vh' }} />
        </PContentWrapper>
        <PModal open>
          <div className="stretch-to-full-modal-width">
            <div style={{ background: 'deeppink', width: '100%', height: 200 }}></div>
          </div>
          Some Content below a full width slotted div
        </PModal>
      </div>
    </>
  );
};
