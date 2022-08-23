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
