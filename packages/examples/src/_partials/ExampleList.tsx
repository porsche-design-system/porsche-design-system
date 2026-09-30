/** An example, listed on the overview of the dev server – the one list whose `href` is a real URL. */
export type ExampleItem = {
  /** Key of the entry in the list. */
  id: string;
  /** Relative to the root of the category, which `basePath` prepends. */
  href: string;
  label: string;
  /** One sentence, shown next to the link on the overview page. */
  description: string;
};

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
          <p class="text-contrast-medium">{item.description}</p>
        </li>
      ))}
    </ul>
  </nav>
);
