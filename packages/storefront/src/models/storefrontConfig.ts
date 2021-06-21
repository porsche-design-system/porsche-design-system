import { Component, EsModule } from 'vue/types/options';

export type StorefrontConfig = {
  [category: string]: {
    [page: string]:
      | {
          [tab: string]: ComponentListImport;
        }
      | ComponentListImport;
  };
};

export type ComponentListImport = Array<() => Promise<EsModule<Component>>>;
