import { shallowMount, Wrapper } from '@vue/test-utils';
import CodeBlock from '@/components/CodeBlock.vue';
import Vuex, { Store } from 'vuex';
import Vue from 'vue';
import { State } from '@/store';
import { Framework } from '@/models';

const tick = async (timeout = 100) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

type PartialState = Pick<State, 'selectedFramework'>;

describe('CodeBlock.vue', () => {
  Vue.use(Vuex);

  const stubs = ['p-text', 'p-tabs-bar'];
  const store: Store<PartialState> = new Vuex.Store({
    state: {
      selectedFramework: 'vanilla-js',
    },
    getters: {
      selectedFramework: (state: PartialState): Framework => state.selectedFramework,
    },
    mutations: {
      setSelectedFramework: (state: PartialState, payload: Framework): void => {
        state.selectedFramework = payload;
      },
    },
  });

  const getTabButton = (wrapper: Wrapper<Vue>, type: Framework): Wrapper<Vue> => {
    return wrapper.findAll('button').at(['vanilla-js', 'angular', 'react'].indexOf(type));
  };

  beforeEach(() => {
    store.commit('setSelectedFramework', 'vanilla-js');
  });

  it('should render Vanilla JS code block by default', () => {
    const wrapper = shallowMount(CodeBlock, {
      stubs,
      store,
      propsData: {
        markup: `<p-some-tag some-attribute="some value">
  <span>some text</span>
</p-some-tag>`,
      },
    });

    const btn = getTabButton(wrapper, 'vanilla-js');
    expect(btn.text()).toBe('Vanilla JS');

    expect(wrapper.find('code').text()).toBe(
      `<p-some-tag some-attribute="some value">
  <span>some text</span>
</p-some-tag>`
    );
  });

  it('should render Angular code block after selecting it', async () => {
    const wrapper = shallowMount(CodeBlock, {
      stubs,
      store,
      propsData: {
        markup: `<p-some-tag some-attribute="some value">
  <span>some text</span>
</p-some-tag>`,
        convertMarkup: true,
      },
    });

    const btn = getTabButton(wrapper, 'angular');
    expect(btn.text()).toBe('Angular');
    expect(btn.classes()).not.toContain('is-active');

    btn.trigger('click');

    await tick();

    expect(wrapper.find('code').text()).toBe(
      `<p-some-tag [someAttribute]="'some value'">
  <span>some text</span>
</p-some-tag>`
    );
  });

  it('should render React code block after selecting it', async () => {
    const wrapper = shallowMount(CodeBlock, {
      stubs,
      store,
      propsData: {
        markup: `<p-some-tag some-attribute="some value">
  <span>some text</span>
</p-some-tag>`,
        convertMarkup: true,
      },
    });

    const btn = getTabButton(wrapper, 'react');
    expect(btn.text()).toBe('React');
    expect(btn.classes()).not.toContain('is-active');

    btn.trigger('click');

    await tick();

    expect(wrapper.find('code').text()).toBe(
      `<PSomeTag someAttribute="some value">
  <span>some text</span>
</PSomeTag>`
    );
  });

  it('should theme code block', async () => {
    const wrapper = shallowMount(CodeBlock, {
      stubs,
      store,
    });

    const block = wrapper.find('.code-block');
    expect(block.classes()).not.toContain('code-block--dark');
    expect(block.classes()).toContain('code-block--light');

    wrapper.setProps({ theme: 'dark' });

    await tick();

    expect(block.classes()).not.toContain('code-block--light');
    expect(block.classes()).toContain('code-block--dark');
  });

  it('should convert code block to Angular syntax', async () => {
    const wrapper = shallowMount(CodeBlock, {
      stubs,
      store,
      propsData: {
        markup: `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" another-attribute="{ bar: 'foo' }" onclick="alert('click'); return false;" digit-attribute="6" boolean-attribute="true">
  <span>some text</span>
  <span slot="some-slot">some slot text</span>
</p-some-tag>`,
        convertMarkup: true,
      },
    });

    getTabButton(wrapper, 'angular').trigger('click');

    await tick();

    expect(wrapper.find('code').text()).toBe(
      `<p-some-tag [someAttribute]="'some value'" [attribute]="'some value'" class="some-class" [anotherAttribute]="{ bar: 'foo' }" (click)="alert('click'); return false;" [digitAttribute]="6" [booleanAttribute]="true">
  <span>some text</span>
  <span slot="some-slot">some slot text</span>
</p-some-tag>`
    );
  });

  it('should convert code block to React syntax', async () => {
    const wrapper = shallowMount(CodeBlock, {
      stubs,
      store,
      propsData: {
        markup: `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" another-attribute="{ bar: 'foo' }" onclick="alert('click'); return false;" digit-attribute="6" boolean-attribute="true">
  <span>some text</span>
</p-some-tag>`,
        convertMarkup: true,
      },
    });

    getTabButton(wrapper, 'react').trigger('click');

    await tick();

    expect(wrapper.find('code').text()).toBe(
      `<PSomeTag someAttribute="some value" attribute="some value" className="some-class" anotherAttribute={{ bar: 'foo' }} onClick={() => { alert('click'); return false; }} digitAttribute={6} booleanAttribute={true}>
  <span>some text</span>
</PSomeTag>`
    );
  });

  it('should remove br tags', () => {
    const wrapper = shallowMount(CodeBlock, {
      stubs,
      store,
      propsData: {
        markup: `<div></div><br><div></div><br><div></div>`,
        convertMarkup: true,
      },
    });

    expect(wrapper.find('code').text()).toBe(`<div></div>
<div></div>
<div></div>`);
  });

  it('should replace multiple new lines', () => {
    const wrapper = shallowMount(CodeBlock, {
      stubs,
      store,
      propsData: {
        markup: `<div></div><br><br><div></div><br><br><br><div></div>`,
        convertMarkup: true,
      },
    });

    expect(wrapper.find('code').text()).toBe(`<div></div>

<div></div>

<div></div>`);
  });
});
