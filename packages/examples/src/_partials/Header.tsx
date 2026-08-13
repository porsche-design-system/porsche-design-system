import type { NavItem } from '../_data.ts';

/**
 * Layout variations of the same header content, each showcased by a pattern page.
 *
 * `single-row` keeps brand, navigation and search on one row; `stacked` puts the navigation on its own row below.
 * The markup differs only in structure – content, semantics and accessible names are identical.
 *
 * The names deliberately avoid Tailwind utility names: the scanner reads these files whole, comments included, so a
 * variant named after a display utility would leak that unused utility into the compiled stylesheet.
 */
export type HeaderVariant = 'single-row' | 'stacked';

type HeaderProps = {
  basePath: string;
  /** Id of the active `NavItem`; only that one gets `aria-current="page"`. */
  currentPage: string;
  navItems: NavItem[];
  showSearch?: boolean;
  variant?: HeaderVariant;
};

const Brand = ({ basePath }: { basePath: string }) => (
  <a class="inline-flex items-center gap-2 font-semibold no-underline" href={basePath}>
    <span class="size-5 rounded-full bg-current" aria-hidden="true" />
    Dummy Patterns
  </a>
);

type MainNavProps = Pick<HeaderProps, 'basePath' | 'currentPage' | 'navItems'> & {
  /** Utility classes for the list, so the stacked variant can turn the navigation into its own row. */
  listClass?: string;
};

const MainNav = ({ basePath, currentPage, navItems, listClass = 'flex flex-wrap gap-1' }: MainNavProps) => (
  <nav aria-label="Main">
    <ul class={listClass}>
      {navItems.map((item) => (
        <li key={item.id}>
          {item.id === currentPage ? (
            <a
              class="inline-block rounded-md bg-surface px-3 py-1.5 font-semibold no-underline forced-colors:bg-[highlight] forced-colors:text-[highlighttext] forced-colors:forced-color-adjust-none"
              href={`${basePath}${item.href}`}
              aria-current="page"
            >
              {item.label}
            </a>
          ) : (
            <a
              class="inline-block rounded-md px-3 py-1.5 text-fg-muted no-underline hover:bg-surface hover:text-fg"
              href={`${basePath}${item.href}`}
            >
              {item.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  </nav>
);

const SearchForm = ({ basePath }: { basePath: string }) => (
  <form class="flex gap-2" role="search" action={`${basePath}search/`}>
    <label class="sr-only" for="site-search">
      Search patterns
    </label>
    <input
      class="rounded-md border border-line bg-bg px-3 py-1.5 forced-colors:border-[canvastext]"
      id="site-search"
      name="q"
      type="search"
      placeholder="Search"
    />
    <button
      class="rounded-md border border-line bg-surface px-3.5 py-1.5 forced-colors:border-[canvastext]"
      type="submit"
    >
      Go
    </button>
  </form>
);

/** Page header with the main navigation and an optional search form. */
export const Header = ({ basePath, currentPage, navItems, showSearch = false, variant = 'single-row' }: HeaderProps) =>
  variant === 'stacked' ? (
    <header class="border-b border-line forced-colors:border-[canvastext]">
      <div class="flex flex-wrap items-center justify-between gap-6 p-6">
        <Brand basePath={basePath} />
        {showSearch && <SearchForm basePath={basePath} />}
      </div>
      <MainNav
        basePath={basePath}
        currentPage={currentPage}
        navItems={navItems}
        listClass="flex flex-wrap gap-1 border-t border-line px-6 py-3 forced-colors:border-[canvastext]"
      />
    </header>
  ) : (
    <header class="flex flex-wrap items-center justify-between gap-6 border-b border-line p-6 forced-colors:border-[canvastext]">
      <Brand basePath={basePath} />
      <MainNav basePath={basePath} currentPage={currentPage} navItems={navItems} />
      {showSearch && <SearchForm basePath={basePath} />}
    </header>
  );
