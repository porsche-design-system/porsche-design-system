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

- Usage Docs missing

#### ✅ Drop Shadow

- Usage Docs missing

#### ✅ Focus

- Usage Docs missing

#### ✅ Font

- Usage Docs missing

#### ✅ Frosted Glass

- Usage Docs missing

#### ✅ Gradient

- Usage Docs missing

#### ✅ Grid

- Usage Docs missing

#### ✅ Hover

- Usage Docs missing

#### ✅ Media Query

- Usage Docs missing

#### ✅ Spacing

- Usage Docs missing

#### ✅ Theme

- Usage Docs missing

#### ✅ Typography

- Usage Docs missing
- Add letter-spacing: normal; as fontLetterSpacing and reuse in typography styles

---

### Components

#### ✅ Accordion

- Usage Docs missing
- Optimize icon (size) for compact mode
- Optimize hover state for default mode
- Remove resize-observer fallback

#### ✅ Banner

- Usage Docs missing
- Naming of width should probably be aligned with what's going on in the carousel since there is similar behavior
- Safari + Safari IOS: Banner is sticky when scrolling on page

#### ✅ Button

- Usage Docs missing

#### ✅ Button Group

- Usage Docs missing

#### ✅ Button Pure

- Usage Docs missing
- active offset is not optimal in case icon is set to the right

#### ✅ Button Tile

- Usage Docs missing

#### ✅ Carousel

- Safari iOS: align-header="center" has no effect

#### ✅ Checkbox Wrapper

- Usage Docs missing
- Hovering label text results in sticked hover styles some times. Using `:host(:hover) &(input:checked)` would solve the
  issue but to hover is applied to the whole host element.
- Safari: Keyboard check/uncheck is not rendered immediately.
- Firefox: Intermediate example: Only the first checkbox is shown as intermediate.

#### ✅ Crest

- Usage Docs missing

#### ✅ Display

- Usage Docs missing
- Styling could be on :host instead of .root
- Reuse style across typography components

#### ✅ Divider

- Usage Docs missing

#### ✅ Fieldset

- Usage Docs missing

#### ✅ Heading

- Usage Docs missing
- Styling could be on :host instead of .root
- Reuse style across typography components

#### ✅ Icon

- Usage Docs missing
- New icon assets are missing
- Variant 'x-small' for icon in Safari isn't in sync with line-height of text, because of rounding errors caused by
  browser. Maybe it's fixable by experimental feature https://developer.mozilla.org/en-US/docs/Web/CSS/round
- Add deprecation warnings for specific prop values

#### ✅ Inline Notification

- Usage Docs missing

#### ✅ Link

- Usage Docs missing

#### ✅ Link Pure

- Usage Docs missing
- active offset is not optimal in case icon is set to the right

#### ✅ Link Tile

- Usage Docs missing

#### ✅ Link Tile Model Signature

- Panamera signature is too wide on small screen and gets cut off

#### ✅ Modal

- Usage Docs missing
- Animation of background had to be disabled because `frostedGlass` could not be animated. Maybe we can think about
  other solutions which also support `frostedGlass` during animation.
- If "close" button is placed above image the contrast in `:hover` state can be to low (especially on dark images). This
  is caused by the `frostedGlass` hover effect of `p-link-pure`
- ::before element has visible border (2px solid)

#### ✅ Model Signature

- Usage Docs missing
- Safari: Signature color on programmatically theme change

#### ✅ Pagination

- Usage Docs missing
- Text scale 200% is almost perfect because of the negative calc and max px clamp definition of fluid button size
- Add a test with new grid util ensuring pagination works on 320px viewport width
- Get rid of counterReset
- We shouldn't loose focus by tabindex="0" when prev/next buttons are getting aria-disabled="true"
- Safari + Safari iOS: Prev button always looks disabled

#### ✅ Popover

- Usage Docs missing

#### ✅ Radio Button Wrapper

- Usage Docs missing
- Same hover issue, like with checkbox. Seems to be related to transition somehow
- focus is getting lost in some circumstances (#2206)

#### ✅ Scroller

- Usage Docs missing
- Uses custom button which should be shared / aligned
- Button size needs different dimensions to fit every usecas (e.g. Tag)
- Click area is to small and should be enhanced
- Mobile detection could be improved
- Gradient / next + prev buttons in SSR not shown
- we should challenge scroll position and gradient when prev / next buttons are shown
- Firefox: Native focus outline is visible

#### ✅ Segmented Control

- Usage Docs missing

#### ✅ Select Wrapper

- Usage Docs missing
- Tiny border radius is visible when dropdown is open
- Storefront required example: Required attribute won't be removed if set to false again after selecting true.

#### ✅ Spinner

- Usage Docs missing

#### ✅ Stepper Horizontal

- Usage Docs missing
- Check contrast of current / hover on dark

#### ✅ Switch

- Usage Docs missing

#### ✅ Table

- Usage Docs missing

#### ✅ Tabs

- Usage Docs missing
- rethink position of scroll next/prev icon in size small variant

#### ✅ Tabs Bar

- Usage Docs missing
- Rethink position of scroll next/prev icon in size small variant
- Status bar has `1.5px` height in regular, which only works on retina displays
- The focus of the content is still in the old design (a11y example)

#### ✅ Tag

- Usage Docs missing
- Shouldn't we use 'none', '' or undefined as default icon to be in sync with e.g. button, link, button-pure and
  link-pure?
- Coloring needs to be improved for dark theme
- We could save one dom node by using host for style definition

#### ✅ Tag Dismissible

- Usage Docs missing

#### ✅ Text

- Usage Docs missing
- Styling could be on :host instead of .root
- Reuse style across typography components

#### ✅ Text Field Wrapper

- Usage Docs missing
- custom slotted styles shall be transferred to normalize styles (getInitialStyles partial)
- calculated width by JS for counter or unit isn't correct in Safari when text-zoom is set to 200%
- SSR support for input type search is not given 100% since clear button is not rendered and unit/counter is not shown

#### ✅ Text List

- Usage Docs missing
-

#### ✅ Textarea Wrapper

- Usage Docs missing
- Textarea resize handle is not working in Safari except for max-width: 15rem example
- check min-height for 200% scaling and bottom padding with counter

#### ✅ Toast

- Usage Docs missing
- External @Method() addMessage() must return a Promise
- On page refresh, toast animation sometimes flickers

#### ✅ Wordmark

- Usage Docs missing

---

### Components (deprecated)

#### ✅ Content Wrapper (deprecated)

- Usage Docs missing

#### ✅ Fieldset Wrapper (deprecated)

- Usage Docs missing

#### ✅ Flex (deprecated)

- Usage Docs missing

#### ✅ Grid (deprecated)

- Usage Docs missing

#### ✅ Headline (deprecated)

- Usage Docs missing

#### ✅ Link Social (deprecated)

- Usage Docs missing

#### ✅ Marque (deprecated)

- Usage Docs missing
