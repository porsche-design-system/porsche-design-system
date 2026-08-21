import { Fragment } from 'preact';
import { placeholderHref } from '../../_data.ts';
import { CanvasPage } from '../../_layouts/CanvasPage.tsx';

/**
 * Admin panel – a productive application page, built on `p-canvas` instead of the marketing chrome.
 *
 * The component owns the layout of the page: a banner with the two sidebar affordances, a navigation sidebar on the
 * start side, a settings sidebar on the end side and the `main` landmark this page fills. Nothing here renders a
 * landmark of its own, because doing so would nest it inside the one the canvas already provides.
 *
 * The repeated parts – the sidebar navigation, the rows of the table, the link lists – are data, so the entries
 * cannot drift apart and a change reaches all of them. Everything interactive is wired up by `main.js` on the ids
 * below, which stay literals: `src/_ids.ts` single-sources the ids of the *shared* snippets in `assets/`, and every id
 * registered there has to be owned by exactly one of them.
 *
 * - `admin-canvas` – the shell, whose two sidebars are used in controlled mode;
 * - `settings-button` / `search-button` – the two affordances of the banner, and what they open;
 * - `search-dialog` – the search, asked for in a modal;
 * - `sidebar-nav` – the navigation, whose accordions are controlled as well;
 * - `model-tabs` – the tabs above the list;
 * - `scheme-select` – the color scheme switch, which writes its value onto `<html>`.
 */

/** One category of the sidebar navigation: a collapsible group of placeholder entries. */
type SidebarCategory = {
  label: string;
  links: string[];
};

/** The sidebar navigation, in three labelled groups of categories. */
const sidebarGroups: { label: string; categories: SidebarCategory[] }[] = [
  {
    label: 'Fleet',
    categories: [
      { label: 'Models', links: ['911', 'Taycan', 'Macan'] },
      { label: 'Configurations', links: ['Exterior', 'Interior', 'Wheels', 'Packages'] },
      {
        label: 'Inventory',
        links: ['In stock', 'In transit', 'Reserved', 'Delivered', 'Returned', 'Archived'],
      },
    ],
  },
  {
    label: 'Sales',
    categories: [
      { label: 'Leads', links: ['New', 'Qualified', 'Won'] },
      { label: 'Contracts', links: ['Drafts', 'Signed'] },
    ],
  },
  {
    label: 'Administration',
    categories: [
      { label: 'Users', links: ['People', 'Roles', 'Invitations'] },
      { label: 'Dealers', links: ['Locations', 'Opening hours'] },
      { label: 'Integrations', links: ['Webhooks', 'API keys'] },
      { label: 'Billing', links: ['Invoices', 'Payment methods'] },
      { label: 'Audit log', links: ['Sign-ins', 'Changes'] },
    ],
  },
];

/** One row of the list – the image names the model, so the row is not identified by a picture alone. */
type Model = {
  name: string;
  image: string;
  interest: string;
  vin: string;
  purchaseIntention: string;
  status: string;
  leadId: string;
};

const models: Model[] = [
  {
    name: '718 Cayman',
    image: '/718.webp',
    interest: 'New Car',
    vin: '5GAKVCKD8EJ335750',
    purchaseIntention: '08/2021',
    status: 'Won',
    leadId: '0000824402',
  },
  {
    name: '911 Carrera',
    image: '/911.webp',
    interest: 'Used Car',
    vin: 'WP0ZZZ99ZTS392124',
    purchaseIntention: '09/2021',
    status: 'Won',
    leadId: '0000824408',
  },
];

/** The filters of the list. Each one names itself, so the five options are told apart by assistive tech as well. */
const filters = [
  { name: 'new-car', label: 'New Car' },
  { name: 'used-car', label: 'Used Car' },
  { name: 'reserved', label: 'Reserved' },
  { name: 'delivered', label: 'Delivered' },
  { name: 'archived', label: 'Archived' },
];

/** The three link lists below the list of models. */
const linkLists = [
  {
    heading: 'Your Favorites',
    links: ['New Relic', 'Bise', 'AWS', 'GRBX Integration Manager', 'Cloud Documentation'],
  },
  {
    heading: 'Most Suggested',
    links: ['Grafana', 'New Relic', 'BISE Scanners', 'Integration Manager', 'Prisma Cloud'],
  },
  {
    heading: 'Quick Links',
    links: ['Tools & Services', 'Quick Guide', 'Integration Manager', 'Confluence', 'News'],
  },
];

