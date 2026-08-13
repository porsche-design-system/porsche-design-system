import type { FooterNavItem } from '../_data.ts';

type FooterProps = {
  /** Placeholder links – the footer demonstrates a secondary navigation, it does not provide one. */
  footerNavItems: FooterNavItem[];
};

/** Page footer with the secondary navigation. */
export const Footer = ({ footerNavItems }: FooterProps) => (
  <footer class="flex flex-wrap items-center justify-between gap-6 border-t border-line p-6 text-sm text-fg-muted forced-colors:border-[canvastext]">
    <p>© 2026 Dr. Ing. h.c. F. Porsche AG</p>
    <nav aria-label="Footer">
      <ul class="flex flex-wrap gap-1">
        {footerNavItems.map((item) => (
          <li key={item.label}>
            <a class="inline-block rounded-md px-3 py-1.5 no-underline hover:bg-surface hover:text-fg" href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </footer>
);
