import { useEffect } from 'react';
import { PButton, PModal, PorscheDesignSystemProvider } from '@porsche-design-system/components-react';

export const ModalPrefixedPage = (): JSX.Element => {
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
      <div className="playground light" title="should show prefixed modal on light background">
        <PorscheDesignSystemProvider prefix="my-prefix">
          <PModal heading="Some Heading" open>
            Some Content
          </PModal>
        </PorscheDesignSystemProvider>
      </div>
    </>
  );
};
