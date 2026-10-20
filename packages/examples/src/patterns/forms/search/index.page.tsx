import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Script } from '../../../_partials/Script.tsx';

/** Cities the field filters. The buttons stay in the markup so the result list is part of the example, not only the script. */
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

/**
 * Same measurements as a `p-select` option at the default scale: 8px block padding, 12px inline padding, 8px between
 * rows and 8px around the list. Highlight, hover and press use the frosted background and primary text of an option.
 */
const resultLabelClass =
  'flex w-full min-h-[var(--leading-normal)] cursor-pointer gap-static-sm rounded-sm px-[calc(var(--spacing-static-sm)+var(--spacing-static-xs))] py-static-sm text-start text-sm font-normal leading-normal break-words text-contrast-high transition-colors hover:bg-frosted hover:text-primary active:bg-frosted active:text-primary';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Search: Dealer results',
  description:
    'A search field filters dealer choices inside a popover. Focus stays in the field: the arrow keys move a highlight through the matches, and Enter or a click writes the highlighted choice into the field.',
};

/**
 * Dealer search: `p-input-search` is the popover trigger, and the page owns filtering, keyboard navigation and aria IDREF functionality.
 *
 * `hide-arrow` drops the arrow and the offset it would add, and the script matches the panel
 * width to the field. Choosing a result writes that city into the field. The script sets `role="combobox"`,
 * `aria-autocomplete="list"`, `aria-haspopup="listbox"` and `aria-expanded` through the `aria` prop. A string
 * `aria-controls` cannot be resolved from inside the input's shadow tree, and `p-input-search` does not expose
 * element-reference ARIA properties on its public API yet, so as a workaround the script reaches into `shadowRoot` to
 * point `ariaControlsElements` at the listbox and `ariaActiveDescendantElement` at the highlighted option.
 * `p-input-search` already emits `input`, and `focusin` bubbles out of the inner field.
 */
