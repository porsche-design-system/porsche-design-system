# Table

## When to use

- Use data table to display and compare a collection of structured data in rows and columns.
- Use data table as a tool to query, consume, and navigate to specific data.
- Use data table if there at least 2 columns or more of data parameters.

---

## Variants

|Variant |Usage |
|----|----|
| Default | The default data table comes with a base style with only the title, header, and table elements. rows.|

---

## Behavior

### Column header

Column headers should be relevant to the data it represents and succinct. Best practice is to use one or two keywords for the column header, whenever possible, and avoid the necessity to wrap the column header text to fit the table layout.

### Fixed header

The Data Table can scroll to view additional rows of the data grid that do not automatically fit within the vertical constraints of the viewport height. Note that the column headers are ‘sticky’ and persist in the display above the vertically scrolling rows.

### Cell data

The Data Table is flexible allowing for the display of a range of data and or content types pulled from the data source(s) to support the specific requirements of the application use cases. Supported cell data include:

Text
Numeric
Icons
Badges
Images
Buttons
Links

### Sort

If sort is enabled columns can be sorted in ascending or descending order. The order direction will be displayed with a accoring arrow icon.  

### Responsive

The data table size is fixed and the table can scroll in horizontally to view all columns.

### Table caption

A caption describing the contents of the data table for accessibility only. This won't be visible in the browser. Use an element with an attribute of slot='name' for a visible caption.