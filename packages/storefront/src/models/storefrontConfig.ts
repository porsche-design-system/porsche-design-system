import { EsModuleComponent } from 'vue/types/options';

export type StorefrontConfig = {
  [category: string]: {
    [page: string]:
      | {
          [tab: string]: ComponentListImport;
        }
      | ComponentListImport;
  };
};

export type ComponentListImport = Array<() => Promise<EsModuleComponent>>;
