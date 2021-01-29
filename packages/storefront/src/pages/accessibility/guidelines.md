# Guidelines

## Level of Web Accessibility we need to support
As a **global company** Porsche has to fulfil certain accessibility criteria which can be different from country to country. 
To grant a well balanced and global level of accessibility, we recommend making all web applications compliant with the **Web Content Accessibility Guidelines 2.0 [WCAG-2.0](https://www.w3.org/TR/WCAG20/)** at **level AA**. 


## WCAG 2.0 AA checklist 
The following list is a breakdown of the most important rules and measures to provide a good level of accessibility and less risk of legal entanglement from lawyers.

### Alternatives
- **Alt text:** All images and non-text content needs alt text (there are exceptions)
- **Video & Audio alternatives:** All video-only and audio-only content has a text transcript. Transcripts are clearly labelled and linked below the media.
- **Closed captioning:** All video with sound contains accurate closed captioning.
- **Audio description:** For any video, add an alternative video that includes audio description of information not presented in the original video’s soundtrack (exceptions) or include a text.
- **Live captions:** Any live video presentations must have closed captions.
- **Audio description:** An audio description is optional under 1.2.3 level A but not in 1.2.5 AA.

### Presentation
- **Website structure:** Use proper markup techniques to structure your website’s content (e.g. use correct heading tags and HTML for ordered and unordered lists)
- **Meaningful order:** Present content in a meaningful order and sequence so that it reads properly.
- **Sensory characteristics:** When providing detailed instructions, make it so they aren’t reliant on a single sensory ability.
- **Use of color:** Do not rely on color alone to convey information.
- **Audio control:** Any audio must be able to be paused, stopped, or muted.
- **Color contrast:** There must be a color contrast ratio of at least 4.5:1 between all text and background.
- **Text resize:** Text must be able to be resized up to 200% without negatively affecting the ability to read content or use functions.
- **Images of text:** Do not use images of text unless necessary (e.g. logo).

### User control
- **Keyboard only:** All content and functions on a website must be accessible by keyboard only (i.e. no mouse).
- **No keyboard trap:** Keyboard-only users must never get stuck on any part of the website; they must be able to navigate forwards and backwards.
- **Adjustable time:** If there any time limits on a website, users have the ability to turn it off, adjust it, extend it.
- **Pause, stop, hide:** If there is content that blinks, scrolls, moves, users must have the ability to pause, stop, or hide it.
- **Three flashes or below:** Web pages do not contain anything that flashes more than three times in any one second period.
- **Skip navigation link:** A “Skip to Content” or “Skip Navigation” link allows users to bypass the heading and go straight to the main content.

### Understandable
- **Page titles:** Each page of a website needs to have a unique and descriptive page title.
- **Focus order:** Users must be able to navigate through a website in a logical sequential order that preserves meaning.
- **Link anchor text:** The purpose of each link should be clear based on its anchor text (e.g. don’t use “click here”)
- **Multiple ways:** There are multiple ways to access different pages/information on a website (e.g. search bar, nav menus, sitemap, breadcrumbs, helpful links after content).
- **Descriptive headings and labels:** Headings and programmatic labels must be clear and descriptive. They do not need to be lengthy.
- **Focus indicator:** Any “user interface control” that receives focus from a keyboard user should indicate that focus on the currently selected element (e.g. add a visible border around a text link).
- **Website language:** Set the language for your website.
- **Language changes:** Indicate any language changes for an entire page or within the content.

### Predictability
- **No focus change:** Nothing changes merely because an item receives focus; a user must actively choose to activate an item (e.g. hit enter to submit) before a change takes place.
- **No input change:** Nothing changes just because the information is inputted into a field (e.g. form doesn’t auto-submit once all fields are filled out).
- **Consistent navigation:** Keep navigation layout consistent throughout all pages of the website (e.g. same links in the same order).
- **Consistent identification:** Components that have the same function within a website are identified consistently (but not necessarily identically) (e.g. two checkmarks can indicate two different things as long as their function is different — one indicates “approved” on one page but “included” on another).
- **Error identification:** Make any form errors easy to identify, understand, and correct.
- **Form labels and instructions:** Programmatically label all form or input fields so that a user knows what input and what format is expected.
- **Error suggestions:** If an input error is automatically detected, then suggestions for correcting the error should be provided.
- **Error prevention on important forms:** For pages that create legal commitments or financial transactions or any other important data submissions, one of the following is true: 1) submissions are reversible, 2) the user has an opportunity to correct errors, and 3) confirmation is available that allows an opportunity to review and correct before submission.
- **Parsing:** Make sure HTML code is clean and free of errors, particularly missing bracket closes. Also, make sure all HTML elements are properly nested.
- **Name, role, value:** For all user interface components (including forms, links, components generated by scripts), the name, role, and value should all be able to be programmatically determined; make sure components are compatible with assistive technology.

