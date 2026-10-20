import type { ComponentChildren } from 'preact';
import type { ExampleMeta } from '../../lib/meta.ts';
import { Head } from '../_partials/Head.tsx';

export type TemplatePageProps = {
  /** The `meta` the page exports – its title and description are the ones of the document as well. */
  meta: ExampleMeta;
  /**
   * Classes of the `<html>` element. An application shell on `p-canvas` puts its color scheme here: the sidebars of a
   * canvas are rendered on top of the page, so a scheme set further down would not reach them.
   */
  class?: string;
  /**
   * The whole page, chrome included: a `Header`, the page's own `<main id="main">` and a `Footer` – or a `p-canvas`,
   * which brings the banner, the `main` landmark and the two `aside` landmarks itself, plus the dialogs belonging to it.
   */
  children: ComponentChildren;
};

/**
 * Shell of a template: a whole page, shown as it would be built.
 *
 * It writes nothing but the document around the page. The chrome is composed by the page from the same partials the
 * patterns use, so a marketing page renders `Header` and `Footer` and an application page renders `p-canvas` – and
 * neither of them carries the landmarks of the other.
 *
 * Like every other layout it references no script: the build moves the `<Script>` elements of the page into a generated
 * `main.js` and links that entry, which also imports the page's `style.css`.
 */
export const TemplatePage = ({ meta, class: className, children }: TemplatePageProps) => (
  <html lang="en" class={className}>
    <head>
      <Head title={meta.title} description={meta.description} />
    </head>
    <body>{children}</body>
  </html>
);
