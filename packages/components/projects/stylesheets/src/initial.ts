import { INTERNAL_TAG_NAMES, TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import type { CssNode } from './types';

// The fully resolved CSS for `initial.css`: what a page needs until the component chunks from the CDN have defined the
// `p-*` elements. Like `normalize.css`, it is a raw block without documented leaves, so it lives outside the
// `stylesheetsMeta` catalog and is only consumed by the composition layer.
//
// Every rule is scoped to the PDS tags. A bare `:not(:defined)` also matches custom elements of other libraries that
// are never registered, e.g. `<next-route-announcer>` of Next.js, whose `aria-live` region then inherits
// `visibility: hidden` and is no longer announced by screen readers.
//
// `[data-ssr]` marks elements rendered by `@porsche-design-system/components-react/ssr`. Their Declarative Shadow DOM
// already renders them, so they are excluded – which lets one file serve every framework.

// Internal tags are rendered only inside the Shadow DOM of other components, where a global stylesheet never reaches.
const publicTagNames = TAG_NAMES.filter((tagName) => !INTERNAL_TAG_NAMES.includes(tagName));

// Components that render a `<dialog>` which is closed by default (`open` is `false`). Once defined, their slotted
// content takes no space until they are opened; before that, `visibility: hidden` would keep the content in the
// document flow and push the rest of the page down.
// `p-popover` is not listed: its trigger stays in the flow, and hiding it would shift the layout the other way.
export const INITIAL_CLOSED_OVERLAY_TAG_NAMES = [
  'p-drilldown',
  'p-flyout',
  'p-modal',
  'p-sheet',
] as const satisfies readonly TagName[];

const undefinedSelector = (tagNames: readonly string[]): string =>
  `:is(${tagNames.join(', ')}):not(:defined, [data-ssr])`;

export const initialCss: CssNode[] = [
  {
    comment: 'Hides the components until they are defined, which prevents a flash of unstyled content (FOUC)',
    selector: undefinedSelector(publicTagNames),
    declarations: [{ property: 'visibility', value: 'hidden' }],
  },
  {
    comment: 'Takes closed overlays out of the layout until they are defined',
    selector: undefinedSelector(INITIAL_CLOSED_OVERLAY_TAG_NAMES),
    declarations: [{ property: 'display', value: 'none' }],
  },
];
