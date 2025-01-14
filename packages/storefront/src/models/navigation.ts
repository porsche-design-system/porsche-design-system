export type StorefrontNavigationTabPage = { [tab: string]: string };

export type StorefrontNavigationPage = {
  [page: string]: string | StorefrontNavigationTabPage;
};

export type StorefrontNavigation = {
  [category: string]: StorefrontNavigationPage;
};
