import type { ComponentChildren } from 'preact';
import { Head } from '../_partials/Head.tsx';

export type TemplatePageProps = {
  title: string;
  description: string;
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
export const TemplatePage = ({ title, description, class: className, children }: TemplatePageProps) => (
  <html lang="en" class={className}>
    <head>
      <Head title={title} description={description} />
    </head>
    <body>{children}</body>
  </html>
);
