import { EsModuleComponent } from 'vue/types/options';

export interface StorefrontConfig {
  [category: string]: {
    [page: string]: {
      [tab: string]: ComponentListImport;
    } | ComponentListImport;
  };
}

export type ComponentListImport = Array<() => Promise<EsModuleComponent>>;

export interface Pages {
  [category: string]: {
    [page: string]: {
      [tab: string]: ComponentListImport;
    } | ComponentListImport;
  };
}

export interface Stories {
  [category: string]: {
    [story: string]: {
      [tab: string]: ComponentListImport;
    } | ComponentListImport;
  };
}

