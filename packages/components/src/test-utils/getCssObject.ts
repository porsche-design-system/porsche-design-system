import { compile, type Element } from 'stylis';

// Test helper: turns a CSS string into a plain nested object so tests can assert on it
// instead of comparing raw CSS text. Example:
//   ":host{display:block}" -> { ':host': { display: 'block' } }
// Works by using stylis to parse the CSS, then walking the result.
const walk = (nodes: Element[]): Record<string, any> => {
  const obj: Record<string, any> = {};
  for (const node of nodes) {
    if (node.type === 'decl') {
      // node.value looks like "display:block;" — strip the property name and the ";"
      const prop = node.props as string;
      obj[prop] = node.value.slice(prop.length + 1, -1).replace(/!important/, ' !important');
    } else if (node.type === 'rule') {
      obj[(node.props as string[]).join(', ')] = walk(node.children as Element[]);
    } else if (node.type.startsWith('@') && Array.isArray(node.children)) {
      obj[node.value] = walk(node.children as Element[]);
    }
  }
  return obj;
};

export const getCssObject = (cssString: string): object => walk(compile(cssString));
