// https://github.com/y-nk/vue-fragment/issues/28#issuecomment-610030709
declare module 'vue-fragment' {
  import Vue, { AsyncComponent, ComponentOptions, PluginObject } from 'vue'

  type Component = ComponentOptions<Vue> | typeof Vue | AsyncComponent

  export const Fragment: Component
  export const Plugin: PluginObject<undefined>

  namespace VueFragment {
    export const Fragment: Component
    export const Plugin: PluginObject<undefined>
  }
  export default VueFragment
}
