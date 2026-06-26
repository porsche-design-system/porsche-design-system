# p-flag

Alongside icons, colors and typography, are flags a fundamental part of the Porsche design language. As universally understood symbols, they enable rapid visual communication and a seamless user experience.

## Usage

The following guidelines provide instructions for designers and developers on the appropriate use of the `flag` component for effective communication and user experience.

### Do:

- **Use the `flag` component for country identification.** The primary purpose is to represent a nation, such as specifying a user's country of origin, shipping location, or detailing product availability.
- **Pair the flag with a label for clarity.** While flags are great for quick visual recognition, they can be ambiguous. Always accompany a flag with a country name or an appropriate label to avoid confusion.
- **Use the two-letter ISO 3166-1 alpha-2 code.** This standard ensures consistency, reduces errors, and makes it easier to integrate with other systems and APIs.

### Don't:

- **Don't use flags to represent a language.** Many languages are spoken in multiple countries (e.g., Spanish). A flag represents a nation, not a language. Use language codes or names instead.
- **Don't use flags to represent an emotion or concept.** Flags are powerful symbols of national identity. Using them as generic icons can dilute their meaning and cause user confusion.
- **Don't rely solely on the flag icon.** Always provide an aria-label for accessibility. Screen readers cannot interpret flags, and without a descriptive label, you create an inaccessible user experience.

## Accessibility support

### ARIA enhancements

#### External **ARIA** provided by the `aria` property:

| ARIA | Usage |
| --- | --- |
| `aria-label` | Defines a string value that labels the element (through the `alt` attribute). |

## Tests

### Automated

| Technology | Support |
| --- | --- |
| AXE-Core (WCAG 2.2 AA, Best-Practice) (WCAG 2.2 AA, Best-Practice) | ✅ |
| High-Contrast Mode (light/dark) | ✅ |
| Text-Zoom (200%) | ✅ |

### Manual

| Technology | Support |
| --- | --- |
| Screen reader (VoiceOver, NVDA) | ✅ |

## API

Authoritative API data: `@porsche-design-system/components-js/meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `aria` | `FlagAriaAttribute` | `undefined` | A map of ARIA attributes to enhance the flag's accessibility. For example, use `{ 'aria-label': 'German flag' }` to provide a descriptive label for screen readers. |
| `name` | `'ad'` `'ae'` `'al'` `'am'` `'ar'` `'at'` `'au'` `'az'` `'ba'` `'bd'` `'be'` `'bg'` `'bh'` `'bn'` `'bo'` `'br'` `'by'` `'ca'` `'ch'` `'cl'` `'cn'` `'co'` `'cr'` `'cw'` `'cy'` `'cz'` `'de'` `'dk'` `'do'` `'dz'` `'ec'` `'ee'` `'eg'` `'es'` `'fi'` `'fr'` `'gb'` `'ge'` `'gh'` `'gi'` `'gr'` `'gt'` `'hk'` `'hn'` `'hr'` `'ht'` `'hu'` `'id'` `'ie'` `'il'` `'in'` `'is'` `'it'` `'jm'` `'jo'` `'jp'` `'ke'` `'kh'` `'kr'` `'kw'` `'kz'` `'lb'` `'li'` `'lk'` `'lt'` `'lu'` `'lv'` `'ma'` `'mc'` `'md'` `'me'` `'mk'` `'mn'` `'mo'` `'mq'` `'mt'` `'mu'` `'mx'` `'my'` `'ng'` `'nl'` `'no'` `'nz'` `'om'` `'pa'` `'pe'` `'pf'` `'ph'` `'pk'` `'pl'` `'pr'` `'pt'` `'py'` `'qa'` `'re'` `'ro'` `'rs'` `'ru'` `'sa'` `'se'` `'sg'` `'si'` `'sk'` `'sv'` `'th'` `'tn'` `'tr'` `'tt'` `'tw'` `'ua'` `'us'` `'uy'` `'uz'` `'ve'` `'vn'` `'xx'` `'za'` | `'de'` | Specifies the country flag to display. Use the two-letter ISO 3166-1 alpha-2 country code. For example, use `us` for the United States, `de` for Germany, `gb` for Great Britain. |
| `size` | `'2xs'` `'xs'` `'sm'` `'md'` `'lg'` `'xl'` `'2xl'` `'3xl'` `'4xl'` `'5xl'` `'inherit'`<br>_deprecated:_ `'xx-small'` `'x-small'` `'small'` `'medium'` `'large'` `'x-large'` `'xx-large'`<br>`BreakpointCustomizable<FlagSize>` | `'sm'` | Defines the size of the flag, aligned with the typographic scale used by components such as p-icon, p-spinner, p-text, and p-heading. When set to `inherit`, the size is derived from a custom font-size defined on a parent element, calculated against the global line-height (based on `ex`-unit) to remain visually consistent with other typographic-scale-based components. |

### CSS Variables

| CSS Variable | Default | Description |
| --- | --- | --- |
| `--p-flag-size` | — | Defines the width and height of the flag. Overrides the `size` property when set. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.ts](./examples/Default.ts) |
| Size via Prop | The `size` property offers a set of predefined sizes that cover most use cases. | [./examples/Size.ts](./examples/Size.ts) |
| Size via CSS Variable | For full control over the flag's dimensions, use the custom CSS variable `--p-flag-size`, which accepts any valid CSS length value. | [./examples/SizeCssVar.ts](./examples/SizeCssVar.ts) |
| Responsive Size | The `size` property supports `BreakpointCustomizable` values, allowing you to define different sizes for each major breakpoint (`xs`, `s`, `m`, `l`, `xl`). | [./examples/ResponsiveSize.ts](./examples/ResponsiveSize.ts) |
