export * from './algolia';
export * from './backgroundColor';
export * from './framework';
export * from './storefrontConfig';
export * from './theme';
export * from './dir';
export type {
  Project as StackBlitzProject,
  ProjectDependencies as StackBlitzProjectDependencies,
} from '@stackblitz/sdk';

import type { Project, OpenOptions } from '@stackblitz/sdk';

export type StackBlitzProjectAndOpenOptions = Project & OpenOptions;
