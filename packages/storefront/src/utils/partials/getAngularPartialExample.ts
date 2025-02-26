import type { PartialCall, PartialLocation, Partials } from '@/models/partials';
import { formatPartialParams } from '@/utils/partials/formatPartialParams';

export const getAngularPartialExample = (name: Partials, location: PartialLocation, partialCalls: PartialCall[]) => {
  const partialImportPath = '@porsche-design-system/components-angular/partials';
  const glue = '\n  ';

  const angularPartials = partialCalls
    .map(({ comment, params }, i) => {
      return [
        comment && `// ${comment}`,
        `${i === 0 ? 'let ' : ''}partialContent = ${name}({ ${formatPartialParams(params)} });`,
      ]
        .filter(Boolean)
        .join(glue);
    })
    .join('\n\n  ');
  return `<!-- prerequisite -->
<!-- docs: https://github.com/just-jeb/angular-builders/tree/master/packages/custom-webpack#index-transform -->
yarn add --dev @angular-builders/custom-webpack

<!-- angular.json -->
...
"architect": {
  "build": {
-   "builder": "@angular-devkit/build-angular:browser",
+   "builder": "@angular-builders/custom-webpack:browser",
    "options": {
      "outputPath": "dist/components-angular",
+     "indexTransform": "./scripts/injectPartials.ts",
    }
  }
  "serve": {
-   "builder": "@angular-devkit/build-angular:dev-server",
+   "builder": "@angular-builders/custom-webpack:dev-server",

<!-- ./scripts/injectPartials.ts -->
import type { TargetOptions } from '@angular-builders/custom-webpack';
import { ${name} } from '${partialImportPath}';

export default (targetOptions: TargetOptions, indexHtml: string): string => {
  ${angularPartials}

  return indexHtml.replace(/<\\/${location}>/, \`\${partialContent}$&\`);
};`;
};
