export type EmotionMetaEntry = {
  name: string;
  description: string;
  value: string | number | readonly unknown[] | Record<string, unknown> | ((...args: any[]) => unknown);
  deprecated?: boolean;
};

export type EmotionMeta = {
  [key: string]: EmotionMetaEntry | { [key: string]: EmotionMetaEntry };
};
