export const isUrl = (str: string): boolean => str?.length > 0 && /(\/)/.test(str);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isStr = (val: any): boolean => typeof val === 'string';
