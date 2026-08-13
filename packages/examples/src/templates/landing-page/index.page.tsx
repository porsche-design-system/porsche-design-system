import { navItems } from '../../_data.ts';
import { BasePage } from '../../_layouts/BasePage.tsx';

/** Landing page – demonstrates overriding the shared navigation with a page level list. */
const Page = () => (
  <BasePage
    basePath="../../"
    title="Landing page"
    description="Dummy landing page template using the shared layout and partial components."
    currentPage="landing"
    mainClass="flex flex-col gap-12"
    showSearch
    navItems={[...navItems, { id: 'landing-features', href: 'templates/landing-page/#features', label: 'Features' }]}
  >
    <section class="max-w-2xl">
      <h1 class="mb-6 text-[clamp(2rem,5vw,3.5rem)]/[1.1] font-bold">Build once, reuse everywhere</h1>
      <p>
        This page is written as a component and rendered to plain HTML at build time, so the generated markup contains
        no template syntax and no framework runtime.
      </p>
      <a
        class="mt-6 inline-block rounded-full bg-fg px-6 py-3 font-semibold text-bg no-underline hover:opacity-85 forced-colors:border forced-colors:border-[buttontext]"
        href="../contact-page/"
      >
        Get in touch
      </a>
    </section>

    <section id="features">
      <h2 class="mb-6 text-3xl font-semibold">What you get</h2>
      <ul class="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-6">
        <li class="rounded-2xl border border-line p-6">
          <h3 class="mb-2 text-lg font-semibold">Shared chrome</h3>
          <p class="text-fg-muted">Header and footer are components, rendered into every page by one layout.</p>
        </li>
        <li class="rounded-2xl border border-line p-6">
          <h3 class="mb-2 text-lg font-semibold">Clean output</h3>
          <p class="text-fg-muted">The build only renders components and copies assets – no hashing, no bundling.</p>
        </li>
        <li class="rounded-2xl border border-line p-6">
          <h3 class="mb-2 text-lg font-semibold">Copy &amp; paste</h3>
          <p class="text-fg-muted">Every page works standalone, which keeps the documentation examples honest.</p>
        </li>
      </ul>
    </section>

    <section id="legal-notice" class="max-w-2xl">
      <h2 class="mb-2 text-3xl font-semibold">Legal notice</h2>
      <p>Dummy content for the footer link target.</p>
    </section>

    <section id="privacy-policy" class="max-w-2xl">
      <h2 class="mb-2 text-3xl font-semibold">Privacy policy</h2>
      <p>Dummy content for the footer link target.</p>
    </section>
  </BasePage>
);

export default Page;
