export * from './algolia';
export * from './backgroundColor';
export * from './framework';
export * from './storefrontConfig';
export * from './theme';
export type {
  Project as StackBlitzProject,
  OpenOptions as StackBlitzOpenOptions,
  ProjectDependencies as StackBlitzProjectDependencies,
} from '@stackblitz/sdk';

import type { Project, OpenOptions } from '@stackblitz/sdk';

export type StackBlitzProjectAndOpenOptions = Project & OpenOptions;
