# Accordion
 
## When to use
 
- When you want to show additional information that isn't crucial for the user to proceed his journey.
- To shorten pages and reduce scrolling.
- When space is at a rar and long content can't be displayed all at once (for example mobile or sidebars).
- To organize various information in one place.
- Amount of accordion items are more than two
 
---
 
## Types
 
To ensure a seamless UX in all Porsche web applications it is recommended to use the accordion as follows
 
| Type | Usage |
|----|----|
| Basic | Use in casual occasions with a uni color background. |
| Medium | Use whenever there is the need to highlight the accordion. |
| Slotted | Only use when it is necessary to render the heading (different languages). |
 
| Variant | Usage |
|----|----|
| Basic | Use when to display copy, images, links. |
| Compact | Use to gather several links in different accordion items. |
 
 
## Behavior
 
### Header

The headline stays the same and does not change for collapsed or expanded stat of the accordion item. No customization of the header like links, additional icons or any styling is allowed. It is recommended to keep the header short & descriptive.
 
### Content Type
Content within a Accordion should be short and easy to perceive with less interaction options. An accordion can contain copies, links, images. Elements should be arranged with the grid component. All content should be additional information that isn't crucial for the user journey or the goals to achieve. We do not recommend to place widgets or complex interaction tasks within an accordion.
 
### Width & Height
To ensure that the headline and the icon are perceived as a visual group (Law of proximity), we recommend not stretching the component over the entire viewport. To ensure a good  readability of copy please use not more than approx. 80 characters per line. Please find more information in the [Typography guideline](components/typography).
The height of an accordion results from the content within the component.
  

## Usage
 
### Default State
If necessary only one accordion item can be expanded by default. By default the component is collapsed and is controlled by the user.
 
### Control
We recommend to leave the control to the user, to open more items at once to maybe compare content. Carefully consider when you want to bring in functionality affecting more accordion items. Collapsing one or more items on expanding a different one can disrupt the user.
 
### Scrolling
When the accordion content is longer than the viewport the whole accordion should vertically scroll. Content should not scrollable within an individual item also no horizontal scrolling in an accordion recommend!
 
### Effect on other content
By opening an accordion item the other accordion items below shout be pushed by the height of the expanded item. Further all content below needs to be pushed by the same amount to avoid overlapping elements and visual irritation.