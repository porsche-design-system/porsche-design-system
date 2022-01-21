# Browser Notifications

<TableOfContents></TableOfContents>

# Browser Support Notification

## Usage

We provide two notifications variants to show the user the corresponding information in regard to its used browser.

Include the **Browser Notification** into your project by importing and calling the provided `includeBanner()` or `includeOverlay()` function within your `index.html` just before the closing `</body>` tag (requires a bundler like Webpack, Rollup or a small Node JS script). This adds a `<script>` tag with pre-defined browser- and feature detection pointing to the corresponding browser notification JS snippet hosted on a CDN.

### Banner notification

The **Banner** variant is meant to inform the user if they access the application with a browser which doesn't get full support by the application. The banner is placed above the page and can be closed by the user.

Integration through `includeBanner()` partial.

| Browser Detection           | Initialized |
| --------------------------- | ----------- |
| **MS Edge(HTML) <= 18**     | ✓           |
| **IE <= 11**                | ✓           |
| **Microsoft Edge Chromium** | ✗           |

### Banner Example
<PartialDocs name="includeBanner" :partialPackageName="partialPackageName" location="body"></PartialDocs>

### Overlay notification

The **Overlay** variant is meant to inform the user when they access the application if their browser doesn't support **custom elements**
or browser technologies like [**IntersectionObserver**](https://caniuse.com/?search=intersectionobserver) and [**MutationObserver**](https://caniuse.com/?search=mutationobserver) which are required to render the Porsche Design System components.
The overlay is placed above the page, covers it completely and can't be closed or removed by the user.

Integration through `includeOverlay()` partial.

| Feature Detection                                                                               | Initialized |
| ------------------------------------------------------------------------------------------------| ----------- |
| **Custom elements != true**                                                                     | ✓           |
| **IntersectionObserver != true**                                                                | ✓           |
| **MutationObserver != true**                                                                    | ✓           |
| **Custom elements && IntersectionObserver && MutationObserver**                                 | ✗           |

### Overlay Example
<PartialDocs name="includeOverlay" :partialPackageName="partialPackageName" location="body"></PartialDocs>

## Translations

Automatic translations for the following languages are provided:  
`'de' | 'ru' | 'fr' | 'en' | 'it' | 'pt' | 'es' | 'ja' | 'ko' | 'zh' | 'nl' | 'pl' | 'cs' | 'da' | 'et' | 'fi' | 'lt' | 'lv' | 'no' | 'sl' | 'sv' | 'tr' | 'uk'`

The **Browser Notification** is looking once as soon as the script initializes for the obligatory `lang` attribute defined in the `html` tag. Support is given for the following formats, e.g.:

- `lang="en"`
- `lang="en_US"`
- `lang="en-US"`

If none of these languages can be found, it will fall back to `en`.

## Troubleshooting

There always might be a case where something goes wrong. Here are some possible answers:

1. **Q:** Why does the translation not get recognized automatically?  
   **A:** Mostly this is a result of false order of script loading and setting translation key by the application. It's required that the `lang` attribute in the `html` tag is defined with the correct value before the **Browser Notification** script gets initialized.  
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