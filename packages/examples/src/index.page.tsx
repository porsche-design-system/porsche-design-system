import { OverviewPage } from './_layouts/OverviewPage.tsx';
import { type ExampleItem, ExampleList } from './_partials/ExampleList.tsx';

/**
 * Templates are complete application pages: they own the chrome and demonstrate a full document.
 *
 * The `href` is relative to the root of the category, which the overview prefixes it with. Add an entry for every new
 * example, so it can be reached from here while developing.
 */
export const templateItems: ExampleItem[] = [
  {
    id: 'landing',
    href: 'landing-page/',
    label: 'Landing page',
    description: 'Hero, feature grid and call to action, with a page level navigation override.',
  },
  {
    id: 'admin-panel',
    href: 'admin-panel/',
    label: 'Admin panel',
    description: 'Application shell with two sidebars, a list of models with filters and a color scheme switch.',
  },
];

/** Patterns showcase a single section of a page, so variations of the same partial can be compared. */
export const patternItems: ExampleItem[] = [
  {
    id: 'header-overlay',
    href: 'header/overlay/',
    label: 'Header - Overlay',
    description: 'Brand, navigation and meta actions on a single row, lying on top of the content.',
  },
  {
    id: 'header-stacked',
    href: 'header/stacked/',
    label: 'Header - Stacked',
    description: 'Note, header bar and category navigation stacked above the content.',
  },
  {
    id: 'footer',
    href: 'footer/',
    label: 'Footer',
    description: 'Footer with a logo, navigation and legal links, shown at the bottom of a page.',
  },
  {
    id: 'popover-local-market-switch',
    href: 'popover/local-market-switch/',
    label: 'Popover - Local market switch',
    description: 'Popover on load next to the header affordance it belongs to, becoming a sheet on narrow viewports.',
  },
  {
    id: 'popover-priority-navigation',
    href: 'popover/priority-navigation/',
    label: 'Popover - Priority navigation',
    description: 'Navigation entries that no longer fit collapse into a popover, keeping the bar on a single line.',
  },
  {
    id: 'popover-feature-tour',
    href: 'popover/feature-tour/',
    label: 'Popover - Feature tour',
    description: 'A sequence of coachmarks walking through the affordances of the header, one step at a time.',
  },
  {
    id: 'feedback-inline',
    href: 'feedback/inline/',
    label: 'Feedback - Inline',
    description: 'Rating scale and optional comment shown in the page, confirming in place once submitted.',
  },
  {
    id: 'feedback-dialog',
    href: 'feedback/dialog/',
    label: 'Feedback - Dialog',
    description: 'The same feedback flow in a modal, opened from a button and reset once it has closed.',
  },
];

/**
 * Overview of the source tree – the entry point of the dev server.
 *
 * It is **not** emitted: the build writes one project per example, and the storefront's own navigation is what links
 * them there. This page exists so every example can be reached from one place while developing, and it is the only
 * page that navigates at all.
 */
const Page = () => (
  <OverviewPage
    title="Overview"
    description="Overview of the dummy templates and patterns."
    heading="Dummy examples"
    intro="Templates are complete application pages. Patterns show a single section of a page, so variations of the same partial can be compared. Links inside an example are placeholders – only this overview navigates."
  >
    <section>
      <h2 class="mb-2 text-3xl font-semibold">Templates</h2>
      <p class="mb-6 text-contrast-medium">Whole pages, from the header to the footer.</p>
      <ExampleList basePath="./templates/" items={templateItems} label="Templates" />
    </section>

    <section>
      <h2 class="mb-2 text-3xl font-semibold">Patterns</h2>
      <p class="mb-6 text-contrast-medium">Single sections, shown in the place they occupy on a real page.</p>
      <ExampleList basePath="./patterns/" items={patternItems} label="Patterns" />
    </section>
  </OverviewPage>
);

export default Page;
