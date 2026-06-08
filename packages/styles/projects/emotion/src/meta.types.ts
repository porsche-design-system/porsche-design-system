export type MetaEntry = {
  name: string;
  value: string | number | readonly string[] | Record<string, unknown> | ((...args: any[]) => unknown);
  description: string;
  handWritten?: true;
};

export type Meta = {
  [key: string]: MetaEntry | { [key: string]: MetaEntry };
};
