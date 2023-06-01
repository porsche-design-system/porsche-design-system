/* Auto Generated File */
import type { NextPage } from 'next';
import { PButton, PButtonGroup, PCheckboxWrapper, PModal, PText } from '@porsche-design-system/components-react/ssr';
import { useEffect } from 'react';
import { componentsReady } from '@porsche-design-system/components-react/ssr';

/**
 * Since React 18, using componentsReady() within useEffect() constantly resolves with `0` in headless Chrome.
 * Therefore, we make it poll and check that more than `0` components are ready.
 */
export const pollComponentsReady = async (): Promise<number> => {
  const amount = await componentsReady();
  if (amount === 0) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return pollComponentsReady();
  } else {
    return amount;
  }
};


const ModalChangeContentPage: NextPage = (): JSX.Element => {
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

export default ModalChangeContentPage;
