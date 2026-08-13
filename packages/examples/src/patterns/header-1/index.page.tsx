import { navItems } from '../../_data.ts';
import { PatternPage } from '../../_layouts/PatternPage.tsx';
import { Header } from '../../_partials/Header.tsx';

/** Header pattern – the default `single-row` layout, shown in its real place at the top of the page. */
const Page = () => (
  <PatternPage
    basePath="../../"
    title="Header 1"
    description="Brand, navigation and search on a single row – the default header layout."
    beforeMain={<Header currentPage="home" navItems={navItems} />}
  >
    <ul class="max-w-2xl list-disc ps-6 text-fg-muted">
      <li>One row, wrapping onto the next line on narrow viewports instead of collapsing into a menu.</li>
      <li>The active navigation item is the only one carrying an aria-current attribute.</li>
      <li>The search form is opt-in and hidden here; Header&nbsp;2 shows it.</li>
    </ul>
  </PatternPage>
);

export default Page;
