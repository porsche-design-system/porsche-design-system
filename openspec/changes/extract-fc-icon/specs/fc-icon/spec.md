## ADDED Requirements

### Requirement: FCIcon renders an icon without its own shadow root

The system SHALL provide a Stencil functional component `FCIcon` that renders icon markup directly into the consuming component's shadow root, without instantiating a nested `p-icon` custom element or an additional shadow root.

#### Scenario: Consumer renders an icon via FCIcon

- **WHEN** a PDS component renders `FCIcon` in its `render()` output
- **THEN** the resulting DOM contains the icon markup within the consumer's own shadow root
- **AND** no nested `p-icon` element and no additional shadow root are created for that icon

### Requirement: FCIcon is the single source of icon markup

The system SHALL implement the `p-icon` web component by delegating its rendering to `FCIcon`, so that standalone `p-icon` and internally-rendered icons share one markup/styling implementation.

#### Scenario: p-icon delegates to FCIcon

- **WHEN** `p-icon` renders
- **THEN** it produces its icon markup through `FCIcon`
- **AND** the public `p-icon` API (tag name, `name`, `source`, `color`, `size`, `aria` props, `--p-icon-size`/`--p-icon-color` CSS variables) remains unchanged

### Requirement: FCIcon supports decorative and meaningful icons

`FCIcon` SHALL render a decorative icon (hidden from assistive technology) when no accessible label is provided, and a meaningful icon (exposed with an accessible name) when an accessible label is provided.

#### Scenario: Decorative icon

- **WHEN** `FCIcon` is rendered without an accessible label
- **THEN** the icon is hidden from assistive technology (e.g. `aria-hidden="true"`)
- **AND** it is not required to render an `<img>` with `alt` text

#### Scenario: Meaningful icon

- **WHEN** `FCIcon` is rendered with an accessible label
- **THEN** the icon exposes that label as its accessible name (e.g. via an `<img>` with matching `alt`)

### Requirement: FCIcon styling is centralized

The system SHALL centralize icon styling in a shared `getFCIconStyles()` JSS helper covering responsive `size` (via the `ex`-unit font-size mechanism), `color` including `inherit` and `--p-icon-color`, `--p-icon-size`, RTL flipping for flippable icons, and High Contrast Mode (`forced-colors: active`) rendering, so consumers do not re-implement or copy icon styling.

#### Scenario: Consumer reuses centralized styling

- **WHEN** a consumer needs icon styling
- **THEN** it obtains the styling from `getFCIconStyles()` rather than copying icon CSS values
- **AND** responsive size, color, RTL flipping, and forced-colors behavior match the standalone `p-icon`

#### Scenario: Icon remains visible in High Contrast Mode

- **WHEN** an `FCIcon` is rendered under `@media (forced-colors: active)`
- **THEN** the icon glyph remains visible using system colors, matching `p-icon` behavior

