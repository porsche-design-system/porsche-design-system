import { PTag } from '@porsche-design-system/components-react/ssr';

type DependencyListProps = {
  /** Package specifiers with their version, e.g. `react@19`. */
  items: string[];
};

/** The dependencies a guide is based on, as a row of tags. */
export const DependencyList = ({ items }: DependencyListProps) => (
  <div className="flex flex-wrap gap-static-sm my-fluid-sm">
    {items.map((item) => (
      <PTag key={item} compact={true} variant="info">
        {item}
      </PTag>
    ))}
  </div>
);
