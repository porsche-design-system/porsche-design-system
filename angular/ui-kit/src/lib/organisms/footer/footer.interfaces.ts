export interface FooterMenuTree {
  [index: number]: {
    title: string;
    items: FooterMenuItem[];
  };
}

export interface FooterMenuItem {
  title: string;
  url: string;
}
