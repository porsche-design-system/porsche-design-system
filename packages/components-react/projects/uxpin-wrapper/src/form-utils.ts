/**
 * Split a set of component "Props" into a tuple of 2 subsets, given an array of props names
 * Used to split form component props into "wrapper" and "dummy" props.
 */
export function partitionProps<InputProps extends { [key: string]: any }, SelectedProps extends { [key: string]: any }>(
  props: InputProps,
  selectedPropNames: (keyof SelectedProps)[]
) {
  type UnselectedProps = Omit<InputProps, keyof SelectedProps>;

  const selected = {} as SelectedProps;
  const unselected = {} as UnselectedProps;

  Object.entries(props).forEach(([key, value]) => {
    if (selectedPropNames.includes(key)) {
      selected[key as keyof SelectedProps] = value;
    } else {
      unselected[key as keyof UnselectedProps] = value;
    }
  });

  const result: [SelectedProps, UnselectedProps] = [selected, unselected];
  return result;
}

/**
 * Used to export the "Dummy" component props keys passing a `Record` instead of an array of strings
 * to ensure that no key is missing
 */
export function extractPropsKeys<T>(propsAsRecord: Record<keyof T, null>) {
  return Object.keys(propsAsRecord) as (keyof T)[];
}
