import { PTag } from '@porsche-design-system/components-react/ssr';
import type { DependencyListProps } from '../props';

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
