import type { CodeSample } from '@porsche-design-system/shared';
import type { ComponentType } from 'react';
import type { SlotStories, Story } from '@/models/story';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';

export type ComponentExampleMeta<Tag extends HTMLTagOrComponent> = {
  [x: string]: ExampleMeta<Tag>;
};

// Either a story or a manually created code sample can be used for an example
export type ExampleMeta<Tag extends HTMLTagOrComponent> = {
  name: string;
  description?: string | ComponentType;
  story?: Story<Tag>;
  slotStories?: SlotStories<Tag>;
  example?: CodeSample;
};
