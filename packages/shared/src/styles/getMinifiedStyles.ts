import type { Styles } from 'jss';
import jss from 'jss';
import preset from 'jss-preset-default';
// @ts-ignore
jss.setup({ ...preset(), createGenerateId: () => (rule: Rule) => rule.key });

export const getMinifiedStyles = (style: Styles): string => {
  return jss
    .createStyleSheet(style)
    .toString()
    .replace(/\\+/g, '') // remove backslashes
    .replace(/(media)\s/g, '$1') // remove space after media
    .replace(/;(?=\s+})/g, '') // remove semicolon before closing curly brace
    .replace(/\s(?={)/g, '') // remove space before opening curly brace
    .replace(/,\s/g, ',') // remove unneeded white space after comma separation
    .replace(/\s\s+/g, '') // remove white space
    .replace(/:\s(?=.*)/g, ':') // remove white space after colon
    .replace(/\n+/g, ''); // remove new line
};
// TODO: remove dot before colon
// TODO: sort props
