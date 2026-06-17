export type VanillaExtractMetaEntry = {
  name: string;
  description: string;
  value: string | number | readonly unknown[] | Record<string, unknown> | ((...args: any[]) => unknown);
  deprecated?: boolean;
};

export type VanillaExtractMeta = {
  [key: string]: VanillaExtractMetaEntry | { [key: string]: VanillaExtractMetaEntry };
};
