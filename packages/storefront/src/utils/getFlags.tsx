import React from 'react';

export const getFlags = <
  T extends { isDeprecated?: boolean; isBreakpointCustomizable?: boolean; isExperimental?: boolean },
>(
  meta: T
): JSX.Element => {
  return (
    <>
      {meta.isDeprecated && (
        <span role="img" aria-label="deprecated">
          🚫
        </span>
      )}
      {meta.isBreakpointCustomizable && (
        <span role="img" aria-label="breakpoint customizable">
          🛠
        </span>
      )}
      {meta.isExperimental && (
        <span role="img" aria-label="experimental">
          🧪
        </span>
      )}
    </>
  );
};
