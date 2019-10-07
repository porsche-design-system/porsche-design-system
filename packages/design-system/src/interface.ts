export interface DesignSystemConfig {
  pages: Pages;
  stories: Stories;
}

export interface Pages {
  [category: string]: {
    [page: string]: Array<(() => Promise<any>)>
  };
}

export interface Stories {
  [category: string]: {
    [story: string]: {
      [tab: string]: Array<(() => Promise<any>)>
    } | Array<(() => Promise<any>)>
  };
}
