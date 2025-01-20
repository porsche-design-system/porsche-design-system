export const getFlags = <
  T extends { isDeprecated?: boolean; isBreakpointCustomizable?: boolean; isExperimental?: boolean },
>(
  meta: T
): JSX.Element => {
  return (
    <>
      {meta.isDeprecated && <span title="deprecated">🚫</span>}
      {meta.isBreakpointCustomizable && <span title="breakpoint-customizable">🛠</span>}
      {meta.isExperimental && <span title="experimental">🧪</span>}
    </>
  );
};
