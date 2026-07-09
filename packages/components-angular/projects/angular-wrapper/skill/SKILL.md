---
name: porsche-design-system-docs
description: Build, style, review, or upgrade web user interfaces with the Porsche Design System (PDS), or author and review documents that specify PDS behavior. Use whenever a task touches frontend UI — adding or changing components (buttons, forms, inputs, cards, tables, modals, navigation, layouts), styling with Tailwind, SCSS, vanilla-extract or Emotion, applying design tokens, wiring partials (fonts, icons, meta tags, loader), scaffolding a new page or form, or migrating and upgrading PDS. Also use whenever a requirement, spec, design doc, or acceptance criteria names a PDS component, prop, token, theming, or partial. Prefer PDS for new UI even when it is not named by the user. Do not activate for backend or non-UI logic, unrelated tests or tooling, documentation or prose that does not assert PDS component, prop, token, theming, or partial behavior, work that clearly targets a different UI library, or when the user opts out of PDS.
---

# Porsche Design System (`angular`)

Version-exact knowledge of the installed Porsche Design System. Open the reference below that matches the task, then apply the core rules.

## Getting started

Install `@porsche-design-system/components-angular`, add `PorscheDesignSystemModule` to your component/module `imports`, and import the global stylesheet:

```ts
// app.ts
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'app-root',
  imports: [PorscheDesignSystemModule],
  templateUrl: './app.html',
})
export class App {}
```

```css
/* styles.css — one import for all global styles, plus a FOUC guard */
@import '@porsche-design-system/components-angular/index.css';

:not(:defined) { visibility: hidden; }
```

Writing components:
- Use the **custom-element tags** directly in templates: `<p-button>`, `<p-input-text>`.
- Bind props with `[prop]` and camelCase names (`[open]="open"`, `[disableBackdropClick]="true"`).
- Listen to events with `(event)` — the `dismiss` event is `(dismiss)="onDismiss()"`.
- Place a child into a named slot with the `slot="..."` attribute.

## Components

The Porsche Design System ships 58 components. Open a component's reference for its props, slots, events, CSS variables and examples before using it.

Sub-components (e.g. `p-table-row`, `p-select-option`, `p-tabs-item`) have no separate row — they are only valid inside a parent, so their API is documented under a "Sub-components" section in that parent's reference.

