# p-ai-tag

`p-ai-tag` is used to indicate AI-generated or AI-modified content. It displays a localized and legally compliant AI label text (abbreviated or as long-form) combined with an icon.

## Usage

Use the AI tag to indicate that content has been generated or assisted by artificial intelligence.

The following segment provides instructions for designers and developers regarding the appropriate utilization of this component in various situations.

### Do:

- Use to indicate AI-generated or AI-assisted content.
- Use the appropriate `locale` to match the user's language.
- Use the `abbreviation` variant for compact contexts where space is limited.
- Use the `generated` or `modified` variant when a full label improves clarity.

### Don't:

- Don't use as a general-purpose tag — use `p-tag` instead.
- Don't use for non-AI-related labeling or categorization.

## Accessibility support

For the `abbreviation` variant, the component uses an `<abbr>` element so the full “artificial intelligence” term is available as the expansion.

## API

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `locale` | `'bg_BG'` `'bs_BA'` `'cs_CZ'` `'da_DK'` `'de_DE'` `'el_GR'` `'en_CY'` `'en_GB'` `'en_US'` `'es_ES'` `'et_EE'` `'fi_FI'` `'fr_FR'` `'he_IL'` `'hr_HR'` `'hu_HU'` `'is_IS'` `'it_IT'` `'lt_LT'` `'lv_LV'` `'me_ME'` `'mk_MK'` `'mt_MT'` `'nb_NO'` `'nl_NL'` `'pl_PL'` `'pt_PT'` `'ro_RO'` `'ru_RU'` `'sk_SK'` `'sl_SI'` `'sr_RS'` `'sv_SE'` `'tr_TR'` `'uk_UA'` | `'en_US'` | Locale for the AI text (ISO format, e.g. "de_DE"). |
| `variant` | `'abbreviation'` `'generated'` `'modified'` | `'generated'` | Variant to display: 'abbreviation' (e.g. "AI"), 'generated' (e.g. "AI-generated"), or 'modified' (e.g. "AI-modified"). |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.vue](./examples/Default.vue) |
| Within Checkbox | The `p-ai-tag` can be used inline with other form components. | [./examples/WithinCheckbox.vue](./examples/WithinCheckbox.vue) |
| Within Radio Group | The `p-ai-tag` can also be placed within the slotted label of a `p-radio-button-wrapper` to indicate AI-related content for individual radio options. | [./examples/WithinRadioGroup.vue](./examples/WithinRadioGroup.vue) |
| Within Form Label | The `p-ai-tag` can be placed within a `label` of a `p-select` (or any other form component) to indicate AI-related content for selected options. | [./examples/WithinFormLabel.vue](./examples/WithinFormLabel.vue) |
| Within Input Search | The `p-ai-tag` can be placed in the `end` slot of a `p-input-search` to indicate that the search results are AI-powered. | [./examples/WithinInputSearch.vue](./examples/WithinInputSearch.vue) |
| Within Text | The `p-ai-tag` can be placed inline within a `p-text` to indicate that the surrounding text content is AI-related. | [./examples/WithinText.vue](./examples/WithinText.vue) |
| Within Image | The `p-ai-tag` can be positioned as an overlay on images to indicate that the image content has been generated or modified by AI. | [./examples/WithinImage.vue](./examples/WithinImage.vue) |
| Within Table | The `p-ai-tag` can sit inline in a `p-table-head-cell` next to the column title — for example on a **Status** column when that data is AI-assisted. | [./examples/WithinTable.vue](./examples/WithinTable.vue) |
