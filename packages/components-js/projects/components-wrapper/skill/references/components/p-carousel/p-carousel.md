# p-carousel

The `p-carousel` component allows related or similar content to be consumed on a step by step basis with a better overview than just showing them in a grid or as a list. The reason for this is, that only a certain amount of slides is visible at the same time.

Therefore, the `p-carousel`'s content has to be divided into multiple parts or slides. The amount of slides visible can be specified on a per-breakpoint basis.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use to showcase a group of related featured content in a row, such as images or cards.
- Use when you have five or fewer items of the same style to display.
- Use when there is insufficient content space to display all items without overlapping or cluttering.
- Keep the number of slides within the carousel to a minimum, preferably five or fewer.
- Use specify the number of slides visible at the same time, either static or for each breakpoint individually.

### Don't:

- Don't vary the size of the items in its height.
- Don't maintain the same layout or at least the same content structure with every item.

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | - Moves focus to the next (or previous) focusable element.
- Supports cycling through all items.
- Activates "Skip" link (if set through `skipLinkTarget`). |

### ARIA enhancements

#### External **ARIA** provided by the `aria` property:

| ARIA | Usage |
| --- | --- |
| `aria-label` | Defines a string value that labels the carousel. |

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `aria-label="STRING"` | Defines a string value that labels prev/next and carousel items. |
| `role="region"` | Defines the carousel as a semantic region. |
| `role="group"` | Defines the carousel item as a semantic group. |
| `aria-labelledby="IDREF"` | References the accessible name. |
| `aria-roledescription="carousel"` | Specifies the role as "carousel". |
| `aria-roledescription="slide"` | Specifies the role of the carousel item as "slide". |
| `aria-live="polite"` | Announces current active slide item. |

## Development considerations

### Skip Carousel Entries

Through the `skipLinkTarget` property, a skip link for keyboard users can be provided to give the possibility to skip over all carousel entries. The skip link is only visible when it receives focus from the keyboard.

- Use the `skipLinkTarget` property if you have >5 carousel items
- The target of the skip link should point to the next heading or element right after the carousel

## Tests

### Automated

| Technology | Support |
| --- | --- |
| AXE-Core (WCAG 2.2 AA, Best-Practice) | ✅ |
| High-Contrast Mode (light/dark) | ✅ |
| Text-Zoom (200%) | ✅ |

### Manual

| Technology | Support |
| --- | --- |
| Keyboard | ✅ |
| Screen reader (VoiceOver, NVDA) | ✅ |

## API

Authoritative API data: `../meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `activeSlideIndex` | `number` | `0` | Sets the zero-based index of the currently visible slide. Update this to navigate programmatically. |
| `alignControls` | `'start'` `'center'` `'auto'` | `'auto'` | Controls the alignment of custom slotted controls within the header area. |
| `alignHeader` | `'start'` `'center'` | `'start'` | Controls the horizontal alignment of the heading and description. |
| `aria` | `CarouselAriaAttribute` | `undefined` | Sets ARIA attributes on the carousel region element for improved accessibility. |
| `description` | `string` | `undefined` | Sets the description text displayed below the heading for additional context. |
| `focusOnCenterSlide` | `boolean` | `false` | When enabled, each slide is individually focusable and the carousel navigates one slide at a time instead of one page. |
| `gradient` | `boolean` | `false` | Shows a gradient fade at the start and end edges to visually indicate more slides beyond the viewport. |
| `heading` | `string` | `undefined` | Sets the heading text displayed above the carousel. Also used as the accessible label when no `aria` prop is set. |
| `headingSize` | `'x-large'` `'xx-large'` | `'x-large'` | Sets the font size of the carousel heading. |
| `intl` | `CarouselInternationalization` | `undefined` | Overrides the default label strings used for the previous, next, and page indicators — useful for localization. |
| `pagination` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Shows pagination dot indicators below the carousel. Supports responsive breakpoint values. |
| `rewind` | `boolean` | `false` | Enables infinite looping — navigating past the last slide wraps back to the first, and vice versa. |
| `skipLinkTarget` | `string` | `undefined` | Sets the `href` of an in-page skip link that lets keyboard users jump past the carousel slides. |
| `slidesPerPage` | `'auto'` `1` `2` `3` `4` `5` `6` `7` `8` `9` `10`<br>`BreakpointCustomizable<CarouselSlidesPerPage>` | `1` | Sets how many slides are visible at once. Use `auto` to control each slide's width via CSS. Supports responsive breakpoint values. |
| `trimSpace` | `boolean` | `false` | Removes whitespace before the first and after the last slide when `focusOnCenterSlide` is enabled. |
| `width` | `'basic'` `'extended'` `'wide'` `'full'` | `'basic'` | Sets the maximum width and outer spacing of the carousel, aligned to PDS grid widths. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `update` | `CustomEvent<CarouselUpdateEventDetail>`<br>`{ activeIndex: number; previousIndex: number }` | Emitted when the carousel navigates to a new slide, with the active and previous slide indexes in the event detail. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `heading` | no | — | Renders a heading above the carousel. |
| `description` | no | — | Renders descriptive content below the heading. |
| `controls` | no | — | Renders custom controls such as navigation buttons or indicators. |
| _(default)_ | no | — | Default slot for the carousel slides. |

### CSS Variables

| CSS Variable | Default | Description |
| --- | --- | --- |
| `--p-carousel-px` | — | Defines the logical inline start and end padding of the carousel, the extra space is used to show parts of the next/previous slide. When used then the prop `width` has no effect anymore. |
| `--p-carousel-ps` | — | Defines the logical inline start padding of the carousel, the extra space is used to show parts of the next/previous slide. Needs to be used in combination with `--p-carousel-px` or `--p-carousel-pe`. When used then the prop `width` has no effect anymore. |
| `--p-carousel-pe` | — | Defines the logical inline end padding of the carousel, the extra space is used to show parts of the next/previous slide. Needs to be used in combination with `--p-carousel-px` or `--p-carousel-ps`. When used then the prop `width` has no effect anymore. |
| `--p-carousel-prev-next-color-scheme` | — | Color Scheme applied to the navigation (prev/next buttons) |
| `--p-carousel-border-radius` | `var(--p-radius-large, var(--p-radius-4xl))` | Sets the border radius of each carousel slide. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.html](./examples/Default.html) |
| Slides with flexible widths | In case you want to have slides with different widths you can use `slidesPerPage` with a value of `auto`. | [./examples/FlexibleWidths.html](./examples/FlexibleWidths.html) |
| Jump to slide (activeSlideIndex) | To control the `p-carousel` from the outside you can specify its `activeSlideIndex` initially but also later. | [./examples/JumpToSlide.html](./examples/JumpToSlide.html) |
| Add/remove slides | Slides can be added and removed dynamically. | [./examples/DynamicSlides.html](./examples/DynamicSlides.html) |
| Centered Slide and Gradient Customization | The carousel centers the active slide and loops through slides individually rather than by page when multiple slides are visible. | [./examples/FocusOnCenterSlide.html](./examples/FocusOnCenterSlide.html) |
| Internationalization (i18n) | Default wordings for screen readers can be overridden or translated by passing an object to the `intl` property. | [./examples/Intl.html](./examples/Intl.html) |
