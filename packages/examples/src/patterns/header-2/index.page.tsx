import { navItems } from '../../_data.ts';
import { PatternPage } from '../../_layouts/PatternPage.tsx';
import { Header } from '../../_partials/Header.tsx';

/** Header pattern – the `stacked` layout with search, demonstrating the same content in a second arrangement. */
const Page = () => (
  <PatternPage
    basePath="../../"
    title="Header 2"
    description="Brand and search on top, navigation on its own row below – the stacked header layout."
    beforeMain={
      <Header
        basePath="../../"
        currentPage="patterns"
        navItems={[...navItems, { id: 'patterns', href: 'patterns/', label: 'Patterns' }]}
        showSearch
        variant="stacked"
      />
    }
  >
    <ul class="max-w-2xl list-disc ps-6 text-fg-muted">
      <li>Same markup semantics as Header&nbsp;1 – only the arrangement differs.</li>
      <li>The search form keeps its visually hidden label, so it is announced without a caption on screen.</li>
      <li>The navigation row separates itself with a border that survives forced colors.</li>
    </ul>
  </PatternPage>
);

export default Page;
