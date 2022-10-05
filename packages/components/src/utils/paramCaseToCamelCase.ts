export const paramCaseToCamelCase = (str: string): string => {
  return str.replace(/-(\w)/g, (_, group) => group.toUpperCase());
};
