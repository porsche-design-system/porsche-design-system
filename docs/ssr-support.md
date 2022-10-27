# SSR Support

## ✅ Content Wrapper

## ✅ Divider

## ✅ Flex

## ✅ Marque

## ✅ Spinner

## ✅ Switch

## ✅ Tag Dismissible

## ✅ Typography

## ✅ Modal

## ✅ Popover

## ✅ Banner

- Slotted styles aren't supported (e.g. slotted anchors)

## ✅ Inline Notification

- Slotted styles aren't supported (e.g. slotted anchors)

## ✅ Accordion

## ✅ Button Group

## ✅ Button Pure

- Prop `size` with value `inherit` is not supported

## ✅ Button

## ✅ Toast

- Component will be visible programmatically only

## ✅ Icon

- Icons provided by `source` will reflect `theme` but no `color` prop

## ✅ Radio Button Wrapper

- Required state not supported
- Slotted styles aren't supported (e.g. slotted anchors)

## ✅ Textarea Wrapper

- Required state not supported
- `showCharacterCount` not supported
- Slotted styles aren't supported (e.g. slotted anchors)

## ⚠️ Checkbox Wrapper

- Indeterminate state
- Required state not supported
- Slotted styles aren't supported (e.g. slotted anchors)

## ✅ Fieldset Wrapper

## ⚠️ Grid

- Some spacing not correct

## ⛔ Carousel

- This component uses `Splide` which relies on a lot of Browser API related calculations and style definitions. That's
  why it's not supported to be rendered on a node server atm.
