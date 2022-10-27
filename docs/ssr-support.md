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

- Slotted styles aren't supported (e.g. slotted anchors)

## ✅ Accordion

## ✅ Button Group

## ✅ Button Pure

- Prop `size` with value `inherit` is not supported

## ✅ Button

## ✅ Icon

- Icons provided by `source` will reflect `theme` but no `color` prop

## ⚠️ Checkbox Wrapper

- Indeterminate state
- Required state
- No styles for e.g. slotted links

## ✅ Fieldset Wrapper

## ⚠️ Grid

- Some spacing not correct

## ⛔ Carousel

- This component uses `Splide` which relies on a lot of Browser API related calculations and style definitions. That's
  why it's not supported to be rendered on a node server atm.
