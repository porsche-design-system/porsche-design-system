export interface Pages {
  [category: string]: {
    [page: string]: any | any[];
  };
}

export interface Stories {
  [category: string]: {
    [story: string]: {
      design?: any | any[];
      code?: any | any[];
      props?: any | any[];
      vrt?: any | any[];
    };
  };
}
