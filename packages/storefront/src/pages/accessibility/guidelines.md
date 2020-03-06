# Guidelines

## What level of Web Accessibility do we need to support?
As a global company Porsche has to fulfill certain accessibility criteria which can be different from country to country. 
To grant a well balanced and global level of accessibility, we recommend to make all web applications compliant with the Web Content Accessibility Guidelines 2.0 [WCAG-2.0](https://www.w3.org/TR/WCAG20/) with **level AA**.

in the following paragraphs we have created a subset of the most important rules and measures to provide a good level of accessibility and a less chance to get dissuasion from laywers.

## Design guidelines

### Inclusive Design 


###  Contrasts
Best done early in the process, ensuring that the foreground and background colors of your site have sufficient contrast will help you making your site more readable for everyone. Contrast ratio is one tool for checking the contrast of your colors for both standard-vision and color-deficient users.

### Colors
* Be sure to layout and develop for some kinds of color blindness
* Never let color be the only indicator for a type of use
* Never use red and green buttons side by side

### States
Always provide visual support for certain states of trigger elements if available (e.g. links, buttons, forms, etc.). This can be:
* hover
* focus
* active
* touch (touch devices)
* disabled
* error

### Font sizes
While there is no official minimum font size for the web, generally 16px for body texts are a good starting point. Keep in mind that different fonts may have huge differences in the visually rendered font size.

### Touch support
Design and develop user interfaces that support a wide range of possible browser input devices (e.g. mouse, finger, pen, etc.). For example, make clickable areas big enough and place them far enough apart from one another to prevent "fat finger syndrome" on touch devices.




## Development guidelines

### Semantic Markup
This is probably the most important thing we can do to support **Web Accessibility**. Make sure that you use the right HTML tags for the right task:

Structure your code with a logical hierarchy of content blocks `(&lt;header>, &lt;main>, &lt;footer>, etc.) and headings (&lt;h1>, &lt;h2>, etc)`. Always develop your markup with semantics in mind. 

Here is a list of possible HTML tags you can use (there is so much more than divs!): https://developer.mozilla.org/en-US/docs/Web/HTML/Element

* Don't forget important attributes (e.g. an image tag always needs an "alt" attribute)!
* Keyboard navigation

For users who either cannot use or choose not to use a mouse, keyboard navigation is their primary means of reaching everything on screen. 
This audience includes users with motor impairments, such as repetitive stress injury (RSI) or paralysis, as well as screen-reader users. 
For a good keyboarding experience, aim to have a logical (semantic) tab order and easily discernable focus state styles.

### WAI-ARIA
Provide basic implementation of "Web Accessibility Initiative's Accessible Rich Internet Applications" specification (in short: WAI-ARIA) especially for screen-reader usage.
WAI-ARIA can modify existing element semantics or add semantics to elements where no native semantics exist. It can also express semantic patterns that don't exist at all in HTML, like a menu or a tab panel. 
Often, WAI-ARIA lets us create widget-type elements that wouldn't be possible with plain HTML.

Rules you can implement:
* Landmark roles (e.g. `&lt;footer role="contentinfo">`)
* Labels (e.g. `&lt;button aria-label="Button description">`) if not self-explanatory in context/based on content

Further information:
* ARIA spec
* WAI-ARIA basics
* An introduction to WAI-ARIA

### Font sizes
Be sure to develop as flexible as possible. That means that your site should properly work with a increased font-size up to 200%.



## Content guidelines


--- 

## Testing

## Tools to check Web Accessibility
* Chrome Extensions:  
[Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=de)
[Tota11y](https://chrome.google.com/webstore/detail/tota11y-plugin-from-khan/oedofneiplgibimfkccchnimiadcmhpe)
[AXE](https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd)

* Firefox Extensions:  
[WAVE evaluation tool or AXE](https://addons.mozilla.org/en-US/firefox/addon/wave-accessibility-tool/)
[WCAG contrast checker](https://addons.mozilla.org/de/firefox/addon/wcag-contrast-checker/)

* Colour Contrast Analyser:
[WebAIM](https://webaim.org/resources/contrastchecker/)
Accessibility Inspector inside the Firefox Developer Tools (available from Firefox version >= 61)

--- 

## Further information  
https://a11yproject.com/  
http://a11y-style-guide.com/style-guide/  
https://accessibilityinsights.io/en/
https://developers.google.com/web/fundamentals/accessibility/  
https://www.w3.org/TR/WCAG21/
