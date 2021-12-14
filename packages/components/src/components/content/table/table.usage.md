# Table

<TableOfContents></TableOfContents>

## When to use

- Use table to display and compare a collection of structured data in rows and columns.
- Use table as a tool to query, consume, and navigate to specific data.
- Use table if there are at least two or more columns of data parameters.

---

## Behavior

### Column header

Column headers should be relevant to the data it represents and succinct. 
Best practice is to use one or two keywords for the column header, whenever possible, and avoid the necessity to wrap the column header text to fit the table layout.

### Cell data

The table is flexible allowing for the display of rich content to support the specific requirements of the application use cases.

### Sort

If sorting is enabled columns can be sorted in ascending or descending order. 
The order direction will be displayed with an according arrow icon.  

### Responsive

The table stretches to the full available width and becomes horizontally scrollable if necessary.

### Table caption

A caption describing the contents of the table for accessibility only. 
This won't be visible in the browser. 
Use an element with an attribute of `slot="name"` for a visible caption.
