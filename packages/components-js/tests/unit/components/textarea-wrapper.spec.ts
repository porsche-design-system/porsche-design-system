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
});
