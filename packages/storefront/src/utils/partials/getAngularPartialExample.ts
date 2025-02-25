import type { PartialLocation, PartialParam, Partials } from '@/models/partials';

export const getAngularPartialExample = (name: Partials, location: PartialLocation, params: PartialParam[]) => {
  const partialImportPath = '@porsche-design-system/components-angular/partials';
  const glue = '\n  ';

  const angularPartials = params
    .map(({ value, comment }, i) =>
      [comment && `// ${comment}`, `${i === 0 ? 'let ' : ''}partialContent = ${name}(${value});`]
        .filter(Boolean)
        .join(glue)
    )
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
