# Browser Compatibility

At Porsche we want the best performance, security and modern feature opportunities for our applications and users.
Therefore we follow the release cycles of the global browser providers and continuously measure our browser & platform
usage share of all Porsche applications
([view data](https://datastudio.google.com/open/1kMBbEg9F79q_QOg2zFtz52I_S85Fy47b)).

To ensure visual and functional compatibility, we do automatic and manual testing for the defined set of browsers and
versions. If a browser is not listed on this page we don’t test it, provide assistance or fix bugs for it.

<TableOfContents></TableOfContents>

## Supported Browsers & Platforms

We support the **following Browsers in the latest stable and deprecated predecessor version**:

- **Google Chrome** on Windows and macOS, Android and iOS ([see version history](https://chromereleases.googleblog.com))
- **Microsoft Edge Chromium** on Windows
  ([see version history](https://learn.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel))
- **Mozilla Firefox** on Windows and macOS ([see version history](https://mozilla.org/en-US/firefox/releases))
- **Apple Safari** on macOS and iOS
  ([see version history](https://developer.apple.com/documentation/safari-release-notes))

<p-text :theme="this.$store.getters.storefrontTheme" size="x-small">Chromium is the basis of Microsoft Edge since 79.0,
Android Webview since 33.0 and of Samsung Internet since 11.0. <br/>We want to support the deprecated predecessor
version, to bridge the temporal updating period of the users.</p-text>

## End of support for IE 11 and EdgeHTML

Porsche decided to **end the support for Microsoft Internet Explorer 11 and EdgeHTML**.

The **Porsche Design System v1.x** is the last major version to support Microsoft Internet Explorer 11 and EdgeHTML. New
features introduced starting with the Porsche Design System v2.x are only compatible and tested with the listed browsers
and only bugs specific to them will be fixed.

### Why do we stop the support?

To empower the opportunities of modern web standards including our technical foundation of using web components (Custom
Elements, Shadow DOM, CSS Variables), and to deliver the best possible user experience, performance and stability. Also,
the share of IE11 and EdgeHTML users is the significant minority of our total users. Thus, we don't want to impair the
experience for the vast majority.

In 2015 Microsoft released Edge to supersede Internet Explorer, pre-installed on Windows 10 and also
[recommended by Microsoft to be used as default browser](https://docs.microsoft.com/de-de/lifecycle/faq/internet-explorer-microsoft-edge).
Since 2020 the new Microsoft Edge versions are based on Chromium, available for all operating systems. Thus, both IE11
and Microsoft Edge 18 are outdated browsers.

### Can users still access our applications?

Windows, macOS, iOS and Android have at least one supported browser pre-installed. In most cases continuously or at
least frequently updated to the latest version. If a user runs into problems using your site with a not-supported
browser, they can easily open it with a different browser.

**In order to guide the users and avoid dead-ends, we created an easy-to-use Browser Notification partial, that should
be implemented in all applications using the Porsche Design System.**

### Browser Notification

To help inform the user about the **end of support of Microsoft Internet Explorer 11 and EdgeHTML** we provide
fallbacks.

For information on how to use it, see [Browser Support Fallback](partials/browser-support-fallback-script).
