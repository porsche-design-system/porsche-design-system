import type { ComponentChildren } from 'preact';
import { type NavItem, navItems } from '../_data.ts';
import { Footer } from '../_partials/footer/Footer.tsx';
import { Head } from '../_partials/Head.tsx';
import { Header, type HeaderVariant } from '../_partials/header/Header.tsx';
import { SkipLink } from '../_partials/SkipLink.tsx';

export type BasePageProps = {
  title: string;
  description: string;
  currentPage: string;
  showSearch?: boolean;
  /** Layout variation of the header – see the header patterns. */
  headerVariant?: HeaderVariant;
  /** Page level override of the shared navigation – the equivalent of the twins' `@props` / `{% set %}`. */
  navItems?: NavItem[];
  children: ComponentChildren;
};

/**
 * Page shell. Pages render this component and pass their content as children – the equivalent of template
 * inheritance in the twins, but with the props checked by the compiler.
 *
 * The only script a page references is `main.js`, generated next to it: it imports the page's `style.css` and the
 * behaviour the page needs, so the generated Vite project has exactly one entry per page.
 */
export const BasePage = ({
  title,
  description,
  currentPage,
  showSearch,
  headerVariant,
  navItems: pageNavItems = navItems,
  children,
}: BasePageProps) => (
  <html lang="en">
    <head>
      <Head title={title} description={description} />
    </head>
    <body>
      <SkipLink />
      <Header currentPage={currentPage} navItems={pageNavItems} showSearch={showSearch} variant={headerVariant} />
      {children}
      <Footer />
      <script type="module" src="main.js" />
    </body>
  </html>
);
