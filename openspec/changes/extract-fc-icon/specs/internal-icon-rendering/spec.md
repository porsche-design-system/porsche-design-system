## ADDED Requirements

### Requirement: Components render internal icons without nested p-icon

PDS components that currently nest `p-icon` internally SHALL render their internal icons via `FCIcon`, eliminating the nested shadow root, custom-element upgrade, and separate lifecycle for each internal icon while preserving identical visual output.

#### Scenario: Consumer no longer nests p-icon

- **WHEN** a component such as `p-button`, `p-link`, `p-select`, `p-pagination`, or `multi-select` renders its internal icon
- **THEN** the icon is produced by `FCIcon` within the component's own shadow root
- **AND** no `p-icon` element appears in the component's rendered DOM
- **AND** the icon is visually identical to the previously nested `p-icon`

### Requirement: Fixed internal icons are inlined without a CDN fetch

For internal icons whose name is fixed at build time (e.g. `select` `arrow-head-down`, `select-option` `check`, `pagination` arrows, `input-search`/`input-email`/`input-tel`/`input-url`), the system SHALL render the icon using an inlined SVG data-URI mask, so no asynchronous CDN icon request is made for that icon.

#### Scenario: Fixed icon needs no network request

- **WHEN** a component renders a fixed internal icon via `FCIcon`
- **THEN** the icon glyph is drawn from an inlined SVG mask
- **AND** no CDN request is issued to fetch that icon

### Requirement: Configurable internal icons use a CDN mask

For internal icons whose name is provided by a consumer-facing prop and is not known at build time (e.g. `p-button` `icon`, `button-pure`, `link`, `link-pure`, `tag`, `segmented-control-item`), the system SHALL render the icon via `FCIcon` using a `mask: url(<CDN>)` referencing the icon library, without a nested shadow root or `p-icon` element.

#### Scenario: Configurable icon avoids nested shadow root

- **WHEN** a component renders a consumer-configurable icon via `FCIcon`
- **THEN** the icon is masked from the CDN icon URL
- **AND** no nested `p-icon` element or additional shadow root is created

#### Scenario: Custom source icon is supported

- **WHEN** a consumer supplies a custom icon source (e.g. `iconSource`)
- **THEN** `FCIcon` renders that custom SVG source with the same masking behavior as `p-icon`

### Requirement: Accessibility parity for internal icons

Internal icons rendered via `FCIcon` SHALL preserve the accessibility behavior of the components they belong to, including keeping decorative icons hidden from assistive technology and preserving the component's overall accessible name, role, and focus behavior.

#### Scenario: Decorative internal icon stays hidden

- **WHEN** a component renders a decorative internal icon via `FCIcon`
- **THEN** the icon is hidden from assistive technology
- **AND** the component's accessible name is unchanged from before the refactor

#### Scenario: Automated accessibility checks pass

- **WHEN** axe-core and accessibility-tree snapshot tests run against the refactored components
- **THEN** no new WCAG violations are introduced
- **AND** accessibility-tree changes are limited to the removal of the redundant nested icon element

