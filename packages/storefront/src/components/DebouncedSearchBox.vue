<template>
  <div>
    <form onsubmit="event.preventDefault()">
      <p-text-field-wrapper
        :theme="$store.getters.storefrontTheme"
        hide-label="true"
        label="Search"
        @blur="
          () => {
            this.isSearchOpen = false;
            onFocus('');
          }
        "
      >
        <input
          ref="search"
          type="search"
          name="search"
          placeholder="Search"
          v-model="query"
          autocomplete="off"
          @focus="onFocus(localQuery)"
          @blur="
            () => {
              if (!localQuery) {
                this.isSearchOpen = false;
                onFocus('');
              }
            }
          "
        />
      </p-text-field-wrapper>
    </form>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { connectSearchBox } from 'instantsearch.js/es/connectors';

// Ignore missing types
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createWidgetMixin } from 'vue-instantsearch';
import { Prop } from 'vue-property-decorator';

@Component
export default class DebouncedSearchBox extends mixins(createWidgetMixin({ connector: connectSearchBox })) {
  @Prop({ default: () => ({}) }) public onFocus!: (query: string) => void;

  @Prop({ default: 300 }) public delay!: number;

  public localQuery = '';
  public timerId!: ReturnType<typeof setTimeout>;

  private isSearchOpen = false;

  data() {
    return {
      timerId: null,
      localQuery: '',
    };
  }

  destroyed() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  get query() {
    return this.localQuery;
  }

  set query(val: string) {
    this.$emit('query-change', val);
    this.localQuery = val;
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(() => {
      // Ignore missing types from instantsearch.js
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.state.refine(this.localQuery);
    }, this.delay);
  }
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  p-button {
    @include pds-media-query-min-max('base', 's') {
      display: none !important;
    }
  }
  p-text-field-wrapper {
    @include pds-media-query-min-max('base', 's') {
      display: block !important;
    }
  }
</style>
