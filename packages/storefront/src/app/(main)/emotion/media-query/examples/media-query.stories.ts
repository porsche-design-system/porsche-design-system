'use client';

import type { Story } from '@/models/story';

export const mediaQueryEmotionStory: Story<'div'> = {
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
            className: `xs:after:content-['[getMediaQueryMin("xs")]'] sm:after:content-['[getMediaQueryMin("s")]'] md:after:content-['[getMediaQueryMin("m")]'] lg:after:content-['[getMediaQueryMin("l")]'] xl:after:content-['[getMediaQueryMin("xl")]'] 2xl:after:content-['[getMediaQueryMin("xxl")]']`,
          },
          children: ['Media Query Min: '],
        },
        {
          tag: 'p',
          properties: {
            className: `max-xs:after:content-['[getMediaQueryMax("xs")]'] max-sm:after:content-['[getMediaQueryMax("s")]'] max-md:after:content-['[getMediaQueryMax("m")]'] max-lg:after:content-['[getMediaQueryMax("l")]'] max-xl:after:content-['[getMediaQueryMax("xl")]'] max–2xl:after:content-['[getMediaQueryMax("xxl")]']`,
          },
          children: ['Media Query Max: '],
        },
        {
          tag: 'p',
          properties: {
            className: `xs:max-sm:after:content-['[getMediaQueryMinMax("xs","s")]'] sm:max-md:after:content-['[getMediaQueryMinMax("s","m")]'] md:max-lg:after:content-['[getMediaQueryMinMax("m","l")]'] lg:max-xl:after:content-['[getMediaQueryMinMax("l","xl")]'] xl:max-2xl:after:content-['[getMediaQueryMinMax("xl","xxl")]']`,
          },
          children: ['Media Query Min Max: '],
        },
      ],
    },
  ],
};
