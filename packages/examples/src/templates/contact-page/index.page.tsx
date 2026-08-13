import { BasePage } from '../../_layouts/BasePage.tsx';

/** Contact page – demonstrates a form pattern with an accessible status message. */
const Page = () => (
  <BasePage
    basePath="../../"
    title="Contact page"
    description="Dummy contact page template using the shared layout and partial components."
    currentPage="contact"
    pageScript="main.js"
  >
    <h1 class="mb-6 text-4xl font-bold">Contact us</h1>
    <p class="max-w-2xl text-fg-muted">The exact same header and footer as on the landing page – defined once.</p>

    <form class="mt-12 grid max-w-lg gap-6" id="contact-form" novalidate>
      <div class="grid gap-1.5">
        <label class="font-semibold" for="name">
          Name
        </label>
        <input
          class="rounded-lg border border-line bg-bg px-3 py-2.5"
          id="name"
          name="name"
          type="text"
          autocomplete="name"
          required
          aria-describedby="name-hint"
        />
        <p class="text-sm text-fg-muted" id="name-hint">
          As it should appear in our reply.
        </p>
      </div>

      <div class="grid gap-1.5">
        <label class="font-semibold" for="email">
          Email
        </label>
        <input
          class="rounded-lg border border-line bg-bg px-3 py-2.5"
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          required
        />
      </div>

      <div class="grid gap-1.5">
        <label class="font-semibold" for="message">
          Message
        </label>
        <textarea
          class="rounded-lg border border-line bg-bg px-3 py-2.5"
          id="message"
          name="message"
          rows={5}
          required
        />
      </div>

      <button
        class="justify-self-start rounded-full bg-fg px-6 py-3 font-semibold text-bg hover:opacity-85 forced-colors:border forced-colors:border-[buttontext]"
        type="submit"
      >
        Send message
      </button>
      <p class="font-semibold empty:hidden" id="form-status" role="status" aria-live="polite" />
    </form>
  </BasePage>
);

export default Page;
