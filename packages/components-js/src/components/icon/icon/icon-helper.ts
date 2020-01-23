export const isUrl = (str: string) => str.length > 0 && /(\/)/.test(str);

export const isStr = (val: any): val is string => typeof val === 'string';
