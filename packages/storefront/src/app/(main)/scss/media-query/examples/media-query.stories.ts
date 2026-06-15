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
            className: `xs:after:content-['@include_media-query-min("xs")'] sm:after:content-['@include_media-query-min("sm")'] md:after:content-['@include_media-query-min("md")'] lg:after:content-['@include_media-query-min("lg")'] xl:after:content-['@include_media-query-min("xl")'] 2xl:after:content-['@include_media-query-min("2xl"))']`,
          },
          children: ['Media Query Min: '],
        },
        {
          tag: 'p',
          properties: {
            className: `max-xs:after:content-['@include_media-query-max("xs")'] max-sm:after:content-['@include_media-query-max("sm")'] max-md:after:content-['@include_media-query-max("md")'] max-lg:after:content-['@include_media-query-max("lg")'] max-xl:after:content-['@include_media-query-max("xl")'] max–2xl:after:content-['@include_media-query-max("2xl")']`,
          },
          children: ['Media Query Max: '],
        },
        {
          tag: 'p',
          properties: {
            className: `xs:max-sm:after:content-['@include_media-query-min-max("xs",_"sm")'] sm:max-md:after:content-['@include_media-query-min-max("sm",_"md")'] md:max-lg:after:content-['@include_media-query-min-max("md",_"lg")'] lg:max-xl:after:content-['@include_media-query-min-max("lg",_"xl")'] xl:max-2xl:after:content-['@include_media-query-min-max("xl",_"2xl")']`,
          },
          children: ['Media Query Min Max: '],
        },
      ],
    },
  ],
};
