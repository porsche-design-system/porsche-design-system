import { PModal } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ModalBasicPage = (): JSX.Element => {
  useEffect(() => {
    document.body.style.height = '500px';
  }, []);

  const style = `
    .playground {
      height: 500px;
      padding: 0;
    }
  `;

  return (
    <>
      <style children={style} />
      <div className="playground light" title="should show basic modal on light background">
        <PModal heading="Some Heading" open>
          Some Content
        </PModal>
      </div>
    </>
  );
};
