// Shared markup transformations used by the React and Vue converters.
//
// All regular expressions in here are intentionally written without ambiguity between adjacent quantifiers
// (tag name vs. attribute section) to avoid polynomial backtracking (ReDoS) on untrusted markup.

// A tag name always starts with a letter, an optional attribute section is always separated by whitespace.
// `[A-Za-z][\w-]*` and `\s` are disjoint, therefore the regex can't backtrack between both parts.
const emptyTagRegExp = /(<(?<tag>[A-Za-z][\w-]*)(?:\s[^>]*)?)>\s*<\/\k<tag>>/g;

// `(?<!\/)` prevents matching already self-closing inputs like `<input type="text" />`
const inputTagRegExp = /(<input(?:\s[^>]*)?)(?<!\/)>/g;

/** Adds a closing slash to `<input>` tags, e.g. `<input type="text">` becomes `<input type="text" />`. */
export const transformInputsToSelfClosing = (markup: string): string => markup.replace(inputTagRegExp, '$1 />');

/** Transforms tags without children into self-closing tags, e.g. `<button></button>` becomes `<button />`. */
export const transformEmptyTagsToSelfClosing = (markup: string): string => markup.replace(emptyTagRegExp, '$1 />');
