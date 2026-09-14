import type { LibraryHandlerData } from './library-handler';

export type ComponentsManagerData = {
  [version: `${number}.${number}.${number}${`-rc.${number}` | ''}`]: LibraryHandlerData;
  cdn: {
    url: string;
    prefixes: string[]; // to not break older versions
  };
};
