'use client';

import type { Story } from '@/models/story';

export const mediaQueryScssStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md prose-text-sm',
      },
      children: [
        {
          tag: 'p',
          properties: {
            className: `xs:after:content-['@include_pds-media-query-min("xs")'] sm:after:content-['@include_pds-media-query-min("s")'] md:after:content-['@include_pds-media-query-min("m")'] lg:after:content-['@include_pds-media-query-min("l")'] xl:after:content-['@include_pds-media-query-min("xl")'] 2xl:after:content-['@include_pds-media-query-min("xxl"))']`,
          },
          children: ['Media Query Min: '],
        },
        {
          tag: 'p',
          properties: {
            className: `max-xs:after:content-['@include_pds-media-query-max("xs")'] max-sm:after:content-['@include_pds-media-query-max("s")'] max-md:after:content-['@include_pds-media-query-max("m")'] max-lg:after:content-['@include_pds-media-query-max("l")'] max-xl:after:content-['@include_pds-media-query-max("xl")'] max–2xl:after:content-['@include_pds-media-query-max("xxl")']`,
          },
          children: ['Media Query Max: '],
        },
        {
          tag: 'p',
          properties: {
            className: `xs:max-sm:after:content-['@include_pds-media-query-min-max("xs",_"s")'] sm:max-md:after:content-['@include_pds-media-query-min-max("s",_"m")'] md:max-lg:after:content-['@include_pds-media-query-min-max("m",_"l")'] lg:max-xl:after:content-['@include_pds-media-query-min-max("l",_"xl")'] xl:max-2xl:after:content-['@include_pds-media-query-min-max("xl",_"xxl")']`,
          },
          children: ['Media Query Min Max: '],
        },
      ],
    },
  ],
};
