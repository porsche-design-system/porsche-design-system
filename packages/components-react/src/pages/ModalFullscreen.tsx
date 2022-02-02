/* Auto Generated File */
import { PModal } from '@porsche-design-system/components-react';

export const ModalFullscreenPage = (): JSX.Element => {
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

      <div className="playground light" title="should show fullscreen modal on light background">
        <PModal heading="Some Heading with a very long title across multiple lines" open={true} fullscreen={true}>
          Some Content
        </PModal>
      </div>
    </>
  );
};
