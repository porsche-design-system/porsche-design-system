# Pagination

The pagination component is used whenever a content (text, images, videos) is split into several pages. It provides information on the existing amount of pages, shows the current page position and allows the user to navigate between the single content pages. The pagination is the component of choice primarily for listed content (e.g. search results, archives etc.), where the user wants to find a specific item.

---

## Available sizes

The pagination comes in 2 different sizes. In both cases (for less than 5 or 7 pages) the items will be reduced accordingly and centered.


- **5 page links** Recommended to be used for device widths equal or smaller than 479 px.
    
    ![Example for displaying 5 pages](./assets/pagination-mobile-5items.png) 

- **7 page links**
    Recommended to be used for device widths equal or larger than 480 px.
    
    ![Example for displaying 7 pages](./assets/pagination-desktop-7items.png) 

### Displaying 6 pages or 8 pages or more

If there are at least 6 or 8 pages, an ellipsis ("...") is shown for a dedicated range of pages that are located inbetween the visible pagination numbers. The ellipsis is not clickable.

![Example for displaying 8 pages or more](./assets/pagination-desktop-plus8.png)

---

## Styling

The pagination component includes the following sub-components:

### Arrow left & right
An arrow is placed on the left and right of the page numbers, enabling to click

### Page numbers
The page numbers are set in copysize and turn in Brand color on hover.

### Ellipsis (optional)
The ellipsis ("...") represents multiple pages that can't be displayed to limited Pagination component width.

---

## Positioning and spacing

The pagination should always be placed centered beneath the related content, keeping a minimum top spacing of 32px.

---

## Interaction

### Clickability

Each pagination item (arrows and numbers) spans over a clickable area of 40 x 40 px to guarantee a proper click- and touch-ability (on mobile devices).

### Disabled arrows

Whenever the user reaches the first or last page, the respective arrow will be disabled.

### Skipping pages

The arrows allow to skip to the previous or next page and therefore interactive by default. When reaching the first or last content page, neither the left nor right arrow are disabled.

### Current page

The current page position is always marked by a red underline. By default, the current page item is not clickable.


---

