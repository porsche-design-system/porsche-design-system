import { newSpecPage } from '@stencil/core/testing';
import { TextareaWrapper } from '../../../src/components/form/textarea-wrapper/textarea-wrapper';

describe('Component <p-textarea-wrapper>', () => {

  it('should build', () => {
    expect(new TextareaWrapper()).toBeTruthy();
  });

  it('should render correctly in default mode with shadow dom', async (done) => {
    const page = await newSpecPage({
      components: [TextareaWrapper],
      html: `<p-textarea-wrapper label="Some label"><textarea name="some-name"></textarea></p-textarea-wrapper>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-textarea-wrapper__wrapper')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-textarea-wrapper__wrapper')).toBeTruthy();
    expect(page.root).toMatchSnapshot();
    done();
  });

  it('should not render slotted message if no state is set', async (done) => {
    const page = await newSpecPage({
      components: [TextareaWrapper],
      html: `
        <p-textarea-wrapper label="Some label">
          <textarea name="some-name"></textarea>
          <span slot="message">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
        </p-textarea-wrapper>`,
    });
    expect(page.root.shadowRoot.querySelector('.p-textarea-wrapper__message')).toBeFalsy();
    done();
  });

  it('should render message after message is inserted and state is set', async (done) => {
    const page = await newSpecPage({
      components: [TextareaWrapper],
      html: `
        <p-textarea-wrapper label="Some label">
          <textarea name="some-name"></textarea>
        </p-textarea-wrapper>`,
    });

    const component = document.querySelector('p-textarea-wrapper');
    const message = document.createElement('span');
    message.setAttribute('slot', 'message');
    message.innerText = 'Some error text';
    component.appendChild(message);
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('.p-textarea-wrapper__message')).toBeFalsy();

    (component as any).state = 'error';
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('.p-textarea-wrapper__message')).toBeTruthy();
    done();
  });
});
