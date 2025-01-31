<template>
  <div class="main-app">
    <div class="type-scale">
      <p-select-wrapper
        label="Choose base font-size"
        description="Can be changed in browser settings by default (e.g. chrome://settings/fonts)"
      >
        <select name="font-size" v-model="fontSize">
          <option :value="100">100% (16px)</option>
          <option :value="150">150% (24px)</option>
          <option :value="200">200% (32px)</option>
        </select>
      </p-select-wrapper>
    </div>
    <div class="type-scale">
      <p-heading
        ref="headingXXLarge"
        size="xx-large"
        data-font-size-formula="clamp(1.6rem, 1.56vw + 1.29rem, 3.16rem)"
        data-line-height-formula="calc(6px + 2.125ex)"
        >{{ dummyHeading }}</p-heading
      >
      <p-heading
        ref="headingXLarge"
        size="x-large"
        data-font-size-formula="clamp(1.42rem, 0.94vw + 1.23rem, 2.37rem)"
        data-line-height-formula="calc(6px + 2.125ex)"
        >{{ dummyHeading }}</p-heading
      >
      <p-heading
        ref="headingLarge"
        size="large"
        data-font-size-formula="clamp(1.27rem, 0.51vw + 1.16rem, 1.78rem)"
        data-line-height-formula="calc(6px + 2.125ex)"
        >{{ dummyHeading }}</p-heading
      >
      <p-heading
        ref="headingMedium"
        size="medium"
        data-font-size-formula="clamp(1.13rem, 0.21vw + 1.08rem, 1.33rem)"
        data-line-height-formula="calc(6px + 2.125ex)"
        >{{ dummyHeading }}</p-heading
      >
      <p-heading
        ref="headingSmall"
        size="small"
        data-font-size-formula="1rem"
        data-line-height-formula="calc(6px + 2.125ex)"
        >{{ dummyHeading }}</p-heading
      >
    </div>

    <div class="type-scale">
      <p-text
        ref="textXLarge"
        size="x-large"
        data-font-size-formula="clamp(1.42rem, 0.94vw + 1.23rem, 2.37rem)"
        data-line-height-formula="calc(6px + 2.125ex)"
        >{{ dummyText }}</p-text
      >
      <p-text
        ref="textLarge"
        size="large"
        data-font-size-formula="clamp(1.27rem, 0.51vw + 1.16rem, 1.78rem)"
        data-line-height-formula="calc(6px + 2.125ex)"
        >{{ dummyText }}</p-text
      >
      <p-text
        ref="textMedium"
        size="medium"
        data-font-size-formula="clamp(1.13rem, 0.21vw + 1.08rem, 1.33rem)"
        data-line-height-formula="calc(6px + 2.125ex)"
        >{{ dummyText }}</p-text
      >
      <p-text
        ref="textSmall"
        size="small"
        data-font-size-formula="1rem"
        data-line-height-formula="calc(6px + 2.125ex)"
        >{{ dummyText }}</p-text
      >
      <p-text
        ref="textXSmall"
        size="x-small"
        data-font-size-formula="clamp(0.81rem, 0.23vw + 0.77rem, 0.88rem)"
        data-line-height-formula="calc(6px + 2.125ex)"
        >{{ dummyText }}</p-text
      >
      <p-text
        ref="textXXSmall"
        size="xx-small"
        data-font-size-formula=".75rem"
        data-line-height-formula="calc(6px + 2.125ex)"
        >{{ dummyText }}</p-text
      >
    </div>

    <div class="type-fallback">
      <p-text data-font-family="Porsche Next (Latin)" weight="regular"
        >The quick brown fox jumps over the lazy dog</p-text
      >
      <p-text weight="regular" data-font-family="Porsche Next (Greek & Coptic)"
        >Ταχίστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός</p-text
      >
      <p-text weight="regular" data-font-family="Porsche Next (Vietnamese)"
        >Trăm năm trong cõi người ta, chữ tài chữ phận khéo là ghét nhau. Trải qua một cuộc bể dâu, những điều trông
        thấy mà đau đớn lòng. Lạ gì bỉ sắc tư phong, trời xanh quen với má hồng đánh ghen.</p-text
      >
      <p-text weight="regular" data-font-family="Porsche Next (Cyril)"
        >Эх, чужак, общий съём цен шляп (юфть) – вдрызг!</p-text
      >
      <p-text weight="regular" data-font-family="System Fallback Font for Chinese (Heiti SC or SimHei)"
        >保时捷驾驶体验活动在线销售通用条款与条件</p-text
      >
      <p-text weight="regular" data-font-family="System Fallback Font for Japanese (Heiti SC or SimHei)">
        いろはにほへと ちりぬるを わかよたれそ つねならむ うゐのおくやま けふこえて あさきゆめみし ゑひもせす（ん）
      </p-text>
      <p-text weight="regular" data-font-family="System Fallback Font for Korean (Heiti SC or SimHei)"
        >키스의 고유조건은 입술끼리 만나야 하고 특별한 기술은 필요치 않다</p-text
      >
    </div>

    <div class="type-scale">
      <h4>References</h4>
      <ul>
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/clamp">CSS clamp()</a>
        </li>
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units"
            >rem-unit (font size of the root element)</a
          >
        </li>
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units"
            >ex-unit (x-height of the element's font)</a
          >
        </li>
        <li>
          <a href="https://aleksandrhovhannisyan.com/blog/dont-use-a-fixed-line-height/#solution-2-use-the-ex-unit"
            >https://aleksandrhovhannisyan.com/blog/dont-use-a-fixed-line-height/#solution-2-use-the-ex-unit</a
          >
        </li>
        <li>
          <a href="https://kittygiraudel.com/2020/05/18/using-calc-to-figure-out-optimal-line-height/"
            >https://kittygiraudel.com/2020/05/18/using-calc-to-figure-out-optimal-line-height/</a
          >
        </li>
        <li>
          <a href="https://joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/"
            >https://joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { componentsReady } from '@porsche-design-system/components-js';

@Component
export default class ExampleTypeScale extends Vue {
  public dummyHeading = 'The quick brown fox jumps over the lazy dog';
  public dummyText = 'The quick brown fox jumps over the lazy dog';
  public fontSize = 100;

  async mounted(): Promise<void> {
    await componentsReady();
    this.setTypeScaleInfoOnRefs();
    window.addEventListener('resize', this.setTypeScaleInfoOnRefs);
  }

  beforeUpdate(): void {
    (document.querySelector('html') as HTMLElement).style.fontSize = this.fontSize + '%';
  }

  unmounted() {
    window.removeEventListener('resize', this.setTypeScaleInfoOnRefs);
  }

  private setTypeScaleInfoOnRefs(): void {
    for (const host of Object.values(this.$refs)) {
      const el = (host as HTMLElement).shadowRoot?.lastElementChild as HTMLElement;
      const { fontSize, lineHeight } = window.getComputedStyle(el);

      (host as HTMLElement)?.setAttribute('data-font-size', fontSize);
      (host as HTMLElement)?.setAttribute('data-line-height', lineHeight);
      (host as HTMLElement)?.setAttribute('data-viewport-width', window.innerWidth + 'px');
    }
  }
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  .type-fallback {
    padding: $pds-spacing-fluid-medium;

    p-text::before {
      @include pds-text-xx-small;
      font-size: 12px;
      display: block;
      color: deeppink;
      content: attr(data-font-family) ' | formula: "Porsche Next","Arial Narrow",Arial,"Heiti SC",SimHei,sans-serif';
    }
  }

  .type-scale {
    padding: $pds-spacing-fluid-medium;

    p-heading,
    p-text {
      &::before {
        @include pds-text-xx-small;
        font-size: 12px;
        display: block;
        content: '<p-heading size="' attr(size) '"> | font-size: ' attr(data-font-size) ' / line-height: '
          attr(data-line-height) ' | formula: ' attr(data-font-size-formula) '/' attr(data-line-height-formula) ' | @'
          attr(data-viewport-width) '';
        color: deeppink;
      }
    }

    p-text::before {
      content: '<p-text size="' attr(size) '"> | font-size: ' attr(data-font-size) ' / line-height: '
        attr(data-line-height) ' | formula: ' attr(data-font-size-formula) '/' attr(data-line-height-formula) ' | @'
        attr(data-viewport-width) '';
    }
  }

  ul {
    margin-left: $pds-spacing-fluid-medium;
  }

  p-select-wrapper {
    display: inline-block;
  }
</style>
