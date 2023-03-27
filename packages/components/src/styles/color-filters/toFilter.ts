export const toFilter = (values: [number, number, number, number, number, number]): string =>
  `invert(${values[0]}%) sepia(${values[1]}%) saturate(${values[2]}%) hue-rotate(${values[3]}deg) brightness(${values[4]}%) contrast(${values[5]}%)`;
