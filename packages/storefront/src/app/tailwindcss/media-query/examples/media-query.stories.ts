'use client';

import type { Story } from '@/models/story';

export const mediaQueryStory: Story<'div'> = {
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
            className:
              "xs:after:content-['.xs:'] sm:after:content-['.sm:'] md:after:content-['.md:'] lg:after:content-['.lg:'] xl:after:content-['.xl:'] 2xl:after:content-['.2xl:']",
          },
          children: ['Media Query Min: '],
        },
        {
          tag: 'p',
          properties: {
            className:
              "max-xs:after:content-['.max-xs:'] max-sm:after:content-['.max-sm:'] max-md:after:content-['.max-md:'] max-lg:after:content-['.max-lg:'] max-xl:after:content-['.max-xl:'] max–2xl:after:content-['.max-2xl:']",
          },
          children: ['Media Query Max: '],
        },
        {
          tag: 'p',
          properties: {
            className:
              "xs:max-sm:after:content-['.xs:max-sm:'] sm:max-md:after:content-['.sm:max-md:'] md:max-lg:after:content-['.md:max-lg:'] lg:max-xl:after:content-['.lg:max-xl:'] xl:max-2xl:after:content-['.xl:max-2xl:']",
          },
          children: ['Media Query Min Max: '],
        },
      ],
    },
  ],
};
