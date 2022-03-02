import type { TargetOptions } from '@angular-builders/custom-webpack';
import * as partials from '@porsche-design-system/components-angular/partials';

export default (targetOptions: TargetOptions, indexHtml: string): string => {
  const partialContent = [
    partials.getInitialStyles({
      skeletonTagNames: [
        'p-button',
        'p-button-pure',
        'p-checkbox-wrapper',
        'p-headline',
        'p-fieldset-wrapper',
        'p-link',
        'p-link-pure',
        'p-radio-button-wrapper',
        'p-select-wrapper',
        'p-text',
        'p-text-list',
        'p-text-list-item',
        'p-textarea-wrapper',
        'p-text-field-wrapper',
      ],
    }),
    partials.getFontLinks({ weights: ['thin', 'regular', 'semi-bold', 'bold'] }),
  ].join('\n');

  indexHtml = indexHtml.replace(/(<\/head>)/, `\n${partialContent}$1`);
  console.log('injected partials');

  return indexHtml;
};
