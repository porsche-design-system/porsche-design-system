import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Script } from '../../../_partials/Script.tsx';

/** Cities the field filters. The links stay in the markup so the result list is part of the example, not only the script. */
const dealers = [
  'Berlin',
  'Berlin Brandenburg',
  'Bochum',
  'Bonn',
  'Dortmund',
  'Dresden',
  'Duisburg',
  'Essen',
  'Frankfurt',
  'Frankfurt Airport',
  'Hamburg',
  'Hamburg Airport',
  'Köln',
  'Leipzig',
  'Munich',
  'Münster',
  'Stuttgart',
  'Stuttgart Airport',
  'Wuppertal',
];

/** URL-safe form of a city name, used for the dealer link's fragment. */
const slugOf = (dealer: string): string => dealer.toLowerCase().replaceAll(' ', '-');

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Search: Dealer links',
  description:
    'A search field filters dealer links inside a popover. Focus stays in the field: the arrow keys move a highlight through the matches, and Enter or a click opens the highlighted dealer page.',
};

/**
 * Dealer link search: `p-input-search` is the popover trigger, and the page owns filtering and keyboard navigation.
 *
 * The results are links, so the panel is a dialog rather than a listbox: choosing one navigates, which a listbox option
 * must not do. `hide-arrow` drops the arrow and the offset it would add, and the script matches the panel width to the
 * field. The script sets `role="combobox"`, `aria-autocomplete="list"`, `aria-haspopup="dialog"` and `aria-expanded`
 * through the `aria` prop. A string `aria-controls` cannot be resolved from inside the input's shadow tree, and
 * `p-input-search` does not expose element-reference ARIA properties on its public API yet, so as a workaround the
 * script reaches into `shadowRoot` to point `ariaControlsElements` at the dialog and `ariaActiveDescendantElement` at
 * the highlighted link. `p-input-search` already emits `input`, and `focusin` bubbles out of the inner field.
 */
