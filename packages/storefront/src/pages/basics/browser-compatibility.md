# Browser Compatibility

At Porsche we want the best performance, security and modern feature opportunities for our applications and users. Therefore we follow the release cycles of the global browser providers and continuously measure our browser & platform usage share of all Porsche applications ([view data](https://datastudio.google.com/open/1kMBbEg9F79q_QOg2zFtz52I_S85Fy47b)).

To ensure visual and functional compatibility, we do automatic and manual testing for the defined set of browsers and versions. If a browser is not listed on this page we don’t test it, provide assistance or fix bugs for it.

## Supported Browsers & Platforms

We support the **following Browsers in the latest stable and deprecated predecessor version**:

- **Google Chrome** on Windows and macOS, Android and iOS ([see version history](https://en.wikipedia.org/wiki/Google_Chrome_version_history))
- **Microsoft Edge Chromium** on Windows ([see version history](https://en.wikipedia.org/wiki/Microsoft_Edge#Release_history))
- **Mozilla Firefox** on Windows and macOS ([see version history](https://en.wikipedia.org/wiki/Firefox_version_history))
- **Apple Safari** on macOS and iOS ([see version history](https://en.wikipedia.org/wiki/Safari_version_history#Safari_13))

<p-text size="x-small">Chromium is the basis of Microsoft Edge since 79.0, Android Webview since 33.0 and of Samsung Internet since 11.0. <br/>We want to support the deprecated predecessor version, to bridge the temporal updating period of the users.</p-text>

## End of support for IE 11 and EdgeHTML

Porsche decided to **end the support for Microsoft Internet Explorer 11 and EdgeHTML**.

The **Porsche Design System v1.x** is the last major version to support Microsoft Internet Explorer 11 and EdgeHTML. New features introduced starting with the Porsche Design System v2.x are only compatible and tested with the listed browsers and only bugs specific to them will be fixed.

### Why do we stop the support?

To empower the opportunities of modern web standards including our technical foundation of using web components (Custom Elements, Shadow DOM, CSS Variables), and to deliver the best possible user experience, performance and stability. Also, the share of IE11 and EdgeHTML users is the significant minority of our total users. Thus, we don't want to impair the experience for the vast majority.

In 2015 Microsoft released Edge to supersede Internet Explorer, pre-installed on Windows 10 and also [recommended by Microsoft to be used as default browser](https://docs.microsoft.com/de-de/lifecycle/faq/internet-explorer-microsoft-edge). Since 2020 the new Microsoft Edge versions are based on Chromium, available for all operating systems. Thus, both IE11 and Microsoft Edge 18 are outdated browsers.

### Can users still access our applications?

Windows, macOS, iOS and Android have at least one supported browser pre-installed. In most cases continuously or at least frequently updated to the latest version. If a user runs into problems using your site with a not-supported browser, they can easily open it with a different browser.

**In order to guide the users and avoid dead-ends, we created an easy-to-use Browser Notification snippet, that should be implemented in all applications using the Porsche Design System.**

### Browser Notification

To help inform the user about the **end of support of Microsoft Internet Explorer 11 and EdgeHTML** we provide a **Browser Notification Banner** and **Overlay** in form of a npm package `@porsche-design-system/browser-notification`.

#### Install

It's necessary to have access to the Porsche Design System private npm registry to be able to install the `@porsche-design-system/browser-notification` npm package. If you don't have an account yet, please first [read more about getting started as developer](start-coding/introduction).

```
// install with npm:
npm install @porsche-design-system/browser-notification

// install with yarn:
yarn add @porsche-design-system/browser-notification
```

#### Usage

We provide two notifications variants to show the user the corresponding information in regard to its used browser.

Include the **Browser Notification** into your project by importing and calling the provided `includeBanner()` or `includeOverlay()` function within your `index.html` just before the closing `</body>` tag (requires a bundler like Webpack, Rollup or a small Node JS script). This adds a `<script>` tag with pre-defined browser- and feature detection pointing to the corresponding browser notification JS snippet hosted on a CDN.

##### Banner notification

The **Banner** variant is meant to inform the user if they access the application with a browser which doesn't get full support by the application. The banner is placed above the page and can be closed by the user.

Integration through `includeBanner()` partial.

| Browser Detection           | Initialized |
| --------------------------- | ----------- |
| **MS Edge(HTML) <= 18**     | ✓           |
| **IE <= 11**                | ✓           |
| **Microsoft Edge Chromium** | ✗           |

##### Overlay notification

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

##### React / Vue JS

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Some title</title>
  </head>
  <body>
    <div id="app"></div>

    <!-- inline version of the banner or overlay init script -->
    <%= require('@porsche-design-system/browser-notification').includeBanner() %>
    <%= require('@porsche-design-system/browser-notification').includeOverlay() %>
  </body>
</html>
```

##### Angular / Vanilla JS

```
// index.html
<body>
  <!--PLACEHOLDER-->
</body>

// package.json
"scripts": {
  "banner": "partial=$(node -e 'console.log(require(\"@porsche-design-system/browser-notification\").includeBanner().replace((\\\\[bd\\/]|&)/g, \"\\\\$1\"))') && regex='<!--PLACEHOLDER-->|<script>.*browser-notification.*<\\/script>' && sed -i'' -E -e \"s@$regex@$partial@\" index.html",
  "overlay": "partial=$(node -e 'console.log(require(\"@porsche-design-system/browser-notification\").includeOverlay().replace((\\\\[bd\\/]|&)/g, \"\\\\$1\"))') && regex='<!--PLACEHOLDER-->|<script>.*browser-notification.*<\\/script>' && sed -i'' -E -e \"s@$regex@$partial@\" index.html"
}
```

#### Translations

Automatic translations for the following languages are provided:  
`'de' | 'ru' | 'fr' | 'en' | 'it' | 'pt' | 'es' | 'ja' | 'ko' | 'zh' | 'nl' | 'pl' | 'cs' | 'da' | 'et' | 'fi' | 'lt' | 'lv' | 'no' | 'sl' | 'sv' | 'tr' | 'uk'`

The **Browser Notification** is looking once as soon as the script initializes for the obligatory `lang` attribute defined in the `html` tag. Support is given for the following formats, e.g.:

- `lang="en"`
- `lang="en_US"`
- `lang="en-US"`

If none of these languages can be found, it will fall back to `en`.

#### Troubleshooting

There always might be a case where something goes wrong. Here are some possible answers:

1. **Q:** Why does the translation not get recognized automatically?  
   **A:** Mostly this is a result of false order of script loading and setting translation key by the application. It's required that the `lang` attribute in the `html` tag is defined with the correct value before the **Browser Notification** script gets initialized.  
   **A:** The translation key is not part of the provided keys (see "Translations")  
   **A:** The translation key has not the correct format (see "Translations")
2. **Q:** Why are there no implementation guidelines for my JS framework?  
   **A:** Implementing a third party script can be done in many ways regarding the setup of your application. So there isn't a solely true way to integrate it in a specific framework. Just one rule of thumb: **It should be initialized as late as possible.**
