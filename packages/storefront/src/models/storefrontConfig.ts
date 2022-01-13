import { Component, EsModule } from 'vue/types/options';

export type StorefrontConfigTabPage = { [tab: string]: StorefrontConfigPage };

export type StorefrontConfigPages = {
  [page: string]: StorefrontConfigTabPage | StorefrontConfigPage;
};

export type StorefrontConfig = {
  [category: string]: StorefrontConfigPages;
};

export type StorefrontConfigPageImport = () => Promise<EsModule<Component>>;
export type StorefrontConfigPage = Array<StorefrontConfigPageImport>;
