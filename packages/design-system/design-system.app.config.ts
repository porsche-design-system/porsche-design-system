export interface DesignSystemAppConfig {
  pages: Pages;
}

interface Pages {
  [category: string]: {
    [page: string]: any | any[];
  };
}

const empty = '';

export const config: DesignSystemAppConfig = {
  pages: {
    'Getting Started': {
      About: () => import(`@/pages/app/${empty}about.md`),
    },
  }
};
