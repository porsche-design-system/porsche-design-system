import type { Deprecations } from '@porsche-design-system/shared/deprecation';
import type { DeprecationSource, SourceCategory } from '../types';

export const publishedSource = ({
  category,
  origin,
  reference,
  deprecations,
}: {
  category: SourceCategory;
  origin: DeprecationSource['origin'];
  reference: string;
  deprecations: Deprecations;
}): DeprecationSource => ({
  category,
  origin,
  entries: deprecations.map(({ usageKind, identifier, deprecation }) => ({
    id: `${usageKind}/${category}/${identifier}`,
    usageKind,
    source: category,
    identifier,
    ...(deprecation.note ? { message: deprecation.note } : {}),
    ...(deprecation.replacement ? { replacement: deprecation.replacement } : {}),
    reference,
  })),
  ...(deprecations.length === 0 ? { expectedEmpty: true as const } : {}),
});
