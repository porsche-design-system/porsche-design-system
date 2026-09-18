import type { ComponentChildren } from 'preact';
import { Head } from '../_partials/Head.tsx';

export type OverviewPageProps = {
  title: string;
  description: string;
  /** First level heading of the page – the only heading the layout renders. */
  heading: string;
  /** One paragraph explaining what is listed below. */
  intro: string;
  /** The link lists, one `ExampleList` per category. */
  children: ComponentChildren;
};

/**
 * Shell of an overview page: the index of a generated project and the index of the source tree.
 *
 * It renders no header and no footer on purpose – that chrome is the subject of the examples, so repeating it here
 * would demonstrate nothing and would need URLs kept in sync for no benefit. What is left is a link list, which is
 * why the page is a `main` landmark and needs no skip link.
 */
export const OverviewPage = ({ title, description, heading, intro, children }: OverviewPageProps) => (
  <html lang="en">
    <head>
      <Head title={title} description={description} />
    </head>
    <body>
      <main id="main" class="flex max-w-2xl flex-col gap-12 p-fluid-md">
        <section>
          <h1 class="mb-6 text-4xl font-bold">{heading}</h1>
          <p>{intro}</p>
        </section>
        {children}
      </main>
      <script type="module" src="main.js" />
    </body>
  </html>
);
