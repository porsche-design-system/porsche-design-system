import { PTag } from '@porsche-design-system/components-react/ssr';

export type DependencyListProps = {
  /** Package specifiers with their version, e.g. `react@19`. */
  items: string[];
};

/**
 * The dependencies a guide is based on, rendered as a row of tags. In Markdown it is a list of inline code items.
 */
export const DependencyList = ({ items }: DependencyListProps) => {
  return (
    <div className="flex flex-wrap gap-static-sm my-fluid-sm">
      {items.map((item) => (
        <PTag key={item} compact={true} variant="info">
          {item}
        </PTag>
      ))}
    </div>
  );
};
