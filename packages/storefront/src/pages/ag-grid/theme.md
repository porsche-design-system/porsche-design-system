# Theme

<TableOfContents></TableOfContents>

We provide a custom theme for the [AG Grid library](https://ag-grid.com) for cases where a more sophisticated table is
required beyond the capabilities of our [p-table](components/table/examples) component. This theme is aligned with the
Porsche Design System's visual language and ensures consistency across your application.

The Porsche Design System AG Grid theme is based on the default AG Grid theme, `ag-theme-quartz`, and is available in
both light (default) and dark (`data-ag-theme-mode="dark"`) modes.

For more information on AG Grid's base themes, you can refer to the official
[AG Grid Themes documentation](https://ag-grid.com/javascript-data-grid/themes).

<Notification heading="Attention" heading-tag="h2" state="warning">
  Please note that components such as <code>p-select</code>, <code>p-select-wrapper</code>, <code>p-multi-select</code>, and <code>p-popover</code> will not work correctly within the AG Grid at the moment. The dropdowns will be cut off because the table cells have <code>overflow: hidden</code> set, and the dropdowns do not yet use the native popover API.
</Notification>

## Usage

#### 1. Import the Theme

First, import the Porsche Design System AG Grid theme into your application:

```js
import { pdsTheme } from '@porsche-design-system/components-{js|angular|react|vue}/ag-grid';
```

#### 2. Apply the Theme

You can apply the theme using one of the following methods:

1. Global Grid Options (Applies to all grid instances)

   Use [global grid options](https://ag-grid.com/javascript-data-grid/grid-interface/#global-grid-options) to set the
   theme globally:

   ```js
   import { provideGlobalGridOptions } from 'ag-grid-community';

   provideGlobalGridOptions({ theme: pdsTheme });
   ```

2. Individual Grid Options (Overrides global options):

   Set the theme for a specific grid instance:

   ```js
   const gridOptions = { theme: pdsTheme };
   ```

3. Component Prop Assignment

   Pass the theme directly as a prop:

   ```tsx
   <AgGridReact theme={pdsTheme} />
   ```

#### 3. Change the Theme Mode

By default, the Porsche Design System AG Grid theme uses a light color scheme. You can control the color scheme by
setting the `data-ag-theme-mode` attribute on any parent element of the grid, such as the `<html>` or `<body>` tag.

**Available Modes:**

- Light Mode (default) → `data-ag-theme-mode` is not set.
- Dark Mode → Set `data-ag-theme-mode="dark"`.

```html
<body data-ag-theme-mode="dark"></body>
```
