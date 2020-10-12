import {
  PModal as Modal,
  PButton as Button,
  PModalFooter as ModalFooter
} from '@porsche-design-system/components-react';
import React, { useEffect } from 'react';

export const ModalFooterPage = (): JSX.Element => {
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
      <div
        className="playground light"
        title="should show modal with footer and without close button on light background"
      >
        <Modal heading="Some Heading" open disableCloseButton>
          Some Content
          <ModalFooter>
            <Button>Confirm</Button>
            <Button variant="tertiary">Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};
