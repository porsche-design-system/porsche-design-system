# Grid
The grid is a fixed component in the digital Porsche layout. It provides a visual system consisting of a defined number of columns. It allows a responsive layout and, therefore, a homogeneous, balanced content placement across all Porsche web experiences and screen sizes.

## Grid architecture

- The Porsche UI grid uses **12 columns**, offering a high layout flexibility by
being dividable by 2, 3, 4 or 6. To enable a flexible adaption of content to any
screen size, its width is based on percentages (resulting from total screen
width minus gutter and margin width). For layouting on mobile (screen widths < 759 px), it is recommended to use
a 6-column-grid to avoid too much small-scaling or even „cluttering“.
- **The grid gutter** separates the columns horizontally by in-between-spacings.
The gutter is defined with fixed pixel sizes and breakpoints to balance size
ratios between elements on the respective screen size. 
- **The grid margins** define the outer spacings between the content area and the left and right screen
sides. Grid margins are defined using percentages, going from 7% to 10% for
screen widths larger than 1760 px. 

![Porsche UI grid architecture](assets/workshop/layout/grid/assets/grid-components.png)

### Overview 

|   | Viewport range | Columns | Gutter | Margin |
| -------- | -------- | -------- | -------- | -------- |
| **Mobile** | 320-759 px | 12 columns (Design only: 6 columns) |  16 px | 7% |
| **Tablet** | 760-1023 px | 12 columns |  24 px | 7% |
|  | 1024-1299 px | 12 columns | 36 px| 7% |
| **Desktop** | 1300-1759 px  |  12 columns | 36 px | 7% | 
|  | 1760 px or larger |  12 columns | 36 px | 10% | 

![Porsche UI grid architecture](assets/workshop/layout/grid/assets/grid-viewports.png)

## Grid Breakpoints 
Breakpoints are defined points at which the content is adapted to ensure an optimised layout on all screen sizes.
Within the layouts for Porsche web experiences, we use the following main breakpoints, derived from statistical data on browser size usage: 

- 760 px
- 1000 px 
- 1300 px
- 1760 px

### Breakpoint usage

It is highly recommended to stick to the defined breakpoints, especially for general elements like header or footer.

As for other components or modules, not every individual breakpoint has to be used. And also vice versa: if more breakpoints are needed for a specific component, you are free to add more. If you do so, please ensure that all additional breakpoints have a minimum difference of 100 px to the existing main breakpoints (in order to avoid "breakpoint overload").

Optimising for defined viewport sizes
Based on statistical use of specific devices, all Porsche web layouts should be optimised for the following viewport sizes: 

- 320 / 375 px
- 768 px
- 1024 px
- 1366 px
- 1920 px

The main breakpoints (see above) are deliberately chosen with some distance from the optimised device sizes due to a higher fault tolerance.

### Layout template 
To make layouting from scratch as easy as possible, the
optimized viewport sizes are provided as [Sketch artboard templates](http://ui.porsche.com/latest/porsche-ui-kit-layout-template.sketch). They
come with final layout settings (including the responsive grid) that can be turned visible via: View → Canvas →
Show Layout.

### Viewport range
To provide consistency throughout all Porsche web experiences, all layouts should be optimised for a viewport range from **320 px** to a maximum of **1920 px**. For viewport sizes from 1920 px onwards, a growing white space outside the left and right edge should be used.

![Porsche UI grid architecture](assets/workshop/layout/grid/assets/grid-maxwidth.png)

## Tips for responsive layouting

### Use the grid purposefully.
All content elements that should behave responsively should be placed horizontally within the grid, always starting in a column. The spacing between content elements is therefore defined by the grid gutter. 
In most cases, this should refer to modules or content boxes, while smaller spaces on a more or less "micro-level" (both vertical and horizontal) should be defined by using the [Spacing]() component.

![Porsche UI grid alignment](assets/workshop/layout/grid/assets/grid-alignment.png)
### Know the possibilities. But use them wisely.
When it comes to designing a component or module responsively, there are several screws that can be turned to adapt to different screen sizes, such as changing…

- … the component’s grid column width and, therefore, its wrapping behaviour. Example: A 3-column text on desktop, each column using 4 grid columns, can be stacked on mobile using 12 grid columns.
- … text sizes – commonly using smaller text on mobile, larger text on bigger screens.
- … the general layout of the component by using different patterns on mobile and desktop. Example: Turning a multi-column teaser module on desktop into an accordion on mobile.

In designing for responsive layout, always aim to find the solution that works best for the specific case, keeping the user and the specific context of use in mind.

![Porsche UI grid behaviour](assets/workshop/layout/grid/assets/grid-behaviour.png)

### Don’t be afraid to think outside of the box.
It is possible to place elements end to end, spanning from left to the right edge of the screen. For example, a full-width image that generates a more emotional and concise side entry. However, this should be a well-contemplated exception.

Also, for image groups, it is possible to break out of the grid in order to create a stronger visual coherence. The outer edges (left and right) of the image group should always be placed within the grid, whereas the edges between the single images can be placed exactly in the middle of the gutter.

![End-to-end placement](assets/workshop/layout/grid/assets/grid-endtoend.png)
