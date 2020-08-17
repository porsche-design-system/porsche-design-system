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

  const stubs = ['p-text'];
  const store: Store<PartialState> = new Vuex.Store({
    state: {
      selectedFramework: 'vanilla-js'
    },
    getters: {
      selectedFramework: (state: PartialState) => state.selectedFramework
    },
    mutations: {
      setSelectedFramework: (state: PartialState, payload: Framework): void => {
        state.selectedFramework = payload;
      }
    }
  });

  const getTabButton = (wrapper: Wrapper<Vue>, type: 'vanillajs' | 'angular' | 'react'): Wrapper<Vue> =>
    wrapper.find(`.tabs .tab:nth-child(${['vanillajs', 'angular', 'react'].indexOf(type) + 1}) button`);

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
</p-some-tag>`
      }
    });

    const btn = getTabButton(wrapper, 'vanillajs');
    expect(btn.text()).toBe('Vanilla JS');
    expect(btn.classes()).toContain('is-active');
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
</p-some-tag>`
      }
    });

    const btn = getTabButton(wrapper, 'angular');
    expect(btn.text()).toBe('Angular');
    expect(btn.classes()).not.toContain('is-active');

    btn.trigger('click');

    await tick();

    expect(btn.classes()).toContain('is-active');
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
</p-some-tag>`
      }
    });

    const btn = getTabButton(wrapper, 'react');
    expect(btn.text()).toBe('React');
    expect(btn.classes()).not.toContain('is-active');

    btn.trigger('click');

    await tick();

    expect(btn.classes()).toContain('is-active');
    expect(wrapper.find('code').text()).toBe(
      `<PSomeTag someAttribute="some value">
  <span>some text</span>
</PSomeTag>`
    );
  });

  it('should theme code block', async () => {
    const wrapper = shallowMount(CodeBlock, {
      stubs,
      store
    });

    const block = wrapper.find('.code-block');
    expect(block.classes()).not.toContain('dark');
    expect(block.classes()).toContain('light');

    wrapper.setProps({ theme: 'dark' });

    await tick();

    expect(block.classes()).not.toContain('light');
    expect(block.classes()).toContain('dark');
  });

  it('should remove empty comments', () => {
    const wrapper = shallowMount(CodeBlock, {
      stubs,
      store,
      propsData: {
        markup: `<p-some-tag some-attribute="some value" class="some-class">
  <!----><span>some text</span><!-- some comment -->
</p-some-tag>`
      }
    });

    expect(wrapper.find('code').text()).toBe(
      `<p-some-tag some-attribute="some value" class="some-class">
  <span>some text</span><!-- some comment -->
</p-some-tag>`
    );
  });

  it('should beautify code block', () => {
    const wrapper = shallowMount(CodeBlock, {
      stubs,
      store,
      propsData: {
        markup: `<p-some-tag     some-attribute="some value"    class="some-class"   >
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
      stubs,
      store,
      propsData: {
        markup: `<p-some-tag data-v-c6a10ac0="" data-v-8dbc1b2a='' data-v-7ba5bd90 some-attribute="some value" class="some-class">
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

  it('should remove default web components attributes from code block', () => {
    const wrapper = shallowMount(CodeBlock, {
      stubs,
      store,
      propsData: {
        markup: `<p-some-tag theme="light" some-attribute="some value" class="some-class"></p-some-tag>
<p-some-tag theme="light"></p-some-tag>
<p-some-tag theme="dark"></p-some-tag>`
      }
    });

    expect(wrapper.find('code').text()).toBe(
      `<p-some-tag some-attribute="some value" class="some-class"></p-some-tag>
<p-some-tag></p-some-tag>
<p-some-tag theme="dark"></p-some-tag>`
    );
  });

  it('should remove Stencil JS css classes from code block', async () => {
    const wrapper = shallowMount(CodeBlock, {
      stubs,
      store,
      propsData: {
        markup: `<p-some-tag some-attribute="some value" class="hydrated">
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
      markup: `<p-some-tag some-attribute="some value" class="some-class hydrated another-class">
  <span>some text</span>
</p-some-tag>`
    });

    await tick();

    expect(wrapper.find('code').text()).toBe(
      `<p-some-tag some-attribute="some value" class="some-class another-class">
  <span>some text</span>
</p-some-tag>`
    );
  });

  it('should convert code block to Angular syntax', async () => {
    const wrapper = shallowMount(CodeBlock, {
      stubs,
      store,
      propsData: {
        markup: `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" another-attribute="{ bar: 'foo' }" onclick="alert('click'); return false;" digit-attribute="6" boolean-attribute="true">
  <span>some text</span>
  <span slot="some-slot">some slot text</span>
</p-some-tag>`
      }
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
</p-some-tag>`
      }
    });

    getTabButton(wrapper, 'react').trigger('click');

    await tick();

    expect(wrapper.find('code').text()).toBe(
      `<PSomeTag someAttribute="some value" attribute="some value" className="some-class" anotherAttribute={{ bar: 'foo' }} onClick={()=> {alert('click'); return false;}} digitAttribute={6} booleanAttribute={true}>
  <span>some text</span>
</PSomeTag>`
    );
  });

  it('should add closing slash on input tags', () => {
    const wrapper = shallowMount(CodeBlock, {
      stubs,
      store,
      propsData: {
        markup: `<input type="checkbox">`
      }
    });

    expect(wrapper.find('code').text()).toBe(`<input type="checkbox" />`);
  });

  it('should add new line between tags for readability', () => {
    const wrapper = shallowMount(CodeBlock, {
      stubs,
      store,
      propsData: {
        markup: `<div><span></span></div>`
      }
    });

    expect(wrapper.find('code').text()).toBe(`<div>
  <span></span>
</div>`);
  });

  it('should remove new line when tag closes immediately', () => {
    const wrapper = shallowMount(CodeBlock, {
      stubs,
      store,
      propsData: {
        markup: `<div>
</div>`
      }
    });

    expect(wrapper.find('code').text()).toBe(`<div></div>`);
  });

  it('should remove br tags', () => {
    const wrapper = shallowMount(CodeBlock, {
      stubs,
      store,
      propsData: {
        markup: `<div></div><br><div></div><br><div></div>`
      }
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
        markup: `<div></div><br><br><div></div><br><br><br><div></div>`
      }
    });

    expect(wrapper.find('code').text()).toBe(`<div></div>

<div></div>

<div></div>`);
  });

  it('should clean checked, disabled and readonly attributes', () => {
    const wrapper = shallowMount(CodeBlock, {
      stubs,
      store,
      propsData: {
        markup: `<input type="checkbox" checked="checked" disabled="disabled" readonly="readonly">`
      }
    });

    expect(wrapper.find('code').text()).toBe(`<input type="checkbox" checked disabled readonly />`);
  });
});
