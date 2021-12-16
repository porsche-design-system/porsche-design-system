<template>
  <p-text-field-wrapper>
    <input
      type="search"
      name="search"
      placeholder="Search"
      v-model="query"
      autocomplete="off"
      @focus="onFocus(localQuery)"
    />
  </p-text-field-wrapper>
</template>

<script lang="ts">
  import Component, { mixins } from 'vue-class-component';
  import { connectSearchBox } from 'instantsearch.js/es/connectors';

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.state.refine(this.localQuery);
      }, this.delay);
    }
  }
</script>
