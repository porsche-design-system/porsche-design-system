/**
 * The first focusable element of every page.
 *
 * It lives in its own partial rather than inside `Header`, because a header is also showcased on its own as a
 * pattern – the skip link belongs to the page shell, not to the section being demonstrated.
 */
export const SkipLink = () => (
  <a
    class="absolute top-2 start-2 z-10 -translate-y-[200%] rounded-md border border-line bg-bg px-3 py-2 no-underline focus-visible:translate-y-0"
    href="#main"
  >
    Skip to content
  </a>
);
