import postcss, { type Container } from 'postcss';

export const getCssObject = (cssString: string): object => containerToObject(postcss.parse(cssString));

const normalize = (value: string): string => value.replace(/\s+/g, ' ').trim();

const containerToObject = (container: Container): Record<string, any> => {
  const result: Record<string, any> = {};

  container.each((node) => {
    if (node.type === 'decl') {
      // postcss keeps `!important` in a separate flag; re-append it so values read `none !important`
      result[node.prop] = `${normalize(node.value)}${node.important ? ' !important' : ''}`;
    } else if (node.type === 'rule') {
      result[normalize(node.selector)] = containerToObject(node);
    } else if (node.type === 'atrule') {
      result[`@${node.name}${node.params.replace(/\s+/g, '')}`] = containerToObject(node);
    }
  });

  return result;
};
