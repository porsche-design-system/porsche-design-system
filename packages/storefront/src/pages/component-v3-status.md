# Porsche Design System

## V3 Status

### Common

- Use `px` instead of `rem` apart from `font-size`
- Use `hostHiddenStyles` in all components
- No `:active` style shall be set
- Use `text-indent: -999999px` for accessible but hidden text/label
  (https://webaim.org/techniques/css/invisiblecontent/)

### Utilities

| Utilities            | V3 Status                                                                                                                                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅ **Font**          | - Sync token namings in Figma with PDS- StackBlitz code examples<br>- Technical docs<br>- UI/UX docs<br>- Migration path<br>- Update of deprecated utilities package                                                 |
| 🚧 **Grid**          | - Provide additional gridStyles for easier usage- Sync token namings in Figma with PDS- StackBlitz code examples<br>- Technical docs<br>- UI/UX docs<br>- Migration path<br>- Update of deprecated utilities package |
| ✅ **Media Query**   | - Sync token namings in Figma with PDS- StackBlitz code examples<br>- Technical docs<br>- UI/UX docs<br>- Migration path<br>- Update of deprecated utilities package                                                 |
| ✅ **Theme**         | - Sync token namings in Figma with PDS- StackBlitz code examples<br>- Technical docs<br>- UI/UX docs<br>- Migration path<br>- Update of deprecated utilities package                                                 |
| ✅ **Typography**    | - Sync token namings in Figma with PDS- StackBlitz code examples<br>- Technical docs<br>- UI/UX docs<br>- Migration path<br>- Update of deprecated utilities package                                                 |
| ✅ **Focus**         | - Sync token namings in Figma with PDS- StackBlitz code examples<br>- Technical docs<br>- UI/UX docs<br>- Migration path<br>- Update of deprecated utilities package                                                 |
| ✅ **Spacing**       | - Sync token namings in Figma with PDS- StackBlitz code examples<br>- Technical docs<br>- UI/UX docs<br>- Migration path<br>- Update of deprecated utilities package                                                 |
| ✅ **Gradient**      | - Sync token namings in Figma with PDS- StackBlitz code examples<br>- Technical docs<br>- UI/UX docs<br>- Migration path                                                                                             |
| 🚧 **Frosted Glass** | - Improve existing variants and extend by variant low<br>- Sync token namings in Figma with PDS- StackBlitz code examples<br>- Technical docs<br>- UI/UX docs<br>- Migration path                                    |
| ✅ **Drop Shadow**   | - Sync token namings in Figma with PDS- StackBlitz code examples<br>- Technical docs<br>- UI/UX docs<br>- Migration path                                                                                             |
| ✅ **Border**        | - Sync token namings in Figma with PDS- StackBlitz code examples<br>- Technical docs<br>- UI/UX docs<br>- Migration path                                                                                             |

### Components

| Components                  | V3 Status                                                                                                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⛔ **Icon**                 |                                                                                                                                                                                   |
| ✅ **Spinner**              |                                                                                                                                                                                   |
| ✅ **Link Pure**            | - fix jittering/spotting of `active` state on iOS<br />- use prop `current` instead of `active`                                                                                   |
| ✅ **Button Pure**          | - fix jittering/spotting of `active` state on iOS                                                                                                                                 |
| ⛔ **Button / Link**        |                                                                                                                                                                                   |
| ⛔ **Link Social**          |                                                                                                                                                                                   |
| ⛔ **Tag**                  |                                                                                                                                                                                   |
| ⛔ **Tag Dismissible**      |                                                                                                                                                                                   |
| ✅ **Switch**               |                                                                                                                                                                                   |
| ✅ **Checkbox Wrapper**     | - hovering label text results in sticked hover styles some times. Using `:host(:hover) &(input:checked)` would solve the issue but to hover is applied to the whole host element. |
| ⛔ **Radio Button Wrapper** |                                                                                                                                                                                   |
| ⛔ **Text Field Wrapper**   |                                                                                                                                                                                   |
| ⛔ **Textarea Wrapper**     |                                                                                                                                                                                   |
| ⛔ **Select Wrapper**       |                                                                                                                                                                                   |
| ⛔ **Segmented Control**    |                                                                                                                                                                                   |
| ⛔ **Inline Notification**  |                                                                                                                                                                                   |
| ⛔ **Banner**               |                                                                                                                                                                                   |
| ⛔ **Toast**                |                                                                                                                                                                                   |
| ⛔ **Modal**                |                                                                                                                                                                                   |
| ⛔ **Popover**              |                                                                                                                                                                                   |
| ⛔ **Marque**               |                                                                                                                                                                                   |
| ⛔ **Scroller**             |                                                                                                                                                                                   |
| ⛔ **Accordion**            |                                                                                                                                                                                   |
| ⛔ **Stepper Horizontal**   |                                                                                                                                                                                   |
| ⛔ **Tabs** / **Tabs Bar**  |                                                                                                                                                                                   |
| ⛔ **Pagination**           |                                                                                                                                                                                   |
| ⛔ **Table**                |                                                                                                                                                                                   |
| ⛔ **Carousel**             |                                                                                                                                                                                   |
| ⛔ **Link Tile**            |                                                                                                                                                                                   |
| ⛔ **Fieldset Wrapper**     |                                                                                                                                                                                   |
| ⛔ **Button Group**         |                                                                                                                                                                                   |
| ⛔ **Headline**             |                                                                                                                                                                                   |
| ⛔ **Text**                 |                                                                                                                                                                                   |
| ⛔ **Text List**            |                                                                                                                                                                                   |
| ⛔ **Content Wrapper**      |                                                                                                                                                                                   |
| ⛔ **Grid**                 |                                                                                                                                                                                   |
| ⛔ **Divider**              |                                                                                                                                                                                   |
| ⛔ **Flex**                 |                                                                                                                                                                                   |
