# Content Wrapper

**The Content Wrapper enables you to …**

- … define outer spacings between content area and left/right screen side.
- … center the content area within the screen.
- … set a maximum width for the content area.

<p-inline-notification heading="Deprecation hint" state="error" dismiss-button="false">
This component is deprecated and will be removed with the next major release. 
In general, please use native <a href="https://css-tricks.com/snippets/css/complete-guide-grid">CSS Grid</a> instead for better performance and more standardized layout technique.
Additionally, we provide a <a href="styles/grid"><b>Porsche Grid</b></a> utility instead based on CSS Grid covering the specific layout needs for a harmonic appearance across all digital touch-points.
</p-inline-notification>

<TableOfContents></TableOfContents>

## Types

Depending on your layout requirements you can choose between the following options for the content area, whereas each of
them can be applied module-based to give you a maximum of flexibility for your page layouts:

### Basic

Depending on the screen width the "Basic" variant **includes a margin of 7% or 10% between content area and the left and
right screen sides** (100% = full screen width):

| **Viewport**               | **Margin** |
| -------------------------- | ---------- |
| **XS-L (320-1759 px)**     | 7%         |
| **XL (1760 px or larger)** | 10%        |

### Extended (default)

The "Extended" content area includes no defined margin on the left and right of the content and has a maximum width of
1920 px. Thus, in viewport sizes from 1920 px onwards there is a growing white space outside the left and right edge of
the content area.

### Fluid

This is the variant of your choice when you want your content to span to the full screen width, containing no margin or
visual gap between content area and screen edges.

### Layout combination of content width variants

![Content Wrapper with Fluid safe zone](./assets/content-wrapper-width-variants.png)

## Layout approach or: How to combine Content Wrapper with Grid, Flex or …

**The Content Wrapper can house both the Grid and Flex or any custom content.** The principle of how to apply the
Content Wrapper component is quite simple – just think "from big to small" when defining the module layouts:

1. First of all, you define the **Content Wrapper** type for your layout part based on the content width variants
   described above.
2. **The content area of each layout part** can then itself be designed by using Grid and/or Flex or any custom way of
   content layouting, depending on the individual requirements of the module.

## Related components

- [Grid](components/grid)
- [Flex](components/flex)
