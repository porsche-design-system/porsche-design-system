'use client';

import { ICONS_MANIFEST } from '@porsche-design-system/assets';
import type { PIconProps } from '@porsche-design-system/components-react/ssr';
import type { Story } from '@porsche-design-system/story-generator';
import { capitalCase } from 'change-case';

export const iconStoryOverview: Story<'p-icon'> = {
  generator: () =>
    Object.keys(ICONS_MANIFEST).map((icon) => ({
      tag: 'p-icon',
      properties: { name: icon as PIconProps['name'], aria: { 'aria-label': `${capitalCase(icon)} icon` } },
    })),
};
