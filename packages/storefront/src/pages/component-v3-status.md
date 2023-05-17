# Porsche Design System

## V3 Status

### Common

- Rename `utilities/projects/{styles/utilities}` => create ticket
- Add letter-spacing: normal; as fontLetterSpacing and reuse in typography styles (Name)

---

### Styles

#### ✅ Typography

- Add letter-spacing: normal; as fontLetterSpacing and reuse in typography styles => create ticket

---

### Components

#### ✅ Accordion

- Optimize icon (size) for compact mode => #2309

#### ✅ Banner

- Safari + Safari IOS: Banner is sticky when scrolling on page => create ticket, ask tatjana for ticket

#### ✅ Button Pure

- active offset is not optimal in case icon is set to the right

#### ✅ Carousel

- Safari iOS: align-header="center" has no effect

#### ✅ Checkbox Wrapper

- Firefox: Intermediate example: Only the first checkbox is shown as intermediate. => create ticket

#### ✅ Icon

- New icon assets are missing => search ticket

#### ✅ Link Tile Model Signature

- Panamera signature is too wide on small screen and gets cut off => create ticket

#### ✅ Modal

- dark theme missing => prioritize issue

#### ✅ Pagination

- Add a test with new grid util ensuring pagination works on 320px viewport width => check with design for max-width +
  grid aligment?
- Get rid of counterReset => use container queries, create ticket
- We shouldn't loose focus by tabindex="0" when prev/next buttons are getting aria-disabled="true" => use native button
  instead of span and work with aria-disabled instead of disabled attribute and prevent action by JS, create ticket

#### ✅ Popover

- Dark theme should use dark colors => create ticket, talk to design

#### ✅ Scroller

- Uses custom button which should be shared / aligned => why not using p-button with css scaling? Why not providing
  p-button as small variant? Why not using button-pure with background color on :host?
- Button size needs different dimensions to fit every usecas (e.g. Tag), => maybe use a css variable to align arrow
  buttons pixel perfect for special use cases?
- Click area is to small and should be enhanced => Also check why arrow buttons are smaller than tag or tag-dismissible
  close button?
- Mobile detection could be improved => Talk if Bernd knows what is meant?

#### ✅ Tag

- We could save one dom node by using host for style definition => create ticket

#### ✅ Text Field Wrapper

- calculated width by JS for counter or unit isn't correct in Safari when text-zoom is set to 200% => create ticket
- SSR support for input type search is not given 100% since clear button is not rendered and unit/counter is not shown
  => create ticket

#### ✅ Textarea Wrapper

- check min-height for 200% scaling and bottom padding with counter => create ticket

#### ✅ Toast

- External @Method() addMessage() must return a Promise => create ticket for PDS@v4
