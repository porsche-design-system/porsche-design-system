import type { TargetOptions } from '@angular-builders/custom-webpack';
import * as partials from '@porsche-design-system/components-angular/partials';

export default (targetOptions: TargetOptions, indexHtml: string): string => {
  const partialContent = [
    partials.getInitialStyles(),
    partials.getFontLinks({ weights: ['thin', 'regular', 'semi-bold', 'bold'] }),
  ].join('\n');

  indexHtml = indexHtml.replace(/(<\/head>)/, `\n${partialContent}$1`);
  console.log('injected partials');

  return indexHtml;
};
