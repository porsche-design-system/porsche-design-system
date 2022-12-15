# Next Js

## SSR Support

| Components                  | Limitations                                                                                                                                                                        |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅ **Accordion**            |                                                                                                                                                                                    |
| ✅ **Banner**               | - Nested slotted styles (e.g. slotted anchors) aren't supported on purpose                                                                                                         |
| ✅ **Button**               |                                                                                                                                                                                    |
| ✅ **Button Group**         |                                                                                                                                                                                    |
| ✅ **Button Pure**          |                                                                                                                                                                                    |
| ⛔ **Carousel**             | - This component uses `Splide` which relies on a lot of Browser API related calculations and style definitions. That's why it's not supported to be rendered on a node server atm. |
| ✅ **Checkbox Wrapper**     | - Indeterminate state is not supported<br />- Required state is not supported<br />- Nested slotted styles (e.g. slotted anchors) aren't supported on purpose                      |
| ✅ **Content Wrapper**      |                                                                                                                                                                                    |
| ✅ **Divider**              |                                                                                                                                                                                    |
| ✅ **Fieldset Wrapper**     |                                                                                                                                                                                    |
| ✅ **Flex**                 |                                                                                                                                                                                    |
| ✅ **Grid**                 |                                                                                                                                                                                    |
| ✅ **Headline**             | - Nested slotted styles (e.g. slotted anchors) aren't supported on purpose                                                                                                         |
| ✅ **Icon**                 | - Icons provided by `source` will reflect `theme` but no `color` prop                                                                                                              |
| ✅ **Inline Notification**  | - Nested slotted styles (e.g. slotted anchors) aren't supported on purpose                                                                                                         |
| ✅ **Link**                 |                                                                                                                                                                                    |
| ✅ **Link Pure**            |                                                                                                                                                                                    |
| ✅ **Link Social**          |                                                                                                                                                                                    |
| ✅ **Link Tile**            |                                                                                                                                                                                    |
| ✅ **Marque**               |                                                                                                                                                                                    |
| ✅ **Modal**                |                                                                                                                                                                                    |
| ✅ **Pagination**           | - `max-number-of-page-links` is not supported                                                                                                                                      |
| ✅ **Popover**              |                                                                                                                                                                                    |
| ✅ **Radio Button Wrapper** | - Required state is not supported<br />- Nested slotted styles (e.g. slotted anchors) aren't supported on purpose                                                                  |
| ✅ **Scroller**             | - Optional prev/next arrows aren't supported                                                                                                                                       |
| ✅ **Segmented Control**    | - Auto width calculation is not supported<br />- Icons provided by `icon-source` won't be shown in disabled color when element is disabled                                         |
| ✅ **Select Wrapper**       |                                                                                                                                                                                    |
| ✅ **Spinner**              |                                                                                                                                                                                    |
| ✅ **Stepper Horizontal**   | - Optional scroll prev/next arrow isn't supported                                                                                                                                  |
| ✅ **Switch**               |                                                                                                                                                                                    |
| ✅ **Table**                | - Nested slotted styles (e.g. slotted anchors or images) aren't supported on purpose<br />- Optional scroll next arrow isn't supported                                             |
| ✅ **Tabs** / **Tabs Bar**  | - Optional prev/next arrows aren't supported<br />- `active-tab-index` is not supported                                                                                            |
| ✅ **Tag**                  |                                                                                                                                                                                    |
| ✅ **Tag Dismissible**      |                                                                                                                                                                                    |
| ✅ **Text**                 | - Nested slotted styles (e.g. slotted anchors) aren't supported on purpose                                                                                                         |
| ✅ **Text Field Wrapper**   | - `show-character-count`, `unit` and `input[type=search]` within form are not supported                                                                                            |
| ✅ **Text List**            | - Nested slotted styles (e.g. slotted anchors) aren't supported on purpose                                                                                                         |
| ✅ **Textarea Wrapper**     | - `show-character-count` is not supported<br />- Required state is not supported<br />- Nested slotted styles (e.g. slotted anchors) aren't supported on purpose                   |
| ✅ **Toast**                | - Component will be visible programmatically only                                                                                                                                  |
