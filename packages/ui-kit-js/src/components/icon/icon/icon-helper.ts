export function getName(name: string | undefined) {
  if (typeof name !== 'string' || name.trim() === '') {
    return null;
  }

  if (name) {
    name = name
      .toLowerCase()
      .substring(name.lastIndexOf('/') + 1, name.lastIndexOf('.'))
      .replace(/\.[^/.]+$/, '')
      .replace(/[._]/g, '-');
  }

  // only allow alpha characters and dash
  const invalidChars = name.replace(/[a-z]|-|\d/gi, '');
  if (invalidChars !== '') {
    return null;
  }
  return name;
}

export const isUrl = (str: string) => str.length > 0 && /(\/)/.test(str);

export const isStr = (val: any): val is string => typeof val === 'string';
