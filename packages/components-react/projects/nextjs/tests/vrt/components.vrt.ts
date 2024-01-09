import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';

const components = (TAG_NAMES as unknown as TagName[])
  .filter((tagName) => {
    // TODO: should not needed to be maintained like this, e.g. find a logic here with matching names or use/extend getComponentMeta() accordingly
    return !/item$|-table-|-select-wrapper-|multi-select-option$/.test(tagName);
  })
  .map((tagName) => {
    return tagName.substring(2);
  });
// Use for local testing
// .filter((tagName) => {
//   // TODO: how does this work? why slice it on every iteration?
//   const argv = process.argv.slice(5);
//   return !argv.length || argv.includes(tagName);
// });
