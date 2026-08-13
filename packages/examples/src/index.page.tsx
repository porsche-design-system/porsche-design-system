import { BasePage } from './_layouts/BasePage.tsx';

/** Overview page – links to every pattern. */
const Page = () => (
  <BasePage
    basePath="./"
    title="Overview"
    description="Overview of the dummy JSX patterns."
    currentPage="overview"
    mainClass="max-w-2xl"
  >
    <h1 class="mb-6 text-4xl font-bold">Dummy patterns</h1>
    <p>Two templates sharing one layout and three partial components.</p>
    <ul class="mt-6 grid gap-2">
      <li>
        <a class="underline underline-offset-4" href="./landing-page/">
          Landing page
        </a>
      </li>
      <li>
        <a class="underline underline-offset-4" href="./contact-page/">
          Contact page
        </a>
      </li>
    </ul>
  </BasePage>
);

export default Page;
