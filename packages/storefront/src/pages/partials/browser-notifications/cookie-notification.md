# Browser Notifications

<TableOfContents></TableOfContents>

## Cookie Notification 

## Usage

We provide an overlay variant which asks the visitor to activate his cookies.

Include the **Cookie Notification** into your project by importing and calling the provided `includeCookieOverlay()` function within your `index.html` just before the closing `</body>` tag (requires a bundler like Webpack, Rollup or a small Node JS script). This adds a `<script>` tag with pre-defined cookie detection pointing to the corresponding browser notification JS snippet hosted on a CDN.

| Cookie Detection           | Initialized |
| -------------------------- | ----------- |
| **enabled**                | ✗           |
| **disabled**               | ✓           |

### Example
<PartialDocs name="includeCookieOverlay" :partialPackageName="partialPackageName" location="body"></PartialDocs>

## Translations

Automatic translations for the following languages are provided:  
`'de' | 'ru' | 'fr' | 'en' | 'it' | 'pt' | 'es' | 'ja' | 'ko' | 'zh' | 'nl' | 'pl' | 'cs' | 'da' | 'et' | 'fi' | 'lt' | 'lv' | 'no' | 'sl' | 'sv' | 'tr' | 'uk'`

As soon as the **Cookie Notification** script initializes, it looks for the obligatory `lang` attribute defined in the `html` tag. Support is given for the following formats, e.g.:

- `lang="en"`
- `lang="en_US"`
- `lang="en-US"`

If none of these languages can be found, it will fall back to `en`.

## Troubleshooting

There always might be a case where something goes wrong. Here are some possible answers:

1. **Q:** Why does the translation not get recognized automatically?  
   **A:** Mostly this is a result of false order of script loading and setting translation key by the application. It's required that the `lang` attribute in the `html` tag is defined with the correct value before the **Cookie Notification** script gets initialized.  
   **A:** The translation key is not part of the provided keys (see "Translations")  
   **A:** The translation key has not the correct format (see "Translations")
2. **Q:** Why are there no implementation guidelines for my JS framework?  
   **A:** Implementing a third party script can be done in many ways regarding the setup of your application. So there isn't a solely true way to integrate it in a specific framework. Just one rule of thumb: **It should be initialized as late as possible.**

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';


@Component
export default class Code extends Vue {
  public partialPackageName = 'browser-notification';
}
</script>