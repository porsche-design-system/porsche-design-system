# Browser Compatibility

At Porsche we want the best performance, security and modern feature opportunities for our  applications and users. Therefore we follow the release cycles of the global browser providers and continuously measure our browser & platform usage share of all Porsche applications ([view data](https://datastudio.google.com/open/1kMBbEg9F79q_QOg2zFtz52I_S85Fy47b)).

To ensure visual and functional compatibility, we do automatic and manual testing for the defined set of browsers and versions. If a browser is not listed on this page we don’t test it, provide assistance or fix bugs for it.

## Supported Browsers & Platforms

We support the **following Browsers in the latest stable and deprecated predecessor version**:

* **Google Chrome** on Windows and macOS, Android and iOS ([see version history](https://en.wikipedia.org/wiki/Google_Chrome_version_history))
* **Microsoft Edge Chromium** on Windows ([see version history](https://en.wikipedia.org/wiki/Microsoft_Edge#Release_history))
* **Mozilla Firefox** on Windows and macOS ([see version history](https://en.wikipedia.org/wiki/Firefox_version_history))
* **Apple Safari** on macOS and iOS ([see version history](https://en.wikipedia.org/wiki/Safari_version_history#Safari_13))
 
<p-text size="x-small">Chromium is the basis of Microsoft Edge since 79.0, Android Webview since 33.0 and of Samsung Internet since 11.0. <br/>We want to support the deprecated predecessor version, to bridge the temporal updating period of the users.</p-text>

## End of support for IE 11 and reduced support for Edge 18

Porsche decided to **end the support for Microsoft Internet Explorer 11**.  
**Microsoft Edge 18 (EdgeHTML)** is still working but supported with low priority assistance and no test coverage.

The **Porsche Design System v1.x** is the last major version to support Internet Explorer 11 and Microsoft Edge 18. 
New features introduced starting with the Porsche Design System v2.x are only compatible and tested with the listed browsers and only bugs specific to them will be fixed.

### Why do we stop the support?

To empower the opportunities of modern web standards including our technical foundation of using web components (custom elements), and to deliver the best possible user experience, performance and stability. Also, the share of IE11 and EdgeHTML users is the significant minority of our total users. Thus, we don't want to impair the experience for the vast majority.

In 2015 Microsoft released Edge to supersede Internet Explorer, pre-installed on Windows 10 and also [recommended by Microsoft to be used as default browser](https://docs.microsoft.com/de-de/lifecycle/faq/internet-explorer-microsoft-edge). Since 2020 the new Microsoft Edge versions are based on Chromium, available for all operating systems. Thus, both IE11 and Microsoft Edge 18 are outdated browsers.

### Can users still access our applications?

Windows, macOS, iOS and Android have at least one supported browser pre-installed. In most cases continuously or at least frequently updated to the latest version. If a user runs into problems using your site with a not-supported browser, they can easily open it with a different browser.

**In order to guide the users and avoid dead-ends, we created an easy-to-use Browser Notification snippet, that should be implemented in all applications using the Porsche Design System.**

### Notification Banner

To help inform the user the **end of support of IE11** and **Microsoft Edge <=18** we provide a **Browser Notification Banner** in form of npm package.
This package is not part of Porsche Design System and is delivered as self invoking VanillaJS bundle. So it can be used in many Framework environments.

The package contains just references to the JS files which are hosted on our CDN. 

#### Install
It's necessary to have access to the Porsche Design System private npm registry to be able to install the `@porsche-design-system/browser-notification-banner` npm package. 
If you don't have an account yet, please first [read more about getting started as developer](#/start-coding/introduction).

```
// install with npm:
npm install @porsche-design-system/browser-notification-banner

// install with yarn:
yarn add @porsche-design-system/browser-notification-banner
```

#### Basic usage
Simply import `CDN_BASE_URL` and `JS_MANIFEST ` in you main app file where you want to make use of the **@porsche-design-system/browser-notification-banner**.


```
import { CDN_BASE_URL, JS_MANIFEST } from '@porsche-design-system/browser-notification-banner';
```

Then you should insert the main `index.js` file when your app is mounted, e.g.:

```
private async mounted(): Promise<void> {
  const url = CDN_BASE_URL;
  const indexFileName = JS_MANIFEST.index;
  const body = document.getElementsByTagName('body')[0];
  const notificationBanner = document.createElement('script');
  notificationBanner.src = `${url}/${indexFileName}`;
  body.appendChild(notificationBanner)
}
``` 

#### Advanced usage
If you want to set your own browser detection, just ignore the `index.js` and load the `banner.js` after detection has finished, e.g.:

```
const ieVersion = (uaString: string) => {
  uaString = uaString || navigator.userAgent;
  const match = /\b(MSIE |Trident.*?rv:|Edge\/)(\d+)/.exec(uaString);
  if (match) return parseInt(match[2])
}
if (ieVersion(ua) === 11) {
  const url = CDN_BASE_URL;
  const indexFileName = JS_MANIFEST.banner;
  const body = document.getElementsByTagName('body')[0];
  const notificationBanner = document.createElement('script');
  notificationBanner.src = `${url}/${indexFileName}`;
  body.appendChild(notificationBanner)
}
``` 

#### Fallback usage if nor npm package can be installed

Just drop the JS snippet at the end of the `body` tag of your application. Be sure to point to the latest release!

``` 
<body>

...
  // if used as static file, be sure to point to the latest release
  <script defer src="https://cdn.ui.porsche.com/porsche-design-system/notification-banner/index.min.1.0.0.js"></script>
</body>
```

#### Translations
Automatic translations for the following languages are provided: `'de' | 'ru' | 'fr' | 'en' | 'it' | 'pt' | 'es' | 'ja' | 'ko' | 'zh' | 'nl' | 'pl'` 

The language is set by scanning the `html` tag for the `lang` attribute. Support is given for the following formats:
- `lang="en"`
- `lang="en_US"`
- `lang="en-US"`

If none of these languages can be found, it will fallback to `en`;

#### How it works

The `index.js` is an `600 byte` sized file which has a browser detection for **IE11 and Edge<=18**. 
If the target browser is detected it requests another JS file which adds some HTML/CSS to the DOM and shows the Notification Banner. 
Though the Notification Banner is a kind of warning, the user should continue browsing the application. Therefor a session cookie is added to prevent popping up the banner again on route change.