| Component | Summary | Reference |
| --- | --- | --- |
| `p-accordion` | The `p-accordion` is a component that reveals or hides associated sections of content. | [p-accordion.md](references/components/p-accordion/p-accordion.md) |
| `p-ai-tag` | `p-ai-tag` is used to indicate AI-generated or AI-modified content. | [p-ai-tag.md](references/components/p-ai-tag/p-ai-tag.md) |
| `p-banner` | The `p-banner` component provides action-based feedback messages (e.g. after performing a task) or to convey informational and/or critical notification like some site related topics. | [p-banner.md](references/components/p-banner/p-banner.md) |
| `p-button` | The `p-button` component is essential for performing form or **interaction** events. | [p-button.md](references/components/p-button/p-button.md) |
| `p-button-pure` | The `p-button-pure` component is essential to perform events for **interactions**. | [p-button-pure.md](references/components/p-button-pure/p-button-pure.md) |
| `p-button-tile` | The `p-button-tile` is an interactive component that displays a provided image to tease content and performs form or **interaction** events within one container. | [p-button-tile.md](references/components/p-button-tile/p-button-tile.md) |
| `p-canvas` _(experimental)_ | The `p-canvas` is an experimental layout component for productive web applications. | [p-canvas.md](references/components/p-canvas/p-canvas.md) |
| `p-carousel` | The `p-carousel` component allows related or similar content to be consumed on a step by step basis with a better overview than just showing them in a grid or as a list. | [p-carousel.md](references/components/p-carousel/p-carousel.md) |
| `p-checkbox` | The `p-checkbox` component wraps the native HTML input type `checkbox` form element. | [p-checkbox.md](references/components/p-checkbox/p-checkbox.md) |
| `p-crest` | The `p-crest` gives the Porsche brand a distinctive look, sets it apart from others within the overall external image and represents the quality of the product. | [p-crest.md](references/components/p-crest/p-crest.md) |
| `p-display` _(deprecated)_ | `p-display` is used to highlight and specify heading styling and hierarchy in documents. | [p-display.md](references/components/p-display/p-display.md) |
| `p-divider` | The `p-divider` is used as 'horizontal or vertical rule' and displays a dividing line. | [p-divider.md](references/components/p-divider/p-divider.md) |
| `p-drilldown` _(experimental)_ | The `p-drilldown` component is meant for displaying an infinite multilevel structure in a drilldown menu that overlays the page content from the start side of the screen. | [p-drilldown.md](references/components/p-drilldown/p-drilldown.md) |
| `p-fieldset` | The `p-fieldset` is a grouping component for wrapping contextual associated form elements. | [p-fieldset.md](references/components/p-fieldset/p-fieldset.md) |
| `p-flag` | Displays a country or region flag, styled to the Porsche design language. | [p-flag.md](references/components/p-flag/p-flag.md) |
| `p-flyout` | The `p-flyout` is a overlay from the left or right side of the screen. | [p-flyout.md](references/components/p-flyout/p-flyout.md) |
| `p-heading` | `p-heading` is used to highlight and specify heading styling and hierarchy in documents. | [p-heading.md](references/components/p-heading/p-heading.md) |
| `p-icon` | Along with other Porsche basic elements - such as colors, typography and the Porsche marque - icons are core components of the Porsche design. | [p-icon.md](references/components/p-icon/p-icon.md) |
| `p-inline-notification` | The `p-inline-notification` is a controlled component that provides action-based feedback messages (e.g. after performing a task) or to convey informational and/or critical notification like some site related topics. | [p-inline-notification.md](references/components/p-inline-notification/p-inline-notification.md) |
| `p-input-date` | The `p-input-date` component provides a versatile, user‑friendly interface for entering date values. | [p-input-date.md](references/components/p-input-date/p-input-date.md) |
| `p-input-email` | The `p-input-email` component provides a user-friendly, accessible interface for entering valid email addresses. | [p-input-email.md](references/components/p-input-email/p-input-email.md) |
| `p-input-month` | The `p-input-month` component provides a versatile, user‑friendly interface for entering month values. | [p-input-month.md](references/components/p-input-month/p-input-month.md) |
| `p-input-number` | The `p-input-number` component provides a versatile, user‑friendly interface for entering numeric values. | [p-input-number.md](references/components/p-input-number/p-input-number.md) |
| `p-input-password` | The `p-input-password` component enables secure password entry by obscuring the typed characters. | [p-input-password.md](references/components/p-input-password/p-input-password.md) |
| `p-input-search` | The `p-input-search` component offers a versatile, user-friendly interface for entering and submitting search queries. | [p-input-search.md](references/components/p-input-search/p-input-search.md) |
| `p-input-tel` | The `p-input-tel` component provides a user-friendly, accessible interface for entering valid telephone numbers. | [p-input-tel.md](references/components/p-input-tel/p-input-tel.md) |
| `p-input-text` | The `p-input-text` component provides a versatile, user‑friendly interface for entering freeform text. | [p-input-text.md](references/components/p-input-text/p-input-text.md) |
| `p-input-time` | The `p-input-time` component provides a versatile, user‑friendly interface for entering time values. | [p-input-time.md](references/components/p-input-time/p-input-time.md) |
| `p-input-url` | The `p-input-url` component provides a user-friendly, accessible interface for entering valid website URLs. | [p-input-url.md](references/components/p-input-url/p-input-url.md) |
| `p-input-week` | The `p-input-week` component provides a versatile, user‑friendly interface for entering week values. | [p-input-week.md](references/components/p-input-week/p-input-week.md) |
| `p-link` | The `p-link` component is essential to perform changes in **page routes**. | [p-link.md](references/components/p-link/p-link.md) |
| `p-link-pure` | The `p-link-pure` component is essential for performing changes in **page routes**. | [p-link-pure.md](references/components/p-link-pure/p-link-pure.md) |
| `p-link-tile` | The `p-link-tile` is a navigational component that displays a provided image to tease content and navigate to further information within one container. | [p-link-tile.md](references/components/p-link-tile/p-link-tile.md) |
| `p-link-tile-product` _(experimental)_ | The `p-link-tile-product` is a navigational component designed to showcase a featured product within a store. | [p-link-tile-product.md](references/components/p-link-tile-product/p-link-tile-product.md) |
| `p-modal` | The `p-modal` is a temporary overlay to focus the user's attention on one task while interactions with the underlying page are blocked. | [p-modal.md](references/components/p-modal/p-modal.md) |
| `p-model-signature` | The `p-model-signature` component is purely visual and renders the different signatures of Porsche car models. | [p-model-signature.md](references/components/p-model-signature/p-model-signature.md) |
| `p-multi-select` | The `p-multi-select` component is a versatile custom form element that facilitates the selection of multiple options. | [p-multi-select.md](references/components/p-multi-select/p-multi-select.md) |
| `p-pagination` | Splits a large set of content across pages and lets the user navigate between them. | [p-pagination.md](references/components/p-pagination/p-pagination.md) |
| `p-pin-code` | The `p-pin-code` component is optimized for entering sequences of digits. | [p-pin-code.md](references/components/p-pin-code/p-pin-code.md) |
| `p-popover` | Shows additional contextual content in an overlay on top of other content, typically opened from an info button. | [p-popover.md](references/components/p-popover/p-popover.md) |
| `p-radio-group` | The `p-radio-group` component is a versatile custom form element that enables the selection of a single option. | [p-radio-group.md](references/components/p-radio-group/p-radio-group.md) |
| `p-scroller` | The `p-scroller` component forces its child nodes to be rendered horizontally next to each other. | [p-scroller.md](references/components/p-scroller/p-scroller.md) |
| `p-segmented-control` | The `p-segmented-control` component is similar to the native `select` element while showing all available options right away. | [p-segmented-control.md](references/components/p-segmented-control/p-segmented-control.md) |
| `p-select` | The `p-select` component is a versatile custom form element that enables the selection of a single option. | [p-select.md](references/components/p-select/p-select.md) |
| `p-sheet` | The `p-sheet` is a temporary overlay to focus the user's attention on one or multiple tasks while the underlying page is still visible but interactions with it are blocked. | [p-sheet.md](references/components/p-sheet/p-sheet.md) |
| `p-spinner` | Indicates an ongoing process the user must wait for, such as loading or processing. | [p-spinner.md](references/components/p-spinner/p-spinner.md) |
| `p-stepper-horizontal` | The `p-stepper-horizontal` component displays progress through a sequence of logical and numbered steps. | [p-stepper-horizontal.md](references/components/p-stepper-horizontal/p-stepper-horizontal.md) |
| `p-switch` | The `p-switch` component is a control that is used to quickly switch between two possible states. | [p-switch.md](references/components/p-switch/p-switch.md) |
| `p-table` | The `p-table` component displays tabular data and offers column-wise sorting options. | [p-table.md](references/components/p-table/p-table.md) |
| `p-tabs` | The `p-tabs` component makes it easy to explore and switch between different views. | [p-tabs.md](references/components/p-tabs/p-tabs.md) |
| `p-tabs-bar` | The `p-tabs-bar` component is a styled button/link list for multiple purposes. | [p-tabs-bar.md](references/components/p-tabs-bar/p-tabs-bar.md) |
| `p-tag` | `p-tag` is used to label, categorize, or organize items by using keywords that describe them. | [p-tag.md](references/components/p-tag/p-tag.md) |
| `p-tag-dismissible` | `p-tag-dismissible` is used in contexts where the user can actively remove a tag. | [p-tag-dismissible.md](references/components/p-tag-dismissible/p-tag-dismissible.md) |
| `p-text` | `p-text` is used to specify paragraph styling in documents. | [p-text.md](references/components/p-text/p-text.md) |
| `p-text-list` | The `p-text-list` component is used to display listed data in form of an unordered or ordered list. | [p-text-list.md](references/components/p-text-list/p-text-list.md) |
| `p-textarea` | The `p-textarea` component is a multi-line text input control. | [p-textarea.md](references/components/p-textarea/p-textarea.md) |
| `p-toast` | The `p-toast` component manages both, the queue and display of toast messages. | [p-toast.md](references/components/p-toast/p-toast.md) |
| `p-wordmark` | The `p-wordmark` gives the Porsche brand a distinctive look, sets it apart from others within the overall external image and represents the quality of the product. | [p-wordmark.md](references/components/p-wordmark/p-wordmark.md) |

