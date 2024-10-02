# Theme

<TableOfContents></TableOfContents>

We provide a custom theme for the [AG Grid library](https://ag-grid.com) for cases where a more sophisticated table is
required beyond the capabilities of our [p-table](components/table/examples) component. This theme is aligned with the
Porsche Design System's visual language and ensures consistency across your application.

The Porsche Design System AG Grid theme is based on the default AG Grid theme, `ag-theme-quartz`, and is available in
both light (`ag-theme-pds`) and dark (`ag-theme-pds-dark`) modes.

For more information on AG Grid's base themes, you can refer to the official
[AG Grid Themes documentation](https://ag-grid.com/javascript-data-grid/themes).

<Notification heading="Attention" heading-tag="h2" state="warning">
  Please note that components such as <code>p-select</code>, <code>p-select-wrapper</code>, <code>p-multi-select</code>, and <code>p-popover</code> will not work correctly within the AG Grid at the moment. The dropdowns will be cut off because the table cells have <code>overflow: hidden</code> set, and the dropdowns do not yet use the native popover API.
</Notification>

## Usage

1. **Import the Theme**  
   Import the Porsche Design System AG Grid theme into your application:

   ```js
   import '@porsche-design-system/components-{js|angular|react|vue}/ag-grid/theme.css';
   ```

2. **Apply the Theme Class**  
   Add the theme class (`ag-theme-pds` or `ag-theme-pds-dark`) to the AG Grid container:

   ```html
   <div id="my-grid" class="ag-theme-pds"></div>
   ```

## Example

<Playground :frameworkMarkup="AGGridExamples" :config="{ ...config, withoutDemo: true }" :externalStackBlitzDependencies="externalStackBlitzDependencies"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'; 
import {getButtonCodeSamples} from "@porsche-design-system/shared"; 
import type { Theme, Framework } from '@/models'; 
import {getAgGridCodeSamples} from "shared/src"; 
import type { ExternalDependency } from '../utils';

@Component
export default class Code extends Vue {
  config = { themeable: true, spacing: 'inline', embedStackblitz: true };

  get theme(): Theme {
    return this.$store.getters.playgroundTheme;
  }

  get activeFramework(): Framework {
    return this.$store.getters.selectedFramework;
  }

  get externalStackBlitzDependencies(): ExternalDependency[] {
      if (this.activeFramework === 'angular') {
         return ['ag-grid-community', 'ag-grid-angular'];
      } else if (this.activeFramework === 'react') {
         return ['ag-grid-community', 'ag-grid-react'];
      } else if (this.activeFramework === 'vue') {
         return ['ag-grid-community', 'ag-grid-vue3'];
      } else {
         return ['ag-grid-community'];
      }
  }

  AGGridExamples = getAgGridCodeSamples();
}
</script>
