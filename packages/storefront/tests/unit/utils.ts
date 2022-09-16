const replaceHashedLoaderScript = (markup: string): string => markup.replace(/porsche-design-system\.v\d+\.\d+\.\d+[-.].+\.js/, 'porsche-design-system.v0.0.0.js');
const replaceLoaderVersion = (markup: string): string => markup.replace(/['"]\d+\.\d+\.\d+(-.+\.\d+)?['"]/, '"0.0.0"');
export const cleanDynamicLoaderMarkup = (markup: string): string => replaceHashedLoaderScript(replaceLoaderVersion(markup));
