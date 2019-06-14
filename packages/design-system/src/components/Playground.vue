<template>
  <div class="playground">
    <button v-if="themeable" :class="{'button': true, 'is-active': (theme === 'light')}" type="button" @click="switchTheme('light')">Light</button>
    <button v-if="themeable" :class="{'button': true, 'is-active': (theme === 'dark')}" type="button" @click="switchTheme('dark')">Dark</button>
    <div :class="{'example': true, 'light':(themeable && theme === 'light'), 'dark':(themeable && theme === 'dark')}">
      <slot :theme="theme"/>
    </div>
  </div>
</template>

<script lang="ts">
  type Theme = 'light' | 'dark';

  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component
  export default class Playground extends Vue {
    @Prop({default: true}) public themeable!: boolean;

    public theme: Theme = 'light';

    public switchTheme(theme: Theme): void {
      this.theme = theme;
    }
  }
</script>

<style scoped lang="scss">
  .example {
    padding: 30px;
    border: 1px solid deeppink;

    &::before {
      content: "";
      display: block;
      margin-top: -16px;
    }

    > * {
      margin-top: 16px;

      &:not(:last-child) {
        margin-right: 16px;
      }
    }
  }

  .light {
    background: #fff;
  }

  .dark {
    background: #000;
  }

  .is-active {
    border-bottom: 10px solid red;
  }
</style>
