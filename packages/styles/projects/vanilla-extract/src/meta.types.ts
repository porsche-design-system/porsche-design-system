export type MetaEntry = {
  name: string;
  description: string;
  value: string | number | readonly unknown[] | Record<string, unknown> | ((...args: any[]) => unknown);
  deprecated?: boolean;
};

export type Meta = {
  [key: string]: MetaEntry | { [key: string]: MetaEntry };
};
