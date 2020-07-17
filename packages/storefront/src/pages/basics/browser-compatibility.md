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

To help inform the user the end of support of IE11 and Microsoft Edge <=18 we provide a **Notification Banner** in form of a JS snippet. 

#### Usage

Just drop the JS snippet at the end of the `body` tag of your application. Automatic translations for the following languages are provided: `'de' | 'ru' | 'fr' | 'en' | 'it' | 'pt' | 'es' | 'ja' | 'ko' | 'zh'` 

The language is set by scanning the `html` tag for the `lang` attribute. Supports is given for the following formats:
- `lang="en"`
- `lang="en_US"`
- `lang="en-US"`


``` 
<body>

...

  <script defer src="https://cdn.ui.porsche.com/porsche-design-system/notification-banner/v1/init.js"></script>
</body>
```

#### Advanced usage

Though we provide automatic translations, we cannot guarantee that this works in every environment. 
If something fails we provide a customized language function which you can use like this:

##### Case 1 - `lang` attribute of `html` tag is not detected or not set by the application:

Add the JS function before the `<script>` tag of the `init.js` reference and provide a custom locale which **must be one of the pre-defined ones**:

```
 <script>
   var PDSNB = {
     locale: function () {
       return 'fr'; // place your locale string here
     }
   }
 </script>
 <script defer src="https://cdn.ui.porsche.com/porsche-design-system/notification-banner/v1/init.js"></script>
```

##### Case 2 -  You need a custom translation because the language is not provided within the script:

Add the JS function before the `<script>` tag of the `init.js` reference and provide a custom language string:

```
 <script>
   var PDSNB = {
     language: function () {
       return '<strong>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</strong><br> Stet clita kasd gubergren, no sea takimata sanctus est <a href="https://www.google.com/chrome/" target="_blank" rel="nofollow noopener">Google Chrome</a>, <a href="https://www.mozilla.org/firefox/new/" target="_blank" rel="nofollow noopener">Mozilla Firefox</a> o <a href="https://www.microsoft.com/edge" target="_blank" rel="nofollow noopener">Microsoft Edge</a>.';
     }
   }
 </script>
 <script defer src="https://cdn.ui.porsche.com/porsche-design-system/notification-banner/v1/init.js"></script>
```

#### How it works

The `init.js` is an `800 byte` sized file which has a browser detection for IE11 and Edge<=18. 
If the target browser is detected it requests another JS file which adds some HTML/CSS to the DOM and shows the Notification Banner. 
TThe language is detected by scanning the `html` tag for the `lang` attribute.
Though the Notification Banner is a kind of warning, the user should continue browsing the application. Therefor a session cookie is added to prevent popping up the banner again on route change.