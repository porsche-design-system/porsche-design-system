<template>
  <div>
    <h1>Component</h1>
    <Tabs>
      <Tab name="Design" :selected="true" v-if="isDesign">
        <ButtonRegularDesign v-if="isButtonRegular"/>
        <ColorDesign v-if="isColor"/>
        <TypographyDesign v-if="isTypography"/>
      </Tab>
      <Tab name="Code" v-if="isCode">
        <ButtonRegularCode v-if="isButtonRegular"/>
        <ColorCode v-if="isColor"/>
        <TypographyCode v-if="isTypography"/>
      </Tab>
      <Tab name="Props" v-if="isProps">
        <ButtonRegularProps v-if="isButtonRegular"/>
        <ColorProps v-if="isColor"/>
        <TypographyProps1 v-if="isTypography"/>
        <TypographyProps2 v-if="isTypography"/>
      </Tab>
    </Tabs>
  </div>
</template>

<script lang="js">
  import {Component, Vue} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import Tab from '@/components/Tab.vue';

  @Component({
    components: {
      Tabs,
      Tab,
      ColorDesign: () => import(`@/../../ui-kit-js/src/components/basic/color/color.design.md`),
      ColorCode: () => import(`@/../../ui-kit-js/src/components/basic/color/color.code.md`),
      ColorProps: () => import(`@/../../ui-kit-js/src/components/basic/color/color.props.md`),
      TypographyDesign: () => import(`@/../../ui-kit-js/src/components/basic/typography/typography.design.md`),
      TypographyCode: () => import(`@/../../ui-kit-js/src/components/basic/typography/typography.code.md`),
      TypographyProps1: () => import(`@/../../ui-kit-js/src/components/basic/typography/headline/headline.props.md`),
      TypographyProps2: () => import(`@/../../ui-kit-js/src/components/basic/typography/text/text.props.md`),
      ButtonRegularDesign: () => import(`@/../../ui-kit-js/src/components/action/button-regular/button-regular.design.md`),
      ButtonRegularCode: () => import(`@/../../ui-kit-js/src/components/action/button-regular/button-regular.code.md`),
      ButtonRegularProps: () => import(`@/../../ui-kit-js/src/components/action/button-regular/button-regular.props.md`),
    },
  })
  export default class Page extends Vue {

    stories = {};

    async created() {
      this.stories = (await import('@/design-system.config')).stories;
    }

    get isDesign() {
      return true;
    }

    get isCode() {
      return true;
    }

    get isProps() {
      return true;
    }

    get isColor() {
      return this.$route.params.category === 'basic' && this.$route.params.component === 'color';
    }

    get isTypography() {
      return this.$route.params.category === 'basic' && this.$route.params.component === 'typography';
    }

    get isButtonRegular() {
      return this.$route.params.category === 'action' && this.$route.params.component === 'button-regular';
    }
  }
</script>
