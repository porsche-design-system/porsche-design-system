# Cookies Fallback Script

**Function name:** `getCookiesFallbackScript()`

Although the Porsche Design System does not rely on browser cookies, a blocking overlay is shown asking the user to
activate browser cookies in case those are disabled completely.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react|vue}` packages
which needs to be injected before the closing `</body>` of your `index.html`.

<p-button :theme="this.$store.getters.storefrontTheme" v-on:click="showFallback">Force display of cookies
fallback</p-button>

## Supported options

<!-- prettier-ignore -->
| Option   | Description                                                                                                                                                                                                                                                                  | Type                        | Default |
| -------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --------------------------- | ------- |
| `cdn`    | Decides from which CDN the resources are loaded.                                                                                                                                                                                                                             | `'auto' | 'cn'`             | `'auto'` |
| `format` | Defines the output format of the partial. By default, it returns a html string.<br> For `jsx` it returns a jsx element.<br> For `sha256` it returns a SHA-256 hash of the innerHTML to use in a [Content Security Policy (CSP)](must-know/security/content-security-policy). | `'html' | 'jsx' | 'sha256'` | `'html'` |

When using `jsx` in the `format` option, it is necessary to have `react/jsx-runtime` as a dependency in the project
included.

## Examples

Project integration differs based on the project setup.  
The following showcases the most common ways.

<PartialDocs name="getCookiesFallbackScript" :params="params" location="body"></PartialDocs>

## Translations

Automatic translations for the following languages are provided:  
`'de' | 'ru' | 'fr' | 'en' | 'it' | 'pt' | 'es' | 'ja' | 'ko' | 'zh' | 'nl' | 'pl' | 'cs' | 'da' | 'et' | 'fi' | 'lt' | 'lv' | 'no' | 'sl' | 'sv' | 'tr' | 'uk'`

As soon as the **Cookies Fallback** script initializes, it looks for the obligatory `lang` attribute defined in the
`html` tag. Support is given for the following formats, e.g.:

- `lang="en"`
- `lang="en_US"`
- `lang="en-US"`

If none of these languages can be found, it will fall back to `en`.

## Troubleshooting

There always might be a case where something goes wrong. Here are some possible answers:

1. **Q:** Why does the translation not get recognized automatically?  
   **A:** Mostly this is a result of false order of script loading and setting translation key by the application. It's
   required that the `lang` attribute in the `html` tag is defined with the correct value **before** the **Cookies
   Fallback** script gets initialized.  
   **A:** The translation key is not part of the provided keys (see "Translations")  
   **A:** The translation key has not the correct format (see "Translations")
2. **Q:** Why are there no implementation guidelines for my JS framework?  
   **A:** Implementing a third party script can be done in many ways regarding the setup of your application. So there
   isn't a solely true way to integrate it in a specific framework. Just one rule of thumb: **It should be initialized
   as late as possible.**

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { CDN_BASE_PATH, FALLBACKS_MANIFEST } from '@porsche-design-system/fallbacks';

@Component
export default class Code extends Vue {
  public params = [
    {
      value: ""
    },
    {
      value: "{ cdn: 'cn' }",
      comment: 'force using China CDN',
    },
  ];

  public showFallback = (): void => {
    const script = document.createElement('script');
    const src = `https://cdn.ui.porsche.com${CDN_BASE_PATH}/${FALLBACKS_MANIFEST.cookies}`;
    script.src = process.env.NODE_ENV === 'production' ? src : src.replace('https://cdn.ui.porsche.com/porsche-design-system', 'http://localhost:3001');
    document.body.appendChild(script);
  };
}
</script>

<style scoped lang="scss">
  :deep(table code::before) {
    content: '' !important;
  }
</style>