## Styling

The Porsche Design System offers a ready-made integration for four styling solutions. They are independent of the components — you do not need them to use components, and they do not depend on components — but they build on the same design system: the same design tokens and the same `color-scheme` (light/dark) theming. Custom UI you build with them therefore shares the exact palette, spacing and typography as PDS components. Theming is a single switch: one `.scheme-*` class on `<html>` drives both layers — PDS components and your custom markup — off one `light-dark()` palette. There is no separate component theming API and no `theme` prop; see the Core rules and `references/stylesheets.md`.

Use them to build layout and custom components or patterns not yet available in the component library — typography, surfaces, boxes, the layout grid, spacing and responsive breakpoints. Pick one solution per project and open its reference for setup and the full catalog.

| Styling solution | Use this when | Reference |
| --- | --- | --- |
| Tailwind CSS | utility-first styling on a PDS Tailwind v4 theme | [tailwindcss.md](references/styles/tailwindcss.md) |
| SCSS | Sass variables and mixins under the `pds` namespace | [scss.md](references/styles/scss.md) |
| vanilla-extract | typed tokens and utilities in `*.css.ts` files | [vanilla-extract.md](references/styles/vanilla-extract.md) |
| Emotion | tokens and utilities in `css`/`styled` styles | [emotion.md](references/styles/emotion.md) |

