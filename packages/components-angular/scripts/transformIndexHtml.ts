import type { TargetOptions } from '@angular-builders/custom-webpack';
import * as partials from '@porsche-design-system/components-angular/partials';
import { SKELETONS_ACTIVE } from '@porsche-design-system/shared';

export default (targetOptions: TargetOptions, indexHtml: string): string => {
  const partialContent = [
    // @ts-ignore
    partials.getInitialStyles({
      ...(SKELETONS_ACTIVE
        ? {
            skeletonTagNames: [
              'p-button',
              'p-button-pure',
              'p-checkbox-wrapper',
              'p-fieldset-wrapper',
              'p-link',
              'p-link-pure',
              'p-link-social',
              'p-radio-button-wrapper',
              'p-select-wrapper',
              'p-textarea-wrapper',
              'p-text-field-wrapper',
            ],
          }
        : {}),
    }),
    partials.getFontLinks({ weights: ['thin', 'regular', 'semi-bold', 'bold'] }),
  ].join('\n');

  indexHtml = indexHtml.replace(/(<\/head>)/, `\n${partialContent}$1`);
  console.log('injected partials');

  return indexHtml;
};
