// should be used as param for Array.filter()
export const isAlreadyInArray = <T>(value: T, index: number, array: T[]): boolean => array.indexOf(value) === index;
