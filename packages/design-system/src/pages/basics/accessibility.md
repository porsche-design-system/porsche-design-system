# Accessibility Criteria

## What is web accessibility?
Broadly speaking, when we say a site is accessible, we mean that the site's content is available to, and its functionality can be operated by, literally anyone. (This includes non-human visitors to your site, e.g. search engine robots!)
As developers, it's easy to assume that all users can see and use a keyboard, mouse or touch screen, and can interact with your page content the same way you do. 
This can lead to an experience that works well for some people, but creates issues that range from simple annoyances to show-stoppers for others.

Accessibility therefore relates to the experience of users who might be outside the narrow range of the "typical" user, and who might access or interact with things differently than you expect. 
Specifically, it concerns users experiencing some type of impairment or disability – and bear in mind that such an experience might be non-physical or temporary.

For example, although we tend to centre our discussion of accessibility on users with physical impairments, we can all relate to the experience of using an interface that is not accessible to us for other reasons. 
Have you ever had a problem using a desktop site on a mobile phone, or seen the message "This content is not available in your area", or been unable to find a familiar menu on a tablet? Those are all accessibility issues.

## Why do we need it?
As maintainers of Porsche UI Kit, we always want the best experience for all users. You might argue that, as an OEM in the automotive sector, we do not need to give support to visually impaired people. But this is a very short-sighted point of view.
Just think about all the services Porsche wants to offer around the car that have nothing to do with driving itself. Or think about people which have a "simple" red-green colour blindness (about 10% of all humans). 
Or what about the average age of the target audience of Porsche customers? It's an average of 55 years! As you can see, web accessibility is for all users, not just blind people.

The Porsche UI Kit approach is to deliver highly usable components that are not limited to certain use cases. They should work everywhere and for everyone! 
That's why we develop and offer high-quality, standardised and accessible components for all possible environments and use cases.

## What level of web accessibility do we need to support?
Due to the fact that we, as the Porsche Company, are not required by law to fully support the worldwide Web Content Accessibility Guidelines (WCAG) 2.1 in our applications, we have created a list of basic features and best practices we want to support:

### Semantic Markup (DEVELOPMENT)
This is probably the most important thing we can do to support web accessibility. Make sure that you use the right HTML tags for the right task:

Structure your code with a logical hierarchy of content blocks `(&lt;header>, &lt;main>, &lt;footer>, etc.) and headings (&lt;h1>, &lt;h2>, etc)` Always develop your markup with semantics in mind. Here is a list of possible HTML tags you can use (there is so much more than divs!): https://developer.mozilla.org/en-US/docs/Web/HTML/Element
Don't forget important attributes (e.g. an image tag always needs an "alt" attribute)
Keyboard navigation (DEVELOPMENT)
For users who either cannot use or choose not to use a mouse, keyboard navigation is their primary means of reaching everything on screen. 
This audience includes users with motor impairments, such as repetitive stress injury (RSI) or paralysis, as well as screen-reader users. 
For a good keyboarding experience, aim to have a logical (semantic) tab order and easily discernable focus state styles.

### WAI-ARIA (DEVELOPMENT)
Provide basic implementation of Web Accessibility Initiative's Accessible Rich Internet Applications specification (in short: WAI-ARIA) especially for screen-reader usage.
WAI-ARIA can modify existing element semantics or add semantics to elements where no native semantics exist. It can also express semantic patterns that don't exist at all in HTML, like a menu or a tab panel. 
Often, WAI-ARIA lets us create widget-type elements that wouldn't be possible with plain HTML.

Rules you can implement:
* Landmark roles (e.g. `&lt;footer role="contentinfo">`)
* Labels (e.g. `&lt;button aria-label="Button description">`) if not self-explanatory in context/based on content

Further information:
* ARIA spec
* WAI-ARIA Basics
* An introduction to WAI-ARIA
###  Contrasts (DESIGN)
Best done early in the process, by ensuring that the foreground and background colours of your site have sufficient contrast, you will help make your site more readable for everyone. Contrast Ratio is one tool for checking the contrast of your colours for both standard-vision and colour-deficient users.

### Colours (DESIGN)
Be sure to layout and develop for some kinds of colour blindness; never let colour be the only indicator for a type of use); never use red and green buttons side by side

### Font sizes (DESIGN)
While there is no official minimum font size for the web, it is generally agreed that 16px for body text is a good starting point. But keep in mind that different fonts may have huge differences in the visually rendered font size.

### States (DEVELOPMENT + DESIGN)
Always provide visually support for certain states of trigger elements if available (e.g. links, buttons, forms, etc.). This can be:
* hover
* focus
* active
* touch (touch devices)
* disabled
* error

Touch support (DESIGN)
Design and develop user interfaces that support a wide range of possible browser input devices (e.g. mouse, finger, pen, etc.). For example, make clickable areas big enough and place them far enough apart from one another to prevent "fat finger syndrome" on touch devices.

## Tools to check web accessibility
* Chrome Extensions:  
[Accessibility insights](https://chrome.google.com/webstore/detail/accessibility-insights-fo/pbjjkligggfmakdaogkfomddhfmpjeni)
[Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=de)
[Tota11y](https://chrome.google.com/webstore/detail/tota11y-plugin-from-khan/oedofneiplgibimfkccchnimiadcmhpe)
[AXE](https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd)

* Firefox Extensions:  
[WAVE evaluation tool or AXE](https://addons.mozilla.org/en-US/firefox/addon/wave-accessibility-tool/)
[WCAG contrast checker](https://addons.mozilla.org/de/firefox/addon/wcag-contrast-checker/)

* Colour Contrast Analyser:
[WebAIM](https://webaim.org/resources/contrastchecker/)
Accessibility Inspector inside the Firefox Developer Tools (available from Firefox version >= 61)

**Further information**  
https://a11yproject.com/  
http://a11y-style-guide.com/style-guide/  
https://accessibilityinsights.io/en/
https://developers.google.com/web/fundamentals/accessibility/  
https://www.w3.org/TR/WCAG21/
