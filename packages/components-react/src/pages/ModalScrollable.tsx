import {
  PModal as Modal,
  PButton as Button,
  PModalFooter as ModalFooter
} from '@porsche-design-system/components-react';
import React, { useEffect } from 'react';

export const ModalScrollablePage = (): JSX.Element => {
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
      <div className="playground light" title="should show scrollable modal on light background">
        <Modal heading="Some Heading with a very long title across multiple lines" open>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
          clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
          consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
          <br />
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
          clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
          consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
          <ModalFooter>
            <Button>Confirm</Button>
            <Button variant="tertiary">Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};
