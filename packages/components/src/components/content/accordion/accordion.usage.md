# Accordion

<TableOfContents></TableOfContents> 

## When to use
 
- When you want to show additional information that isn't crucial for the user to proceed their journey.
- To shorten pages and reduce scrolling.
- When space is at a rare and long content can't be displayed all at once (for example mobile or sidebars).
- To organize various information in one place.
- Amount of accordions is more than two.
 
---
 
## Properties
 
To ensure a seamless UX in all Porsche web applications it is recommended to use the accordion as follows:
 
| Size | Usage |
|----|----|
| Small (default) | Use in casual occasions with a uni color background. |
| Medium | Use whenever there is the need to highlight the accordion. |

| Heading | Usage |
|----|----|
| Slotted | Only use when it is necessary to render the heading dynamically e.g. in different languages. |
 
| Compact | Usage |
|----|----|
| false (default) | Use when to display copy, images, links. |
| true | Use to group several links in different accordions. |
 
 
## Behavior
 
### Heading

The heading stays the same and does not change for collapsed or expanded state of the accordion. Customization of the heading like links, 
additional icons or any styling is **not** allowed. It is recommended to keep the heading short & descriptive.
 
### Content Type
Content within an accordion should be short and easy to perceive with less interaction options. An accordion can contain copies, links, images.
Elements should be arranged with the `p-grid` component. All content should be additional information that isn't crucial for the user journey, or 
the goals to achieve. We do not recommend to place widgets or complex interaction tasks within an accordion.
 
### Width & Height
To ensure that the heading, and the icon are perceived as a visual group (Law of proximity), we recommend not stretching the component over the 
entire viewport. To ensure a good readability of copy please use not more than approximately 80 characters per line. Please find more information in 
the [Typography guideline](components/typography). The height of an accordion results from the content within the component.


## Usage
 
### Open State
By default, the component is collapsed and should be opened when the user clicks on the accordion. If necessary, only one accordion can be rendered open.
 
### Control
We recommend leaving the control to the user to open more accordions at once e.g. to compare content. Carefully consider when you want 
to bring in functionality that affects multiple accordions. Collapsing one or more accordions while expanding a different one could disrupt the user.
 
### Scrolling
When the accordion content is longer than the viewport the whole page should scroll vertically. Content should not be scrollable within
an individual accordion, neither vertically nor horizontally!