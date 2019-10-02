export interface DesignSystemConfig {
  pages: Pages;
  stories: Stories;
}

export interface Pages {
  [category: string]: {
    [page: string]: (() => Promise<any>) | Array<(() => Promise<any>)>
  };
}

export interface Stories {
  [category: string]: {
    [story: string]: {
      [tab: string]: (() => Promise<any>) | Array<(() => Promise<any>)>
    } | Array<(() => Promise<any>)>
  };
}
