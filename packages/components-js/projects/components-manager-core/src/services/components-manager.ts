import type { LibraryHandlerData } from './library-handler';

export type ComponentsManagerData = {
  [version: `${number}.${number}.${number}`]: LibraryHandlerData;
  cdn: string;
};
