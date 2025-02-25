import type { PartialLocation, PartialParam, Partials } from '@/models/partials';

export const getReactPartialExample = (name: Partials, location: PartialLocation, params: PartialParam[]) => {
  const partialImportPath = '@porsche-design-system/components-react/partials';
  const partialRequirePath = `require('${partialImportPath}').${name}`;
  const glue = '\n  ';
  return `<${location}>\n  ${params
    .map(({ value, comment }) =>
      [comment && `<!-- ${comment} -->`, `<%= ${partialRequirePath}(${value}) %>`].filter(Boolean).join(glue)
    )
    .join('\n\n  ')}\n</${location}>`;
};
