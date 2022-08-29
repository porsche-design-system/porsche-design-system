/**
 * Split a set of component "Props" into a tuple of 2 subsets, given an array of props names
 * Used to split form component props into "wrapper" and "dummy" props.
 */
export function partitionProps<WrapperProps extends { [key: string]: any }, DummyProps extends { [key: string]: any }>(
  props: WrapperProps & DummyProps,
  selectedPropNames: (keyof DummyProps)[]
): [WrapperProps, DummyProps] {
  const dummyProps = {} as DummyProps;
  const wrapperProps = {} as WrapperProps;

  Object.entries(props).forEach(([key, value]) => {
    if (selectedPropNames.includes(key)) {
      dummyProps[key as keyof DummyProps] = value;
    } else {
      wrapperProps[key as keyof WrapperProps] = value;
    }
  });

  return [wrapperProps, dummyProps];
}

/**
 * Used to export the "Dummy" component props keys passing a `Record` instead of an array of strings
 * to ensure that no key is missing
 */
export function extractPropsKeys<T>(propsAsRecord: Record<keyof T, null>) {
  return Object.keys(propsAsRecord) as (keyof T)[];
}
