# Divider

The **Divider component** is used as 'Horizontal Rule' and displays a dividing line.
The default semantic HTML Element is `<hr>` which means the component is self closing. Slotted input between the component tags won't be displayed. 


## Default

The `$p-color-theme` variations are set as default. If you need different colors you can use inherit to change it.

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-divider :theme="theme"></p-divider>
  </template>
</Playground>

--- 

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundTypography extends Vue {
    public color: string = 'default';
  }
</script>