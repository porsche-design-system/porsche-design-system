export const getFlags = <
  T extends { isDeprecated?: boolean; isBreakpointCustomizable?: boolean; isExperimental?: boolean },
>(
  meta: T
): string =>
  [meta.isDeprecated && ' 🚫', meta.isBreakpointCustomizable && ' 🛠', meta.isExperimental && ' 🧪']
    .filter(Boolean)
    .join('');
