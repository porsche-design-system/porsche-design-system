export * from './algolia';
export * from './framework';
export * from './storefrontConfig';
export * from './theme';
export * from './colorScheme';
export type {
  Project as StackBlitzProject,
  OpenOptions as StackBlitzOpenOptions,
  ProjectDependencies as StackblitzProjectDependencies,
} from '@stackblitz/sdk';

import type { Project, OpenOptions } from '@stackblitz/sdk';

export type StackBlitzProjectAndOpenOptions = Project & OpenOptions;
