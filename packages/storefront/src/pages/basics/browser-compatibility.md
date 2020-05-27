# Browser Compatibility

At Porsche we want the best performance, security and modern feature opportunities for our  applications and users. Therefore we follow the release cycles of the global browser providers and analyse the browser & platform usage share of all Porsche applications ([view data](https://datastudio.google.com/open/1kMBbEg9F79q_QOg2zFtz52I_S85Fy47b)).

To ensure visual and functional compatibility, we do automatic and manual testing for the defined set of browsers and versions. If a browser is not listed on this page we don’t test it, provide assistance or fix bugs for it.

### Supported Browsers & Platforms:

* **Chrome** on Windows and macOS, Android and iOS ([latest 2 stable versions](https://en.wikipedia.org/wiki/Google_Chrome_version_history))
* **Microsoft Edge Chromium** on Windows ([latest 2 stable versions](https://en.wikipedia.org/wiki/Microsoft_Edge#Release_history))
* **Mozilla Firefox** on Windows and macOS ([latest 2 stable versions](https://en.wikipedia.org/wiki/Firefox_version_history))
* **Safari** on macOS and iOS ([latest 2 stable versions](https://en.wikipedia.org/wiki/Safari_version_history#Safari_13))

**Annotation**  
Chromium is the basis starting from Micrisoft Edge 79, Android Webview 33 and of Samsung Internet since 11.

## End of support announcement for IE 11 and Edge 15-18

In 2015 Microsoft released Edge to supersede Internet Explorer, pre-installed on Windows 10 and also [recommended by Microsoft to be used as default browser](https://docs.microsoft.com/de-de/lifecycle/faq/internet-explorer-microsoft-edge). Since 2020 Microsoft Edge versions are based on Chromium, also available for all operation systems.

### Why do we stop the support?
The share of use of not-supported browsers is the significant minority of our total users. To empower the opportuities of modern web standards including web components, and deliver the best possible user experience, performance and stability across all of our applications for the vast majority, we have decided to end support for Microsoft Internet Explorer 11 and the outdated Edge versions 15-18.

### Can users still access our applications?
Windows, macOS, iOS and Anroid have at least one supported browser pre-installed. In the most cases continuously or at least frequently updated to the latest version. If an user runs into problems using your site with a not-supported browser, they can easily open it with a different browser.

Please do not create any dead-end for users, but consistently guide them by implement and use our global Browser Notification Component.

### When is this happening?

The Porsche Design System v1.x is the last major version to support Internet Explorer 11 and Microsoft Edge 15-18. 

New features introduced with v2.x are only compatible and tested with the listed browsers and only bugs specific to them will be fixed.