import type { PartialCall, PartialLocation, Partials } from '@/models/partials';
import { formatPartialParams } from '@/utils/partials/formatPartialParams';
import { constantCase } from 'change-case';

export const getVanillaJsPartialExample = (name: Partials, location: PartialLocation, partialCalls: PartialCall[]) => {
  const partialImportPath = '@porsche-design-system/components-js/partials';
  const glue = '\n  ';
  const placeholder = `PLACEHOLDER_${constantCase(name.replace('get', ''))}`;
  const partialRequirePath = `require('${partialImportPath}').${name}`;

  const jsPartials = partialCalls
    .map(({ comment, params }) => {
      const partialCall = `${partialRequirePath}({ ${formatPartialParams(params)} })`;
      return [
        comment && `<!-- ${comment} -->`,
        `"replace": "placeholder='<!--${placeholder}-->' && partial=$placeholder$(node -e 'console.log(${partialCall})') && regex=$placeholder'.*' && sed -i '' -E -e \\"s^$regex^$partial^\\" index.html"`,
      ]
        .filter(Boolean)
        .join(glue);
    })
    .join(glue);

  return `<!-- index.html -->
<${location}>
  <!--${placeholder}-->
</${location}>

<!-- package.json (tested on macOS, the script may need to be adjusted depending on the operating system used) -->
<!-- make sure to adjust the path to the index.html file -->
"scripts": {
  "prestart": "yarn replace",
  ${jsPartials}
}`;
};
