# SSR Support

## ✅ Content Wrapper

## ✅ Divider

## ✅ Flex

## ✅ Marque

## ✅ Spinner

## ✅ Switch

## ✅ Tag Dismissible

## ✅ Typography

## ✅ Banner

- Hint: Slotted styles aren't supported (e.g. slotted anchors)

## ✅ Icon

- Hint: Icons provided by `source` reflect `theme` but no `color` prop

## ⚠️ Checkbox Wrapper

- Indeterminate state
- Required state
- No styles for e.g. slotted links

## ✅ Fieldset Wrapper

## ⚠️ Grid

- Some spacing not correct

## ✅ Accordion

## ✅ Button Group

## ✅ Button Pure

- Hint: Icons provided by `icon-source` prop aren't supported
- Hint: Prop `size` with value `inherit` is not supported

## ✅ Button

- Hint: Icons provided by `icon-source` prop aren't supported

## ⛔ Carousel

- This component uses `Splide` which relies on a lot of Browser API related calculations and style definitions. That's
  why it's not supported to be rendered on a node server atm.
