import Vue, { VNode } from 'vue';

declare global {
  // biome-ignore lint/style/noNamespace: ok
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
