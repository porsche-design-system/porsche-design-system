import type { EventMeta, PropMeta } from '@porsche-design-system/component-meta';
import type { ReactNode } from 'react';

// TODO: Refactor to use TSX instead of string
export const formatHtml = (input: string): string => {
  return input.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
};

// TODO: Refactor to use TSX instead of string
export const formatDescription = (meta: PropMeta | EventMeta): string => {
  return (
    meta.description
      ?.replace(/@(deprecated|experimental)/, '<strong class="deprecated">$1</strong>') // deprecated and experimental annotations
      .replace(/`(.+?)`/g, (_, g1) => `<code>${formatHtml(g1)}</code>`) || '' // prop references in backticks
  );
};

// TODO: Refactor to use TSX instead of string
export const wrapInCodeTag = (input: string): string => `<code>${formatHtml(input)}</code>`;

// TODO: Refactor to use TSX instead of string
export const formatPropType = (meta: PropMeta): string => {
  if (Array.isArray(meta.allowedValues) || meta.isBreakpointCustomizable) {
    return (
      [
        ...(meta.type.includes('|')
          ? [] // inline union type is taken care of via allowedValues
          : [
              meta.type !== 'string' && meta.type !== 'number' && meta.type !== 'boolean'
                ? `type ${meta.type} =` // literal types, etc.
                : meta.type, // simple type
            ]),
        ...(Array.isArray(meta.allowedValues)
          ? meta.allowedValues.map((val) => {
              let newVal: string;
              if (val === 'string' || val === 'number') {
                newVal = val; // `string` and `number` types are fine
              } else if (val === null) {
                newVal = 'undefined'; // `null` isn't allowed as part of validateProps, but `undefined` is
              } else if (typeof val === 'number') {
                newVal = `${val}`; // numbers don't need string quotes, e.g. `1`, `911`
              } else {
                newVal = `'${val}'`; // everything else is a string value, e.g. `'start'` or `'16:9'`
              }

              const deprecatedIcon = meta.deprecatedValues?.includes(val) ? '<span title="deprecated"> 🚫</span>' : '';
              return wrapInCodeTag(newVal) + deprecatedIcon;
            })
          : []),
        ...(meta.isBreakpointCustomizable ? [`BreakpointCustomizable<${meta.type}>`] : []), // BreakpointCustomizable<T> generic type
      ]
        // allowedValues are already wrapped with code tag because of trailing deprecated icon, but others are not
        .map((item) => (item.match(/<code>.+?<\/code>/) ? item : wrapInCodeTag(item)))
        .join('<br>\n')
    );
  }

  if (meta.isAria || typeof meta.allowedValues === 'object') {
    // aria props
    return wrapInCodeTag(
      `type ${meta.type} = {
${Object.entries(meta.allowedValues as object)
  // possible values are output as string, even though actual types are more precise
  .map(([key, val]) => `&nbsp;&nbsp;'${key}'?: ${val};`)
  .join('\n')}
}`
    );
  }

  return wrapInCodeTag(meta.type); // all other cases
};

export const formatPropDefaultValue = (meta: PropMeta): ReactNode => {
  const getDefaultValue = () => {
    if (typeof meta.defaultValue === 'string') {
      return `'${meta.defaultValue}'`;
    }

    if (
      meta.defaultValue !== null &&
      (typeof meta.defaultValue === 'object' || typeof meta.defaultValue === 'boolean')
    ) {
      return JSON.stringify(meta.defaultValue).replace(/[{:,]/g, '$& ').replace(/}/g, ' $&');
    }

    return `${meta.defaultValue ?? 'undefined'}`;
  };

  return <code>{getDefaultValue()}</code>;
};

export const formatEventType = (meta: EventMeta): string => {
  // single code block with line breaks to avoid `|` via code::before pseudo element
  return wrapInCodeTag(
    [
      ...(meta.typeDetail
        ? [
            `type ${meta.type} = ${meta.typeDetail
              .replace(/[{;] /g, '$&\n&nbsp;&nbsp;') // make single line objects multi line
              .replace(/(.) }$/, '$1;\n}')}`, // add semi colon to last property and add new line
          ]
        : []),
      `CustomEvent<${meta.type}>`,
    ].join('\n')
  );
};
