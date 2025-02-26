import type { PartialCall, PartialLocation, Partials } from '@/models/partials';
import { formatPartialParams } from '@/utils/partials/formatPartialParams';

export const getReactPartialExample = (name: Partials, location: PartialLocation, partialCall: PartialCall[]) => {
  const partialImportPath = '@porsche-design-system/components-react/partials';
  const partialRequirePath = `require('${partialImportPath}').${name}`;
  const glue = '\n  ';
  return `<${location}>\n  ${partialCall
    .map(({ params, comment }) => {
      return [comment && `<!-- ${comment} -->`, `<%= ${partialRequirePath}({ ${formatPartialParams(params)} }) %>`]
        .filter(Boolean)
        .join(glue);
    })
    .join('\n\n  ')}\n</${location}>`;
};
