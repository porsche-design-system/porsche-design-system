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
            className: `xs:after:content-['[getMediaQueryMin("xs")]'] sm:after:content-['[getMediaQueryMin("sm")]'] md:after:content-['[getMediaQueryMin("md")]'] lg:after:content-['[getMediaQueryMin("lg")]'] xl:after:content-['[getMediaQueryMin("xl")]'] 2xl:after:content-['[getMediaQueryMin("2xl")]']`,
          },
          children: ['Media Query Min: '],
        },
        {
          tag: 'p',
          properties: {
            className: `max-xs:after:content-['[getMediaQueryMax("xs")]'] max-sm:after:content-['[getMediaQueryMax("sm")]'] max-md:after:content-['[getMediaQueryMax("md")]'] max-lg:after:content-['[getMediaQueryMax("lg")]'] max-xl:after:content-['[getMediaQueryMax("xl")]'] max–2xl:after:content-['[getMediaQueryMax("2xl")]']`,
          },
          children: ['Media Query Max: '],
        },
        {
          tag: 'p',
          properties: {
            className: `xs:max-sm:after:content-['[getMediaQueryMinMax("xs","sm")]'] sm:max-md:after:content-['[getMediaQueryMinMax("sm","md")]'] md:max-lg:after:content-['[getMediaQueryMinMax("md","lg")]'] lg:max-xl:after:content-['[getMediaQueryMinMax("lg","xl")]'] xl:max-2xl:after:content-['[getMediaQueryMinMax("xl","2xl")]']`,
          },
          children: ['Media Query Min Max: '],
        },
      ],
    },
  ],
};
