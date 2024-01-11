export const validateCssAndMatchSnapshot = <T extends (...p: any[]) => string>(
  getComponentCss: T,
  ...args: Parameters<T>
) => {
  const css = getComponentCss(...args);
  // @ts-ignore
  expect(css).not.toHaveVisibleStyle();
  // @ts-ignore
  expect(css).not.toHaveDotSelector();
  expect(css).toMatchSnapshot();
};
