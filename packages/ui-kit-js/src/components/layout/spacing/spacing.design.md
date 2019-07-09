# Spacing

We use defined spacings to seperate components elements within a layout. Using the same defined spacing system provides a consistent and familiar user experience across all pages. For layouts the spacing should be used in combination with the [responsive grid](#/components/layout/grid).

## 8 px spacing system - the Porsche formula
We use a 8 px square grid system across all viewports to define dimensions, padding and margin of block and inline elements. The grid unit of 8 px refers to
the general base size of 16 px (= 1 em), that is also applied in typography and other component sizes.

![The Porsche spacing formula](./assets/spacings-formula.png)


## Applying the 8 px system

- **Margins and paddings** are applied based on multiples of 8 px. Boxed UI elements are sized either by adapting to the fixed value or to the [fluid column widths](#/components/layout/grid).
- **Typography as an exception** works with a baseline unit of 4 px for larger flexibility while ensuring the overall consistent rhythm.

## Fixed and flexible spacings

The Porsche UI Kit provides both fixed and flexible spacing. The two systems are built on the same definitions to complement the overall consistency but serve different roles. Additional increments can be added for specific needs as long as the 8 px spacing system is followed.

### Fixed spacing 
Spacings that do not need to change across different screen sizes.

|       	                                |                	| PX     	| REM 	|
|----------------------------------------	|---------------	|-------	|------	|
| ![spacing 4](./assets/spacing-4.png)    | **spacing-4**  	| 4 px  	| 0.25 	|  
| ![spacing 8](./assets/spacing-8.png)    | **spacing-8**  	| 8 px  	| 0.5  	| 
| ![spacing 16](./assets/spacing-16.png)  | **spacing-16** 	| 16 px 	| 1    	| 
| ![spacing 24](./assets/spacing-24.png)  |**spacing-24** 	| 24 px 	| 1.5  	| 
| ![spacing 32](./assets/spacing-32.png)  |**spacing-32** 	| 32 px 	| 2    	| 
| ![spacing 40](./assets/spacing-40.png)  |**spacing-40** 	| 40 px 	| 2.5  	| 
| ![spacing 48](./assets/spacing-48.png)  |**spacing-48** 	| 48 px 	| 3    	| 
| ![spacing 56](./assets/spacing-56.png)  |**spacing-56** 	| 56 px 	| 3.5  	| 
| ![spacing 64](./assets/spacing-64.png)  |**spacing-64** 	| 64 px 	| 4    	| 
| ![spacing 72](./assets/spacing-72.png)  |**spacing-72** 	| 72 px 	| 4.5  	| 
| ![spacing 80](./assets/spacing-80.png)  |**spacing-80** 	| 80 px 	| 5    	| 

### Flexible spacing 
Spacings that change in accordance with the screen size at defined breakpoint widths.

|               | 320 - 759 px (XS)| 760 - 999 px (S) | 1000 - 1299 px (M) | 1300 - 1759 px (L) | 1760  px or larger (XL) |
| ------------- | ---------------- | ---------------- | ------------------ | ------------------ | ----------------------- |
| **spacing-a** | 4 px             | 8 px             | 12 px              | 16 px              | 20 px                   |
| **spacing-b** | 8 px             | 16 px            | 24 px              | 32 px              | 40 px                   |
| **spacing-c** | 16 px            | 24 px            | 32 px              | 40 px              | 48 px                   |
| **spacing-d** | 24 px            | 32 px            | 40 px              | 48 px              | 56 px                   |
| **spacing-e** | 32 px            | 40 px            | 48 px              | 56 px              | 64 px                   |
| **spacing-f** | 40 px            | 48 px            | 56 px              | 64 px              | 72 px                   |
| **spacing-g** | 48 px            | 56 px            | 64 px              | 72 px              | 80 px                   |

![The Porsche spacing formula](./assets/spacings-example-02.png)
Example: Mixed use of fixed, flexible and custom spacings.

## Working with space 

Spacing is a powerful design element, an integral part of every layout, which can create relationships, hierarchy, and rhythm between components.

### Relationships

The space between components can determine if the elements
seem to have a meaningful connection. Closely placed elements relate to each
other. If more space is added between components, the relationship weakens. Using a consistent spacing pattern across elements can also create a quickly
intelligible relationship.

### Hierarchy

Leaving different spaces between elements or sections of
information will influence the reader to perceive them as having a different
relevance. Elements that have more space around them tend to be perceived as being
further up in the hierarchy. Creating hierarchy on the page guides viewers' eyes and helps
separate and organise elements in the design and guide users' attention to
certain elements.

### White space (also: negative space)

The empty space (also referred to as negative space) in a
design. Although called white space, the blank space can be filled with any colour
as long as it’s free of elements like text, graphics or images, creating a
well-spaced and clear product. White space helps deliver a good experience by
giving elements space to breathe and letting the reader’s eye relax.

## Usage in Sketch

### Define the grid
The Porsche UI Kit works with 8px
increments, but it allows 4px values in a few cases, where greater flexibility is
needed. We recommend setting up the workspace with a 4px grid system. You can
change the Sketch grid settings via: View → Canvas → Grid Settings → Grid Block
Size: 4 px. Or, when setting up a totally new UI design file, feel free to use
the [Porsche UI Kit layout template](http://ui.porsche.com/latest/porsche-ui-kit-layout-template.sketch) with predefined settings.

### Snap to grid
Most design apps have the option to snap elements to the grid.
Using this feature will help position elements faster in the layout.

### Nudging
To make the UI design workflow as smooth as possible, it is helpful to adjust
the nudging (= increments an element moves when using keyboard arrows) to the
grid steps in use. We recommend the following settings, reachable via Sketch
settings → Canvas.

- Move objects **1 px** using Arrow keys. 
- Move objects **8 px** using Shift-Arrow keys.

## Design tools vs. web browser

### Translating Sketch spacings into variables 

When it comes to design-to-dev-handover, we should always keep in mind that the handling of
spacings is different: Whereas the designer sets the spacings manually in Sketch
layouts, the developer implements them by using pre-defined spacing variables
(e.g. spacing-8 or spacing-16). Therefore, we should always make sure that the
spacings in sketch are set as correctly as possible and that they the developer
can easily read them in Abstract's inspect mode - of course, a personal
conversation between designer and developer is always the best way to get
optimal results. Last but not least a one-on-one is indispensable when it comes
to spacings, as the developer might not know when to use a fixed or flexible
spacing class (e.g. 8 px on mobile might as well be spacing-8 or spacing-b).

![Abstract inspect view of spacing](./assets/spacings-inspect.png)

### Borders
While in Sketch the border doesn't add to the shape size, browsers
consider borders as solid space around elements by default. We recommend to
ignore this fact while designing and to always set the focus on giving the developer
the right spacing sizes between or inside elements, even if this results in
slightly higher elements in implementation due to the additional border.

![Handling borders in Sketch](./assets/spacings-borders.png)

### Lines
Lines can be created using either a narrow rectangle or a path
with a stroke. ::For better readability of the space between elements, we
recommend using paths with a stroke.::

### Text boxes
Developers measure the spacing of typography from the bounding box
of the text element. When working with typography, the bounding box should be
placed within the grid parameters, even if the baseline of the typography is not
on the grid line. ::MEMO: It's best to always create texts using the text tool, not as a
box::

![Text box placement](./assets/spacings-bounding-box.png)

### How to handle uneven image heights
It is no rocket science setting the correct 8 px spacing values when the element
heights correspond to the 4 px grid themselves. But there is an exception, where
element heights don’t fit in perfectly: Images. They can be displayed in many
different aspect ratios (such as 16:9 or 4:3) and follow various rules for
handling responsiveness (like cropping or resizing). Depending on their width
and the screen size, their height will most likely not fit in the 4 px grid. To
follow a consistent rule, we recommend to always place the upper part (X/Y
value) on the grid system, even if the bottom part doesn’t fit. The following
element underneath should then be placed on the grid line again. As for the
implementation of the spacing, the developer should use the spacing variable
with the value closest to it. For example, the following design case might lead
to an implemented spacing value of 16 px, as this the spacing variable the most
close to 18 px.

![Image placement](./assets/spacing-images.png)