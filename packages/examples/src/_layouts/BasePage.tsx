import type { ComponentChildren } from 'preact';
import { type FooterNavItem, footerNavItems, type NavItem, navItems } from '../_data.ts';
import { Footer } from '../_partials/Footer.tsx';
import { Head } from '../_partials/Head.tsx';
import { Header, type HeaderVariant } from '../_partials/Header.tsx';
import { SkipLink } from '../_partials/SkipLink.tsx';

export type BasePageProps = {
  /** `"../../"` for `templates/<name>/index.page.tsx` – only the stylesheet URL is built from it. */
  basePath: string;
  title: string;
  description: string;
  currentPage: string;
  /** Utility classes for `<main>`; the element itself is styled globally in `assets/styles.css`. */
  mainClass?: string;
  showSearch?: boolean;
  /** Layout variation of the header – see the header patterns. */
  headerVariant?: HeaderVariant;
  /** Page level override of the shared navigation – the equivalent of the twins' `@props` / `{% set %}`. */
  navItems?: NavItem[];
  footerNavItems?: FooterNavItem[];
  /** Relative URL of an optional page script, loaded with `defer`. */
  pageScript?: string;
  children: ComponentChildren;
};

/**
 * Page shell. Pages render this component and pass their content as children – the equivalent of template
 * inheritance in the twins, but with the props checked by the compiler.
 */
export const BasePage = ({
  basePath,
  title,
  description,
  currentPage,
  mainClass,
  showSearch,
  headerVariant,
  navItems: pageNavItems = navItems,
  footerNavItems: pageFooterNavItems = footerNavItems,
  pageScript,
  children,
}: BasePageProps) => (
  <html lang="en">
    <head>
      <Head basePath={basePath} title={title} description={description} />
    </head>
    <body>
      <SkipLink />
      <Header currentPage={currentPage} navItems={pageNavItems} showSearch={showSearch} variant={headerVariant} />
      <main id="main" class={mainClass}>
        {children}
      </main>
      <Footer footerNavItems={pageFooterNavItems} />
      {pageScript && <script src={pageScript} defer />}
    </body>
  </html>
);
