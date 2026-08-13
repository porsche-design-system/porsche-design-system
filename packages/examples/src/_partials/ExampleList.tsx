import type { ExampleItem } from '../_data.ts';

type ExampleListProps = {
  /** Prepended to every `href` – these are the real links of the package. */
  basePath: string;
  items: ExampleItem[];
  /** Accessible name of the navigation landmark, e.g. `"Templates"`. */
  label: string;
};

/** Linked list of templates or patterns, used by the overview page. */
export const ExampleList = ({ basePath, items, label }: ExampleListProps) => (
  <nav aria-label={label}>
    <ul class="grid gap-4">
      {items.map((item) => (
        <li key={item.id}>
          <a class="font-semibold underline underline-offset-4" href={`${basePath}${item.href}`}>
            {item.label}
          </a>
          <p class="text-fg-muted">{item.description}</p>
        </li>
      ))}
    </ul>
  </nav>
);
