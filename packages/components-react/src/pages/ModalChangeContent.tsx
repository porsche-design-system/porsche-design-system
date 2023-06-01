/* Auto Generated File */
import { PButton, PButtonGroup, PCheckboxWrapper, PModal, PText } from '@porsche-design-system/components-react';
import { useEffect } from 'react';
import { pollComponentsReady } from '../pollComponentsReady';

export const ModalChangeContentPage = (): JSX.Element => {
  useEffect(() => {
    load();

        const debugElement = document.querySelector('p');
        (debugElement as any).innerText = 'hello world';

        const modal = document.querySelector('p-modal');
        modal.addEventListener('dismiss', () => {
          (modal as any).open = false;
        });
        document.querySelector('p-button').addEventListener('click', () => ((modal as any).open = true));
        document.querySelector('.input1').addEventListener('click', () => ((debugElement as any).innerText = 'Checkbox change'));
  }, []);

  return (
    <>
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Title</title>
        </head>
        <body>
          <PButton type="button" aria={{ 'aria-haspopup': 'dialog' }}>Open Modal</PButton>
          <PModal
            heading="Some Heading"
            open={true}
            aria={{ 'aria-label': 'Some Heading' }}
            fullscreen={{ base: true, s: false }}
          >
            <PText>Some Content</PText>
            <div style={{ height: '70vh' }} />
            <PText>
              More Content
              <p>value</p>
            </PText>
            <PCheckboxWrapper label="Some label" hideLabel={false}>
              <input className="input1" type="checkbox" name="some-name-1" />
            </PCheckboxWrapper>
            <div style={{ height: '40vh' }} />
            <PButtonGroup>
              <PButton type="button">Save</PButton>
              <PButton type="button" variant="tertiary" icon="close">Close</PButton>
            </PButtonGroup>
          </PModal>
      </body>
      </html>
    </>
  );
};
