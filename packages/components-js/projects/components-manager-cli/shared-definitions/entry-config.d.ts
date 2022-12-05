type AdditionalEntryFile = {
  filePath: string;
  typingFilePath?: string;
};

export type CommonConfig = {
  version: string;
  additionalEntryFiles?: AdditionalEntryFile[];
  format?: 'umd' | 'iife' | 'esm';
};

export type EntryConfig = CommonConfig & {
  stylesUrl?: string;
  inlineStyles?: string;
  script: string;
  tempEntryPointFilePath: string;
};