/** The legal links of the sidebar footer. */
const legalLinks = ['Privacy Policy', 'Legal Notice', 'License', 'Accessibility Statement'];

const Page = () => (
  <CanvasPage
    title="Admin panel"
    description="Productive application page built on p-canvas, with a navigation sidebar, a settings sidebar and a list of models."
  >
    <p-canvas id="admin-canvas">
      <a href={placeholderHref} slot="title">
        Admin Panel
      </a>

      {/* Both affordances of the banner say what they do: one opens a dialog, the other a sidebar whose state it
          mirrors – `hide-label` only hides the label visually, so each keeps its accessible name. */}
      <p-button
        id="search-button"
        slot="header-end"
        icon="search"
        variant="secondary"
        compact="true"
        hide-label="true"
        aria="{ 'aria-haspopup': 'dialog' }"
      >
        Open search
      </p-button>
      <p-button
        id="settings-button"
        slot="header-end"
        icon="user"
        variant="secondary"
        compact="true"
        hide-label="true"
        aria="{ 'aria-expanded': false }"
      >
        Open settings sidebar
      </p-button>

      {/* The Porsche Grid spans the viewport, which the content area of a canvas does not: its width changes with the
          sidebars. So the content brings its own columns and asks the container, not the viewport, how wide it is. */}
      <div class="@container grid grid-cols-12 gap-x-fluid-md">
        <div class="col-span-full flex gap-static-md items-center">
          <p-heading size="xl" tag="h1">
            Porsche Models
          </p-heading>
          <p-button type="button" icon="plus" compact="true">
            Add model
          </p-button>
        </div>

        <p-tabs-bar id="model-tabs" class="col-span-full mt-fluid-lg" background="surface" active-tab-index={0}>
          <button type="button">Overview</button>
          <button type="button">Drafts</button>
        </p-tabs-bar>

        <p-popover>
          <p-button
            class="col-span-full mt-fluid-md justify-self-start"
            slot="button"
            variant="secondary"
            type="button"
            compact="true"
            icon="filter"
          >
            Filter
          </p-button>
          <form class="space-y-fluid-sm" aria-label="Filter models">
            {filters.map(({ name, label }) => (
              <p-checkbox key={name} label={label} name={name} />
            ))}
          </form>
        </p-popover>

        <p-table
          class="[--p-table-scroll-indicator-top:64px] [--p-table-scroll-indicator-bottom:var(--spacing-static-md)] col-span-full mt-fluid-sm"
          caption="Porsche Models"
          sticky={true}
        >
          <p-table-head>
            <p-table-head-row>
              <p-table-head-cell>Model</p-table-head-cell>
              <p-table-head-cell>Interest</p-table-head-cell>
              <p-table-head-cell>VIN</p-table-head-cell>
              <p-table-head-cell>Purchase Intention</p-table-head-cell>
              <p-table-head-cell>Status</p-table-head-cell>
              <p-table-head-cell>Comment</p-table-head-cell>
              <p-table-head-cell>Lead ID</p-table-head-cell>
              <p-table-head-cell>Action</p-table-head-cell>
            </p-table-head-row>
          </p-table-head>
          <p-table-body>
            {models.map((model) => (
              <p-table-row key={model.vin}>
                <p-table-cell>
                  <img src={model.image} width="80" height="45" alt={`Porsche ${model.name}`} />
                </p-table-cell>
                <p-table-cell>{model.interest}</p-table-cell>
                <p-table-cell>
                  <p-link-pure underline={true} icon="none">
                    <a href={placeholderHref}>{model.vin}</a>
                  </p-link-pure>
                </p-table-cell>
                <p-table-cell>{model.purchaseIntention}</p-table-cell>
                <p-table-cell>{model.status}</p-table-cell>
                <p-table-cell class="min-w-[10rem]" multiline={true}>
                  -
                </p-table-cell>
                <p-table-cell>
                  {model.leadId}
                  <p-popover>
                    <p-text>Some additional content</p-text>
                  </p-popover>
                </p-table-cell>
                <p-table-cell class="flex gap-static-md">
                  {/* Named after the row they act on, so the eight actions of the list are told apart out of context. */}
                  <p-button-pure type="button" icon="edit" hide-label="true">
                    Edit {model.name}
                  </p-button-pure>
                  <p-button-pure type="button" icon="delete" hide-label="true">
                    Delete {model.name}
                  </p-button-pure>
                </p-table-cell>
              </p-table-row>
            ))}
          </p-table-body>
        </p-table>

        <div class="col-span-full mt-fluid-lg grid grid-cols-subgrid gap-y-fluid-lg">
          {linkLists.map(({ heading, links }) => (
            <div key={heading} class="col-span-full @2xl:col-span-4 grid gap-fluid-sm">
              <p-heading size="md" tag="h2">
                {heading}
              </p-heading>
              <ul class="grid gap-fluid-xs">
                {links.map((link) => (
                  <li key={link}>
                    <p-link-pure>
                      <a href={placeholderHref}>{link}</a>
                    </p-link-pure>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div slot="sidebar-start">
        {/* The categories are accordions in controlled mode: `main.js` writes `open` back, so the sidebar keeps the
            state a click asks for. The heading levels follow the outline of the sidebar, whose title the canvas
            renders as its own heading. */}
        <nav id="sidebar-nav" class="flex flex-col gap-static-sm" aria-label="Main">
          {sidebarGroups.map(({ label, categories }) => (
            <Fragment key={label}>
              <p-heading class="mt-static-md first:mt-0" tag="h2" size="2xs" color="contrast-medium">
                {label}
              </p-heading>
              {categories.map((category) => (
                <p-accordion key={category.label} class="[&>:not([slot]):not(:last-child)]:mb-static-sm" compact={true}>
                  <p-heading slot="summary" tag="h3" size="sm" weight="semibold">
                    {category.label}
                  </p-heading>
                  {category.links.map((link) => (
                    <p-link-pure key={link} class="w-full ps-static-sm" icon="none">
                      <a href={placeholderHref}>{link}</a>
                    </p-link-pure>
                  ))}
                </p-accordion>
              ))}
            </Fragment>
          ))}
        </nav>
        <p-divider class="my-fluid-lg" />
        <footer class="grid gap-static-xs justify-items-start">
          <p-text size="2xs" color="contrast-medium">
            © 2026 Dr. Ing. h.c. F. Porsche AG.
            <ul class="flex flex-col gap-fluid-xs mt-fluid-xs">
              {legalLinks.map((link) => (
                <li key={link}>
                  <p-link-pure icon="none" size="inherit" color="inherit" underline={true}>
                    <a href={placeholderHref}>{link}</a>
                  </p-link-pure>
                </li>
              ))}
            </ul>
          </p-text>
        </footer>
      </div>

      <div slot="sidebar-end">
        <div class="flex gap-fluid-sm items-center">
          {/* The initials repeat the name next to them, so they are decoration rather than content. */}
          <span
            class="w-16 h-16 aspect-square rounded-full bg-surface text-contrast-medium text-lg grid place-content-center"
            aria-hidden="true"
          >
            FP
          </span>
          <p-text>
            Ferdinand Porsche
            <br />
            <span class="text-contrast-medium">Admin</span>
          </p-text>
        </div>
        <p-divider class="my-fluid-md" />
        <p-link-pure class="my-static-xs w-full" icon="user">
          <a href={placeholderHref}>Account</a>
        </p-link-pure>
        <p-link-pure class="my-static-xs w-full" icon="configurate">
          <a href={placeholderHref}>Settings</a>
        </p-link-pure>
        <p-link-pure class="my-static-xs w-full" icon="chart">
          <a href={placeholderHref}>Analytics</a>
        </p-link-pure>
        <p-link-pure class="my-static-xs w-full" icon="information">
          <a href={placeholderHref}>Help</a>
        </p-link-pure>
        <p-divider class="my-fluid-md" />
        <p-select id="scheme-select" name="color-scheme" value="scheme-light-dark" label="Color Scheme" compact={true}>
          <p-select-option value="scheme-light">Light</p-select-option>
          <p-select-option value="scheme-dark">Dark</p-select-option>
          <p-select-option value="scheme-light-dark">Light Dark</p-select-option>
        </p-select>
        <p-divider class="my-fluid-md" />
        <p-button class="w-full" type="button" icon="none">
          Logout
        </p-button>
      </div>
    </p-canvas>

    {/* Like every dialog, the search is the last element of the body: it is opened from the banner, but it is not
        part of it. */}
    <p-modal id="search-dialog" class="[--p-modal-width:min(50rem,80vw)]" aria="{ 'aria-label': 'Search' }">
      <p-heading size="md" tag="h2">
        What are you looking for?
      </p-heading>
      <p-input-search
        class="mt-fluid-md"
        name="query"
        label="Search"
        indicator={true}
        clear={true}
        placeholder="Search"
        hide-label="true"
      />
    </p-modal>
  </CanvasPage>
);

export default Page;
