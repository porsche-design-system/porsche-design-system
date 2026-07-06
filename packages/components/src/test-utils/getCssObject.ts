import { compile, type Element } from 'stylis';

// Build the nested object the css validators inspect by walking stylis's own AST of the (already
// fully resolved) stylesheet — format-agnostic, so it works on compact or pretty CSS and never
// breaks on whitespace. Rules become `{ 'selector': { prop: 'value' } }`, at-rule blocks become
// `{ '@media(...)': { 'selector': {...} } }`. Values keep ` !important` with a leading space to
// match the previous helper's output (validators assert on `!important$`).
const walk = (nodes: Element[]): Record<string, any> => {
  const obj: Record<string, any> = {};
  for (const node of nodes) {
    if (node.type === 'decl') {
      const prop = node.props as string;
      // node.value is `prop:value;` — drop `prop:` and the trailing `;`, keep ` !important`
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
