import type { PartialLocation, PartialParam, Partials } from '@/models/partials';
import { constantCase } from 'change-case';

export const getVanillaJsPartialExample = (name: Partials, location: PartialLocation, params: PartialParam[]) => {
  const partialImportPath = '@porsche-design-system/components-js/partials';
  const glue = '\n  ';
  const placeholder = `PLACEHOLDER_${constantCase(name.replace('get', ''))}`;
  const partialRequirePath = `require('${partialImportPath}').${name}`;

  const jsPartials = params
    .map(({ value, comment }) => {
      const partialCall = `${partialRequirePath}(${value})`.replace(/'/g, '\\"'); // transform quotes
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
