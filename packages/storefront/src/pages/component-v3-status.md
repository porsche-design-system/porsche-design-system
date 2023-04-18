# Porsche Design System

## V3 Status

### Common

- Use `px` instead of `rem` apart from `font-size` and get rid of `pxToRemWithUnit()`
- Use `text-indent: -999999px` for accessible but hidden text/label
  (https://webaim.org/techniques/css/invisiblecontent/)
- generic test for `display: xy !important` of all components
- optimize component chunking
- we should vrt test modal, banner, (toast), content-wrapper on even larger viewports than 2560px
- Playwright VRT doesn't render `frostedGlass` background effect. Maybe it's an WebKit/Linux thing?
- Rename `utilities/projects/{styles/utilities}`

---

### Styles

#### ✅ Border

#### ✅ Drop Shadow

#### ✅ Focus

#### ✅ Font

#### ✅ Frosted Glass

#### ✅ Gradient

#### ✅ Grid

#### ✅ Hover

#### ✅ Media Query

#### ✅ Spacing

#### ✅ Theme

#### ✅ Typography

- Add letter-spacing: normal; as fontLetterSpacing and reuse in typography styles

---

### Components

#### ✅ Accordion

- Optimize icon (size) for compact mode
- Optimize hover state for default mode

#### ✅ Banner

- Usage Docs missing
- Naming of width should probably be aligned with what's going on in the carousel since there is similar behavior
- Safari + Safari IOS: Banner is sticky when scrolling on page

#### ✅ Button

#### ✅ Button Group

#### ✅ Button Pure

- active offset is not optimal in case icon is set to the right

#### ✅ Button Tile

#### ✅ Carousel

- Safari iOS: align-header="center" has no effect

#### ✅ Checkbox Wrapper

- Hovering label text results in sticked hover styles some times. Using `:host(:hover) &(input:checked)` would solve the
  issue but to hover is applied to the whole host element.
- Safari: Keyboard check/uncheck is not rendered immediately.
- Firefox: Intermediate example: Only the first checkbox is shown as intermediate.

#### ✅ Crest

#### ✅ Display

- Usage Docs missing
- Styling could be on :host instead of .root
- Reuse style across typography components

#### ✅ Divider

#### ✅ Fieldset

#### ✅ Heading

- Usage Docs missing
- Styling could be on :host instead of .root
- Reuse style across typography components

#### ✅ Icon

- New icon assets are missing
- Variant 'x-small' for icon in Safari isn't in sync with line-height of text, because of rounding errors caused by
  browser. Maybe it's fixable by experimental feature https://developer.mozilla.org/en-US/docs/Web/CSS/round
- Add deprecation warnings for specific prop values

#### ✅ Inline Notification

- Usage Docs missing

#### ✅ Link

#### ✅ Link Pure

- active offset is not optimal in case icon is set to the right

#### ✅ Link Tile

#### ✅ Link Tile Model Signature

- Panamera signature is too wide on small screen and gets cut off

#### ✅ Modal

- Animation of background had to be disabled because `frostedGlass` could not be animated. Maybe we can think about
  other solutions which also support `frostedGlass` during animation.
- If "close" button is placed above image the contrast in `:hover` state can be to low (especially on dark images). This
  is caused by the `frostedGlass` hover effect of `p-link-pure`
- ::before element has visible border (2px solid)

#### ✅ Model Signature

- Safari: Signature color on programmatically theme change

#### ✅ Pagination

- Text scale 200% is almost perfect because of the negative calc and max px clamp definition of fluid button size
- Add a test with new grid util ensuring pagination works on 320px viewport width
- Get rid of counterReset
- We shouldn't loose focus by tabindex="0" when prev/next buttons are getting aria-disabled="true"
- Safari + Safari iOS: Prev button always looks disabled

#### ✅ Popover

#### ✅ Radio Button Wrapper

- Same hover issue, like with checkbox. Seems to be related to transition somehow
- focus is getting lost in some circumstances (#2206)

#### ✅ Scroller

- Uses custom button which should be shared / aligned
- Button size needs different dimensions to fit every usecas (e.g. Tag)
- Click area is to small and should be enhanced
- Mobile detection could be improved
- Gradient / next + prev buttons in SSR not shown
- we should challenge scroll position and gradient when prev / next buttons are shown
- Firefox: Native focus outline is visible

#### ✅ Segmented Control

#### ✅ Select Wrapper

- Tiny border radius is visible when dropdown is open
- Storefront required example: Required attribute won't be removed if set to false again after selecting true.

#### ✅ Spinner

#### ✅ Stepper Horizontal

- Check contrast of current / hover on dark

#### ✅ Switch

#### ✅ Table

#### ✅ Tabs

- rethink position of scroll next/prev icon in size small variant

#### ✅ Tabs Bar

- Rethink position of scroll next/prev icon in size small variant
- Status bar has `1.5px` height in regular, which only works on retina displays
- The focus of the content is still in the old design (a11y example)

#### ✅ Tag

- Shouldn't we use 'none', '' or undefined as default icon to be in sync with e.g. button, link, button-pure and
  link-pure?
- Coloring needs to be improved for dark theme
- We could save one dom node by using host for style definition

#### ✅ Tag Dismissible

#### ✅ Text

- Usage Docs missing
- Styling could be on :host instead of .root
- Reuse style across typography components

#### ✅ Text Field Wrapper

- custom slotted styles shall be transferred to normalize styles (getInitialStyles partial)
- calculated width by JS for counter or unit isn't correct in Safari when text-zoom is set to 200%
- SSR support for input type search is not given 100% since clear button is not rendered and unit/counter is not shown

#### ✅ Text List

#### ✅ Textarea Wrapper

- Textarea resize handle is not working in Safari except for max-width: 15rem example
- check min-height for 200% scaling and bottom padding with counter

#### ✅ Toast

- Usage Docs missing
- External @Method() addMessage() must return a Promise
- On page refresh, toast animation sometimes flickers

#### ✅ Wordmark

---

### Components (deprecated)

#### ✅ Content Wrapper (deprecated)

#### ✅ Fieldset Wrapper (deprecated)

#### ✅ Flex (deprecated)

- Usage Docs missing

#### ✅ Grid (deprecated)

#### ✅ Headline (deprecated)

- Usage Docs missing

#### ✅ Link Social (deprecated)

#### ✅ Marque (deprecated)