## Reference map

| Reference | Use this when |
| --- | --- |
| `references/stylesheets.md` | The required global stylesheets every component depends on (CSS variables, font-face, normalize/reset) and light/dark theming via the `.scheme-*` classes and `color-scheme`. Open this whenever installing or setting up PDS, before rendering any component, when components look unstyled or use the wrong font/colors, or for anything about themes, dark mode, or color scheme — it applies to most PDS work. |
| `references/tokens.md` | Using design tokens — color, spacing, typography, etc. |
| `references/partials.md` | Adding PDS partials — fonts, icons, meta tags, loader script. |
| `references/migration/porsche-design-system.md` | Upgrading the Porsche Design System to a new major version. |
| `references/migration/scss.md` | Migrating the SCSS styling solution. |
| `references/migration/tailwindcss.md` | Migrating the Tailwind CSS styling solution. |
| `references/migration/vanilla-extract.md` | Migrating the vanilla-extract styling solution. |
| `references/migration/emotion.md` | Migrating the Emotion styling solution. |

## Core rules

- **Theming is one mechanism — CSS `color-scheme`, nothing else.** Light/dark is controlled solely by the `.scheme-light` / `.scheme-dark` / `.scheme-light-dark` classes on `<html>` (or any ancestor); the scheme cascades to **both** PDS components and custom markup, which all resolve colors via `light-dark()`. `.scheme-light-dark` follows the OS. There is **no** `theme` prop — not on `PorscheDesignSystemProvider` (it takes only `prefix` and `cdn`) and not on components. A `theme="light|dark|auto"` prop existed in earlier majors and was removed; if you recall one, it is a stale prior — do not add it, verify against the installed types. See `references/stylesheets.md`.
- `component-meta` is authoritative: when it disagrees with the examples or prose here, follow `component-meta` (raw data at `@porsche-design-system/components-js/meta`). This subpath is the authoritative source: the wrapper's own `meta/` and `scss/` re-export the same-version `@porsche-design-system/components-js` peer, so the skill links the peer directly.
- Prefer Porsche Design System components and tokens for new UI. Do not rewrite non-PDS UI unasked, and do not hijack work that targets another library.
- All content here is version-exact for the installed package — never mix guidance across versions.
- Every reference path is relative to this skill root unless explicitly noted otherwise.
