# Grid

## Introduction

The Porsche UI Kit grid system is based upon a standard 12 column responsive grid. Its main purpose is to provide a solid and flexible grid system for defining layout areas and page structures. It is not ment to function as a toolkit for layouting content blocks or components. Therefore the [Flex](#/layout/flex) component is the right choice.

### Grid standard

For standard grid implementation, it is recommended to use this pattern. The class `grid` on the parent and `grid__child` on the children are mandatory. With `grid__child--size-(1-12)` it is possible to define column widths.

**Possible class names on the grid parent container (where {p} is the prefix and {bp} the breakpoint value):**
* `{p}-grid--direction-{direction}-{bp}` => direction of columns
* `{p}-grid--gap-{gap}-{bp}` => use of gaps between columns
* `{p}-grid__child--size-{size}-{bp}` => size based on amount of columns
* `{p}-grid__child--size-{offset}-{bp}` => offset based on amount of columns