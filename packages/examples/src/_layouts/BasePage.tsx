import type { ComponentChildren } from 'preact';
import { type NavItem, navItems } from '../_data.ts';
import { Footer } from '../_partials/footer/Footer.tsx';
import { Head } from '../_partials/Head.tsx';
import { Header, type HeaderVariant } from '../_partials/header/Header.tsx';

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
 * It references no script: the build moves the `<Script>` elements of the page into a generated `main.js` and links
 * that entry, which also imports the page's `style.css`.
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
      <Header currentPage={currentPage} navItems={pageNavItems} showSearch={showSearch} variant={headerVariant} />
      {children}
      <Footer />
    </body>
  </html>
);
