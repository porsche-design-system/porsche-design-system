// should be used as param for Array.filter()
export const isAlreadyInArray = (
  value: string | number | boolean,
  index: number,
  array: (string | number | boolean)[]
): boolean => array.indexOf(value) === index;
