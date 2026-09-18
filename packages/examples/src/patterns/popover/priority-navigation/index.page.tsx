import { placeholderHref } from '../../../_data.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';

/**
 * The entries of the bar. Nine of them, so some have to collapse at any realistic width – which is the point of the
 * pattern. `count` renders the counter one of them carries, to show that an entry is not always a bare label.
 */
const barItems: { label: string; count?: string }[] = [
  { label: 'Some Item 1' },
  { label: 'Some Item 2', count: '43' },
  { label: 'Some Item 3' },
  { label: 'Some Item 4' },
  { label: 'Some Item 5' },
  { label: 'Some Item 6' },
  { label: 'Some Item 7' },
  { label: 'Some Item 8' },
  { label: 'Some Item 9' },
];

/**
 * Popover pattern – the entries that no longer fit are moved into a popover instead of wrapping or being cut off.
 *
 * Every entry is one `<li>`, in the bar or in the popover: `main.js` moves the very same element between the two
 * lists, so an entry keeps its identity, its counter and its accessible name wherever it currently sits. Nothing is
 * duplicated and nothing is re-created, which is also why the markup below describes the widest state only.
 */
const Page = () => (
  <PatternPage
    title="Popover 2"
    description="Navigation entries that no longer fit collapse into a popover, keeping the bar on a single line."
  >
    <main id="main" class="grid-template">
      <section class="col-wide py-fluid-lg grid gap-fluid-md">
        <p-heading tag="h1" size="xl">
          Priority navigation
        </p-heading>
        <p-text>
          Resize the window: navigation entries that no longer fit collapse into the “More” popover, so the bar keeps
          its height and no entry is cut off.
        </p-text>

        {/* The negative margin pulls the focus outlines of the entries out of the clipped area again, so a focused
            entry is never partly cut off by the clipping the measurement needs. */}
        <nav
          class="overflow-hidden -mx-[calc(var(--spacing-static-xs)*2+4px)] px-[calc(var(--spacing-static-xs)*2+4px)]"
          aria-label="Sections"
        >
          <ul
            id="nav-bar"
            class="flex items-center gap-static-md min-h-[3rem] whitespace-nowrap border-b border-contrast-lower *:shrink-0"
          >
            {barItems.map(({ label, count }) => (
              <li key={label}>
                <p-link-pure class="p-static-xs -m-static-xs" icon="none">
                  <a href={placeholderHref}>
                    {label}
                    {count && (
                      <p-tag class="ms-static-xs" variant="secondary" compact>
                        {count}
                      </p-tag>
                    )}
                  </a>
                </p-link-pure>
              </li>
            ))}
            {/* Not shown until an entry actually has to collapse – a trigger for an empty popover would be a control
                that does nothing. `main.js` reveals it while measuring, because it needs its own width. */}
            <li id="more-trigger" class="ms-auto" hidden>
              <p-popover id="more-popover" class="[--p-popover-w:240px]">
                <p-button
                  slot="button"
                  id="more-button"
                  type="button"
                  variant="secondary"
                  compact="true"
                  icon="arrow-head-down"
                  aria="{ 'aria-expanded': false }"
                >
                  More
                </p-button>
                <ul id="overflow-list" class="grid gap-static-md *:grid" />
              </p-popover>
            </li>
          </ul>
        </nav>
      </section>
    </main>
  </PatternPage>
);

export default Page;
