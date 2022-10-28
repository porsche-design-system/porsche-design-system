# Link Tile

<TableOfContents></TableOfContents>

## When to use

- Use link-tiles to display a prominent link with image as a stand-alone element or in a group.

---

## Types

| Type    | Usage                                                                             |
| ------- | --------------------------------------------------------------------------------- |
| Basic   | for prominent links (performs best in perception tests)                           |
| Compact | improved spacing for more link-tiles in a group (alternative for basic on mobile) |

| Variant      | Usage                                                                             |
| ------------ | --------------------------------------------------------------------------------- |
| Gradient     | when the image does not provide enough contrast for description + label           |
| Size (Font)  | to create a visual hierarchy among other link-tiles and elements                  |
| Aspect Ratio | changes dimensions to landscape, portrait or square formats according to use case |

### Description

A link-tile provides a description to let the user know what to expect. The description should be short (around 80
characters or fewer) for fast perception.

**Note:** in some cases, e.g. manual font scaling via browser settings or too long description can cause overflowing
content. This should be avoided by e.g. using different aspect-ratios for mobile and desktop.

### UX Writing

| Type    | Usage                                                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Basic   | Create curiosity and desire for the described product in the description. The label should be held short, descriptive and technical. |
| Compact | Work with an engaging verb and the name of your product or service.                                                                  |

### Image

The used image should refer to the topic of the link-tile. Select an image with the focus in the center or slightly
above since the component places the image centered in the desired aspect ratio and masks the picture.

Further, the image must provide adequate contrast for the description and label. Avoid adding any manipulation to the
image. The goal is to display the image as naturally as possible.

### Image Processing

The component does not do any adjustments to the image. The assets need to be created upfront.

### Aspect Ratio

Select an aspect ratio appropriate to your use case. For a set of link-tiles use 1:1, 4:3, 3:4, or 16:9. A set of two
tiles in a row work with 3:4. A single, large link-tile should use 4:3 or 16:9. Be aware that 16:9 and 9:16 can cause
issues due to the extreme format. May switch aspect ratios on different viewports.

### Responsive

The image, type (compact) and font size can be breakpoint customizable. Keep in mind that the topic and link destination
should stay the same. The padding adjusts based on the viewport. Within one viewport there is only one consistent
padding for all link-tiles.