const Page = () => (
  <PatternPage meta={meta}>
    <main id="main" class="grid-template gap-y-fluid-md py-fluid-lg">
      <div class="col-extended justify-self-center w-full max-w-sm grid gap-static-md">
        <p-heading tag="h1" size="lg">
          Find a dealer
        </p-heading>
        <p-text>
          Type a city. The arrow keys move through the matches, and Enter writes the highlighted choice into the field.
        </p-text>
        <p-popover
          id="dealer-search-popover"
          class="[--p-popover-px:var(--spacing-static-sm)] [--p-popover-py:var(--spacing-static-sm)]"
          hide-arrow={true}
        >
          <form id="dealer-search-form" slot="button" class="w-full" aria-label="Find a dealer" autocomplete="off">
            <p-input-search
              id="dealer-search"
              name="dealer"
              label="City"
              description="Type a city name to find a dealer nearby."
              hide-label={true}
              placeholder="e.g. Stuttgart"
              clear={true}
              indicator={true}
            >
              <p-button
                slot="end"
                type="submit"
                variant="secondary"
                form="dealer-search-form"
                icon="arrow-right"
                hide-label={true}
                compact={true}
              >
                Search
              </p-button>
            </p-input-search>
          </form>
          <p
            id="dealer-search-empty"
            class="m-0 min-h-[var(--leading-normal)] px-[calc(var(--spacing-static-sm)+var(--spacing-static-xs))] py-static-sm text-start text-sm text-contrast-medium"
            hidden
          >
            No results found
          </p>
          <div id="dealer-search-results" role="listbox" aria-label="City" class="grid gap-static-sm">
            {dealers.map((dealer) => (
              <div
                id={`dealer-search-result-${dealer.toLowerCase().replaceAll(' ', '-')}`}
                role="option"
                aria-selected="false"
                class={resultLabelClass}
              >
                {dealer}
                <p-icon name="check" color="primary" class="ms-auto shrink-0" hidden />
              </div>
            ))}
          </div>
        </p-popover>
        <p id="dealer-search-status" class="sr-only" role="status" />
      </div>
    </main>
    <Script>
      {`
        // Shows matching dealer choices in the popover and writes the highlighted one into the field.
        Promise.all([customElements.whenDefined('p-popover'), customElements.whenDefined('p-input-search')])
          .then(() => document.getElementById('dealer-search').componentOnReady())
          .then(() => {
          const popover = document.getElementById('dealer-search-popover');
          const form = document.getElementById('dealer-search-form');
          const search = document.getElementById('dealer-search');
          const list = document.getElementById('dealer-search-results');
          const empty = document.getElementById('dealer-search-empty');
          const status = document.getElementById('dealer-search-status');
          if (!popover || !form || !search || !list || !empty || !status) {
            throw new Error('Dealer search markup is incomplete');
          }

          const activeClasses = [
            'bg-frosted',
            'text-primary',
            'forced-colors:outline',
            'forced-colors:outline-2',
            'forced-colors:-outline-offset-2',
            'forced-colors:outline-[Highlight]',
          ];
          let activeIndex = -1;
          let selectedOption = null;
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
            if (!input.ariaControlsElements || input.ariaControlsElements[0] !== list) {
              input.ariaControlsElements = [list];
            }
            if (input.ariaActiveDescendantElement !== active) {
              input.ariaActiveDescendantElement = active;
            }
          };

          const options = () => Array.from(list.querySelectorAll('[role="option"]'));

          const visibleOptions = () => options().filter((option) => !option.hidden);

          const setSelected = (next) => {
            selectedOption = next;
            for (const option of options()) {
              const isSelected = option === selectedOption;
              option.setAttribute('aria-selected', isSelected ? 'true' : 'false');
              option.querySelector('p-icon').hidden = !isSelected;
              option.classList.toggle('text-primary', isSelected || option.classList.contains('bg-frosted'));
            }
          };

          const setActive = (index) => {
            const items = visibleOptions();
            activeIndex = index;
            const active = index >= 0 ? items[index] : null;
            for (const option of options()) {
              option.classList.remove(...activeClasses);
              if (option === selectedOption) {
                option.classList.add('text-primary');
              }
            }
            if (active) {
              active.classList.add(...activeClasses);
              active.scrollIntoView({ block: 'nearest' });
            }
            bindField(active);
          };

          const setOpen = (open) => {
            popover.open = open;
            search.aria = {
              role: 'combobox',
              'aria-autocomplete': 'list',
              'aria-haspopup': 'listbox',
              'aria-expanded': open,
            };
            if (!open) {
              status.textContent = '';
            }
            setActive(-1);
          };

          const choose = (option) => {
            setSelected(option);
            search.value = option.textContent.trim();
            dismissed = true;
            setOpen(false);
          };

          const queryOf = () => String(search.value ?? '').trim().toLowerCase();

          const renderResults = () => {
            const query = queryOf();
            if (selectedOption && selectedOption.textContent.trim().toLowerCase() !== query) {
              setSelected(null);
            }
            let visible = 0;
            for (const option of options()) {
              const match = query.length > 0 && option.textContent.toLowerCase().includes(query);
              option.hidden = !match;
              if (match) {
                visible += 1;
              }
            }
            list.hidden = visible === 0;
            empty.hidden = !query || visible > 0;
            status.textContent = query && visible === 0 ? 'No results' : '';
            setOpen(query.length > 0);
          };

          new ResizeObserver(() => {
            const width = Math.round(search.getBoundingClientRect().width) + 'px';
            popover.style.setProperty('--p-popover-w', width);
            popover.style.setProperty('--p-popover-max-w', width);
          }).observe(search);

          setOpen(false);

          form.addEventListener('submit', (event) => {
            event.preventDefault();
            const items = visibleOptions();
            if (popover.open && activeIndex >= 0 && items[activeIndex]) {
              choose(items[activeIndex]);
              return;
            }
            dismissed = true;
            setOpen(false);
          });

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
            const option = event.target.closest('[role="option"]');
            if (!option || option.hidden) {
              return;
            }
            choose(option);
          });

          search.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && popover.open) {
              // The popover closes on Escape; without this the native search field would also clear the query.
              event.preventDefault();
              return;
            }
            if (event.key === 'ArrowDown') {
              if (!popover.open && queryOf()) {
                dismissed = false;
                renderResults();
              }
              const items = visibleOptions();
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
