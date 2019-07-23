import {shallowMount} from '@vue/test-utils';
import CodeBlock from '@/components/CodeBlock.vue';

describe('CodeBlock.vue', () => {
  it('should render Vanilla JS code block by default', () => {
    const wrapper = shallowMount(CodeBlock, {
      propsData: {
        markup:
`<p-some-tag some-attribute="some value">
  <span>some text</span>
</p-some-tag>`
      }
    });

    expect(wrapper.find('.tabs li:nth-child(1)').text()).toBe('Vanilla JS');
    expect(wrapper.find('.tabs li:nth-child(1)').classes()).toContain('is-active');
    expect(wrapper.find('code').text()).toBe(
`<p-some-tag some-attribute="some value">
  <span>some text</span>
</p-some-tag>`
    );
  });

  it('should render Angular code block after selecting it', () => {
    const wrapper = shallowMount(CodeBlock, {
      propsData: {
        markup:
`<p-some-tag some-attribute="some value">
  <span>some text</span>
</p-some-tag>`
      }
    });

    expect(wrapper.find('.tabs li:nth-child(2)').text()).toBe('Angular');
    expect(wrapper.find('.tabs li:nth-child(2)').classes()).not.toContain('is-active');

    wrapper.find('.tabs li:nth-child(2)').trigger('click');

    expect(wrapper.find('.tabs li:nth-child(2)').classes()).toContain('is-active');
    expect(wrapper.find('code').text()).toBe(
`<p-some-tag someAttribute="some value">
  <span>some text</span>
</p-some-tag>`
    );
  });

  it('should render React code block after selecting it', () => {
    const wrapper = shallowMount(CodeBlock, {
      propsData: {
        markup:
`<p-some-tag some-attribute="some value">
  <span>some text</span>
</p-some-tag>`
      }
    });

    expect(wrapper.find('.tabs li:nth-child(3)').text()).toBe('React');
    expect(wrapper.find('.tabs li:nth-child(3)').classes()).not.toContain('is-active');

    wrapper.find('.tabs li:nth-child(3)').trigger('click');

    expect(wrapper.find('.tabs li:nth-child(3)').classes()).toContain('is-active');
    expect(wrapper.find('code').text()).toBe(
`<PSomeTag someAttribute="some value">
  <span>some text</span>
</PSomeTag>`);
  });

  it('should theme code block', () => {
    const wrapper = shallowMount(CodeBlock);

    expect(wrapper.find('.code-block').classes()).not.toContain('dark');
    expect(wrapper.find('.code-block').classes()).toContain('light');

    wrapper.setProps({theme: 'dark'});

    expect(wrapper.find('.code-block').classes()).not.toContain('light');
    expect(wrapper.find('.code-block').classes()).toContain('dark');
  });

  it('should beautify code block', () => {
    const wrapper = shallowMount(CodeBlock, {
      propsData: {
        markup:
`<p-some-tag     some-attribute="some value"    class="some-class"   >
                          <span       >some text</span>
                </p-some-tag>`
      }
    });

    expect(wrapper.find('code').text()).toBe(
`<p-some-tag some-attribute="some value" class="some-class">
  <span>some text</span>
</p-some-tag>`
    );
  });

  it('should remove Vue JS specific attributes from code block', () => {
    const wrapper = shallowMount(CodeBlock, {
      propsData: {
        markup:
`<p-some-tag data-v-c6a10ac0="" data-v-8dbc1b2a='' data-v-7ba5bd90 some-attribute="some value" class="some-class">
  <span>some text</span>
</p-some-tag>`
      }
    });

    expect(wrapper.find('code').text()).toBe(
`<p-some-tag some-attribute="some value" class="some-class">
  <span>some text</span>
</p-some-tag>`
    );
  });

  it('should remove Stencil JS css classes from code block', () => {
    const wrapper = shallowMount(CodeBlock, {
      propsData: {
        markup:
`<p-some-tag some-attribute="some value" class="hydrated">
  <span>some text</span>
</p-some-tag>`
      }
    });

    expect(wrapper.find('code').text()).toBe(
`<p-some-tag some-attribute="some value">
  <span>some text</span>
</p-some-tag>`
    );

    wrapper.setProps({
      markup:
`<p-some-tag some-attribute="some value" class="some-class hydrated another-class">
  <span>some text</span>
</p-some-tag>`
    });

    expect(wrapper.find('code').text()).toBe(
`<p-some-tag some-attribute="some value" class="some-class another-class">
  <span>some text</span>
</p-some-tag>`
    );
  });

  it('should convert code block to Angular syntax', () => {
    const wrapper = shallowMount(CodeBlock, {
      propsData: {
        markup:
`<p-some-tag some-attribute="some value" attribute='some value' class="some-class">
  <span>some text</span>
</p-some-tag>`
      }
    });

    wrapper.find('.tabs li:nth-child(2)').trigger('click');

    expect(wrapper.find('code').text()).toBe(
`<p-some-tag someAttribute="some value" attribute="some value" class="some-class">
  <span>some text</span>
</p-some-tag>`
    );
  });

  it('should convert code block to React syntax', () => {
    const wrapper = shallowMount(CodeBlock, {
      propsData: {
        markup:
`<p-some-tag bar='{ "bar" : "foo" }' some-attribute="some value" attribute='some value' class="some-class">
  <span>some text</span>
</p-some-tag>`
      }
    });

    wrapper.find('.tabs li:nth-child(3)').trigger('click');

    expect(wrapper.find('code').text()).toBe(
`<PSomeTag bar={ "bar" : "foo" } someAttribute="some value" attribute="some value" className="some-class">
  <span>some text</span>
</PSomeTag>`
    );
  });
});
