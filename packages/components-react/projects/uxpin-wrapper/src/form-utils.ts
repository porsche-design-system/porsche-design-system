/**
 * Split a set of component "Props" into 2 subsets, given an array of props names
 * Used to split form component props into "wrapper" and "dummy" props.
 */
export function partitionProps<T extends { [key: string]: any }>(props: T, selectedPropNames: string[]) {
  const selected = {} as T;
  const unselected = {} as T;
  Object.entries(props).forEach(([key, value]) => {
    if (selectedPropNames.includes(key)) {
      selected[key as keyof T] = value;
    } else {
      unselected[key as keyof T] = value;
    }
  });
  return [selected, unselected];
}

/**
 * Used to export the "Dummy" component props keys passing a `Record` instead of an array of strings
 * to ensure that no key is missing
 */
export function extractPropsKeys<T>(propsAsRecord: Record<keyof T, null>) {
  return Object.keys(propsAsRecord);
}
