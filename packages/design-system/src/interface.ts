export interface Pages {
  [category: string]: {
    [page: string]: any | any[];
  };
}

export interface StoriesWeb {
  [category: string]: {
    [story: string]: {
      design?: any | any[];
      code?: any | any[];
      props?: any | any[];
    };
  };
}

export interface StoriesApp {
  [category: string]: {
    [story: string]: any | any[];
  };
}

export type Tabs = 'design' | 'code' | 'props';
