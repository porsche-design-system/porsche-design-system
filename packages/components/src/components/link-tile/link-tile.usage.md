# Link Tile

<TableOfContents></TableOfContents>

## When to use

- Use link tiles to display a prominent link as a stand-alone element or in a group with other link tiles.

---

## Types

| Type                | Usage                                                                                |
| ------------------- | ------------------------------------------------------------------------------------ |
| Basic               | for prominent links (performs best in perception tests)                              |
| Compact             | improved spacing for more link tiles in a groupe (alternative for basic on mobile)   |


| Variant             | Usage                                                                                |
| ------------------- | ------------------------------------------------------------------------------------ |
| Gradient            | when the image does not provide enough contrast for description + label              |
| Size (Font)         | to create a visual hierarchy among other link tiles and elements                     |
| Aspect Ratio        | changes dimensions to landscape, portrait or square formats according to use case    |


### Description
A link tile provides a description to let the user know what to expect. The description should be short (around 80 characters or less) for fast perception.

### UX Writing
| Basic | Create curiosity and desire for the described product in the description. The label should be held descriptive and technical. |
| Compact | Work with an engaging verb and the name of your product or service. |

### Image
The background images should refer to the topic of the linking tile. Select images with the focus in the center or slightly above since the component places the image centered and scales to the desired aspect ratio. Further, the image should provide adequate contrast for the description and label. Avoid adding any manipulation to the image, rather invest time in looking for the right asset. The goal is to display the image as naturally as possible.

### Image Processing
The component does not do any adjustments to the image. The assets need to be created upfront.

### Aspect Ratio
Select an aspect ratio appropriate to your use case. For a set of link tiles use 1:1, 4:3, 3:4, and 16:9. A set of two tiles in a row works with 3:4. A single, large link tile should use 4:3 or 16:9. Be aware that 16:9 and 9:16 can cause issues due to the extreme format. May switch aspect ratios for one link tile on different viewports.

### Responsive
The background image, and style of the link tile, font size can be breakpoint customizable. Keep in mind that the topic and link destination should stay the same. The padding adjusts based on the viewport. Within one viewport there is only one consistent padding for all link tiles allowed.

## Accessibility

### Overflow hidden
The description must be readable in every state for accessibility. Therefore the component is set to overflow hidden. Note that in some cases, e.g. manual font scaling via browser settings or too long description can cause overlapping.