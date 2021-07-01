# Accordion

## When to use

• If you want to show additional information that isn't curial for the user to proceed their journey.
• To shorten pages and reduce scrolling when content is not crucial to read in full.
• When the available space is limited and long content can't be displayed all at once (for example on mobile devices or inside sidebars).
• To organize various information in one place.
 

---

## Types

To ensure a seamless UX in all Porsche web applications it is recommended to use the accordion as follows:

| Type | Usage |
|----|----|
| Basic | Use a default accordion item for simple content that doesn't require a complex interaction. |
| Extended | Only if content requires wide view to preserve content the best way. |



| Variant | Usage |
|----|----|
| Default | To cluster a greater amount of links or short information  in one place


## Behavior

### Header
Contains the section title and controls the revealing/hiding of the accordion panel.
The headline stays the same and does not change according to the state of the panel. 
No links, additional icons or any styling is allowed in the header.

### Icon
The caret icon indicates the state of the panel.
Facing downwards indicates the collapsed state. Facing upwards indicates the expanded state.

### States
By default the component is closed and is controlled by the user.
If necessary only one panel can be open by default.

### Content Type
Content within an Accordion is short and easy to perceive with less interaction options.
An accordion can contain copies, links, images which could be structured with the grid.
All content should be rather additional information than crucial for the user journey or the goals to achieve.
We advise to against placing widget and complex interaction tests within an accordion


## Usage

### Control
We recommend to leave total control to the user. Leave the ability to open more panels at once to maybe compare content.
Carefully consider when you want to bring in over arching open/close functionality.
Closing panels on opening a different one can disruptive the user.

### Scroll
If the accordion content is longer than the viewport the whole accordion should scroll vertically.
Content should not scroll inside an individual panel.
Content should never scroll horizontally in an accordion.

### Effect on other content 
By opening a panel the other panels below should be pushed by the new height of the extended panel.
Further all content below needs to be pushed by the same amount to avoid overlapping elements and visual irritation.

### Line length
We recommend using no more than 80 characters or glyphs per line.
This might differ a bit depending on the respective line height and viewport size and results in different pixel widths depending on the Porsche type class in use.
Please find more information in the [Typography guideline](components/typography).

### Size
We do recommend using the component up to a maximum width of approximately 800px. 
By this we ensure that the headline and the icon are perceived as visual group (Law of proximity).
This also ensures the readability of copy and avoids too many characters (approx. 80 characters) per line.

The height of an extended panel results of the content within.


---

## Do’s & Don’ts

### Don't use more than three buttons
There should be no more than three actions. Actions should always be located within an action bar at the bottom of the Modal. Button order and positioning should follow our guidelines for [Buttons](components/button/usage).
```
![Usage Buttons](./assets/modal-dialog-more-than-three-buttons.png)
```
### Stacking Modals
Modals shouldn’t launch other modals. Stacking Modals makes it hard to dismiss them and confuses the user on their levels of importance.
```
![Stacking modals](./assets/modal-stacking-modals.png)
```