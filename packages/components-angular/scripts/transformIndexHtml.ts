import type { TargetOptions } from '@angular-builders/custom-webpack';
import * as partials from '@porsche-design-system/components-angular/partials';

export default (targetOptions: TargetOptions, indexHtml: string): string => {
  const partialContent = [
    partials.getInitialStyles({ applyWithNormalizeStyles: true }),
    partials.getFontLinks({ weights: ['thin', 'regular', 'semi-bold', 'bold'] }),
    partials.getBrowserSupportFallbackScript(),
    partials.getCookiesFallbackScript(),
  ]
    .join('\n')
    .replace(/https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system/g, 'http://localhost:3001');

  indexHtml = indexHtml.replace(/(<\/head>)/, `\n${partialContent}$1`);
  console.log('injected partials');

  return indexHtml;
};
