import { getPrefixedComponents } from '@porsche-design-system/components-react/prefixed-components';
import React, { useEffect } from 'react';

const { PButton: PrefixedButton, PModal: PrefixedModal, PModalFooter: PrefixedModalFooter } = getPrefixedComponents({
  prefix: 'my-prefix'
});

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
        <PrefixedModal heading="Some Heading" open>
          Some Content
          <PrefixedModalFooter>
            <PrefixedButton>Confirm</PrefixedButton>
            <PrefixedButton variant="tertiary">Cancel</PrefixedButton>
          </PrefixedModalFooter>
        </PrefixedModal>
      </div>
    </>
  );
};
