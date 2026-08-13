import type { ExampleItem } from '../_data.ts';

type ExampleListProps = {
  /** Prepended to every `href`, so the same list works from the root and from a category page. */
  basePath: string;
  items: ExampleItem[];
};

/** Linked list of templates or patterns, used by the overview pages. */
export const ExampleList = ({ basePath, items }: ExampleListProps) => (
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
);
