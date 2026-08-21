import type { ComponentChildren } from 'preact';
import { Head } from '../_partials/Head.tsx';

export type CanvasPageProps = {
  title: string;
  description: string;
  /** The application shell itself – a `p-canvas` with its slots, plus the dialogs belonging to it. */
  children: ComponentChildren;
};

/**
 * Shell of an application page whose chrome is `p-canvas`.
 *
 * `BasePage` cannot be reused here: it ships the very `Header` and `Footer` a canvas replaces, so a page would carry
 * two navigations and two banner landmarks. What is left is the document around the component – `p-canvas` brings the
 * banner, the `main` landmark and the two `aside` landmarks itself, which is why this layout renders no landmark of
 * its own and the page below it starts at `<p-canvas>`.
 *
 * The color scheme classes sit on `<html>` rather than on an element inside it: the sidebars of a canvas are rendered
 * on top of the page, so a scheme set further down would not reach them. `bg-surface` is the background an application
 * shell sits on, and the page's scheme switch swaps the `scheme-*` class of the same element – see its `main.js`.
 *
 * Like every other layout it references one script, `main.js`, generated next to the page.
 */
export const CanvasPage = ({ title, description, children }: CanvasPageProps) => (
  <html lang="en" class="scheme-light-dark bg-surface">
    <head>
      <Head title={title} description={description} />
    </head>
    <body>
      {children}
      <script type="module" src="main.js" />
    </body>
  </html>
);
