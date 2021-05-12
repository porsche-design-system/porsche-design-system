# Data Table

## When to use

- To display  and compare a collection of structured data in rows and columns.
- For advanced features like edit, filtering, pagination etc. see Extended Data Table / **TBD!**

---

## Variants

| Variant | Usage |

|----|----|

| Short | XY |

| Tall | XY |

## Behavior

### Column header

Column headers should be relevant to the data it represents and succinct. Best practice is to use one or two keywords for the column header, whenever possible, and avoid the necessity to wrap the column header text to fit the table layout.

### Fixed header

The Data Table can scroll to view additional rows of the data grid that do not automatically fit within the vertical constraints of the viewport height. Note that the column headers are ‘sticky’ and persist in the display above the vertically scrolling rows.

### Cell data **TBD!**

The Data Table is flexible allowing for the display of a range of data and or content types pulled from the data source(s) to support the specific requirements of the application use cases. Supported cell data include:

Text
Numeric
Icons
Badges
Images
Buttons
Links

### Custom column widths

XY ... Maybe 96 px min **TBD!**

### Sort

The sort function is activated for all columns of the table when clicked and only one column can be sorted at a time. When the sort is applied to a selected column, the rows of the table are updated to be displayed in increasing order for the type of value displayed in that column (e.g. alphabetical, numerical, date, size, etc.). Selecting the sorted column heading a second time will change the sort order to decreasing. The selection of an alternative column for sorting then replaces the previous column sort order

### Responsive

The table size is fixed and the table can scroll in horizontally to view all columns.