const Page = () => (
  <PatternPage meta={meta}>
    <main id="main" class="grid-template gap-y-fluid-md py-fluid-lg">
      <div class="col-extended justify-self-center w-full max-w-sm grid gap-static-md">
        <p-heading tag="h1" size="lg">
          Find a dealer
        </p-heading>
        <p-text>
          Type a city. The arrow keys move through the matches, and Enter opens the highlighted dealer page.
        </p-text>
        <p-popover
          id="dealer-search-popover"
          hide-arrow={true}
          class="[--p-popover-px:var(--spacing-static-sm)] [--p-popover-py:var(--spacing-static-sm)]"
        >
          <p-input-search
            id="dealer-search"
            name="dealer"
            label="City"
            description="Type a city name to find a dealer nearby."
            hide-label={true}
            placeholder="e.g. Stuttgart"
            clear={true}
            indicator={true}
            slot="button"
          />
          <div id="dealer-search-dialog" role="dialog" aria-label="Dealer suggestions">
            <p id="dealer-search-empty" class="m-0 text-start text-sm text-contrast-medium" hidden>
              No results found
            </p>
            <ul id="dealer-search-results" class="m-0 grid list-none gap-static-sm p-0">
              {dealers.map((dealer) => (
                <li>
                  <p-link-pure
                    icon="arrow-right"
                    align-label="start"
                    stretch={true}
                    class="w-auto px-[calc(var(--spacing-static-sm)+var(--spacing-static-xs))] py-static-sm"
                  >
                    <a href={`#dealer-${slugOf(dealer)}`}>{dealer}</a>
                  </p-link-pure>
                </li>
              ))}
            </ul>
          </div>
        </p-popover>
        {dealers.map((dealer) => (
          <section id={`dealer-${slugOf(dealer)}`} class="hidden target:block">
            <p-text>Porsche Center {dealer}</p-text>
          </section>
        ))}
        <p id="dealer-search-status" class="sr-only" role="status" />
      </div>
    </main>
    <Script>
      {`
        // Shows matching dealer links in the popover. Enter and a click follow the highlighted link.
        Promise.all([customElements.whenDefined('p-popover'), customElements.whenDefined('p-input-search')])
          .then(() => document.getElementById('dealer-search').componentOnReady())
          .then(() => {
          const popover = document.getElementById('dealer-search-popover');
          const search = document.getElementById('dealer-search');
          const dialog = document.getElementById('dealer-search-dialog');
          const list = document.getElementById('dealer-search-results');
          const empty = document.getElementById('dealer-search-empty');
          const status = document.getElementById('dealer-search-status');
          if (!popover || !search || !dialog || !list || !empty || !status) {
            throw new Error('Dealer link search markup is incomplete');
          }

          let activeIndex = -1;
          let dismissed = false;

          // Workaround: p-input-search does not expose ariaControlsElements or ariaActiveDescendantElement on its
          // public API yet, and a string id in aria-controls or aria-activedescendant never resolves across the
          // shadow boundary. Reaching into shadowRoot to set the element references on the inner input exposes
          // both relationships in the accessibility tree. They are set again after aria is assigned, because that
          // render replaces the attributes on the same input.
          const bindField = (active) => {
            const input = search.shadowRoot && search.shadowRoot.querySelector('input');
            if (!input) {
              return;
            }
            if (!input.ariaControlsElements || input.ariaControlsElements[0] !== dialog) {
              input.ariaControlsElements = [dialog];
            }
            if (input.ariaActiveDescendantElement !== active) {
              input.ariaActiveDescendantElement = active;
            }
          };

          const links = () => Array.from(list.querySelectorAll('a'));

          const visibleLinks = () => links().filter((link) => !link.closest('li').hidden);

          const setActive = (index) => {
            const items = visibleLinks();
            activeIndex = index;
            const active = index >= 0 ? items[index] : null;
            for (const link of links()) {
              link.closest('p-link-pure').active = link === active;
            }
            if (active) {
              active.scrollIntoView({ block: 'nearest' });
            }
            bindField(active);
          };

          const setOpen = (open) => {
            popover.open = open;
            search.aria = {
              role: 'combobox',
              'aria-autocomplete': 'list',
              'aria-haspopup': 'dialog',
              'aria-expanded': open,
            };
            if (!open) {
              status.textContent = '';
            }
            setActive(-1);
          };

          const follow = (link) => {
            dismissed = true;
            setOpen(false);
            link.click();
          };

          const queryOf = () => String(search.value ?? '').trim().toLowerCase();

          const renderResults = () => {
            const query = queryOf();
            let visible = 0;
            for (const link of links()) {
              const match = query.length > 0 && link.textContent.toLowerCase().includes(query);
              link.closest('li').hidden = !match;
              if (match) {
                visible += 1;
              }
            }
            list.hidden = visible === 0;
            empty.hidden = !query || visible > 0;
            status.textContent = query && visible === 0 ? 'No matching dealers' : '';
            setOpen(query.length > 0);
          };

          const markCurrent = () => {
            for (const link of links()) {
              if (link.hash && link.hash === location.hash) {
                link.setAttribute('aria-current', 'page');
              } else {
                link.removeAttribute('aria-current');
              }
            }
          };

          new ResizeObserver(() => {
            const width = Math.round(search.getBoundingClientRect().width) + 'px';
            popover.style.setProperty('--p-popover-w', width);
            popover.style.setProperty('--p-popover-max-w', width);
          }).observe(search);

          setOpen(false);
          markCurrent();

          search.addEventListener('input', () => {
            dismissed = false;
            renderResults();
          });

          search.addEventListener('focusin', (event) => {
            if (dismissed || search.contains(event.relatedTarget)) {
              return;
            }
            renderResults();
          });

          popover.addEventListener('dismiss', (event) => {
            setOpen(false);
            if (event.detail && event.detail.reason === 'escape') {
              dismissed = true;
            }
          });

          list.addEventListener('mousedown', (event) => {
            event.preventDefault();
          });

          list.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (!link || link.closest('li').hidden) {
              return;
            }
            dismissed = true;
            setOpen(false);
          });

          window.addEventListener('hashchange', markCurrent);

          search.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && popover.open) {
              // The popover closes on Escape; without this the native search field would also clear the query.
              event.preventDefault();
              return;
            }
            if (event.key === 'Enter') {
              const items = visibleLinks();
              const highlighted = popover.open && activeIndex >= 0 ? items[activeIndex] : null;
              const exact = highlighted || items.find((link) => link.textContent.trim().toLowerCase() === queryOf());
              if (!exact) {
                return;
              }
              event.preventDefault();
              follow(exact);
              return;
            }
            if (event.key === 'ArrowDown') {
              if (!popover.open && queryOf()) {
                dismissed = false;
                renderResults();
              }
              const items = visibleLinks();
              if (!popover.open || !items.length) {
                return;
              }
              event.preventDefault();
              setActive(Math.min(activeIndex + 1, items.length - 1));
              return;
            }
            if (event.key === 'ArrowUp' && popover.open && activeIndex >= 0) {
              event.preventDefault();
              setActive(activeIndex - 1);
            }
          });
        });
      `}
    </Script>
  </PatternPage>
);

export default Page;
