import type { LibraryHandlerData } from './library-handler';

export type ComponentsManagerData = {
  [version: string]: LibraryHandlerData;
};
