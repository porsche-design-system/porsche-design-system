export const toFilter = (values: [number, number, number, number, number, number]): string =>
  `invert(${values[0]}%) sepia(${values[1]}%) saturate(${values[2]}%) hue-rotate(${values[3]}deg) brightness(${values[4]}%) contrast(${values[5]}%)`;

export const filterLightPrimary = toFilter([3, 7, 2930, 188, 91, 103]);
export const filterLightContrastLow = toFilter([93, 11, 36, 201, 89, 102]);
export const filterLightContrastMedium = toFilter([65, 6, 119, 187, 90, 92]);
export const filterLightContrastHigh = toFilter([40, 2, 686, 187, 80, 94]);
export const filterLightNotificationSuccess = toFilter([62, 61, 551, 86, 86, 80]);
export const filterLightNotificationWarning = toFilter([74, 91, 343, 348, 92, 86]);
export const filterLightNotificationError = toFilter([25, 62, 2003, 335, 100, 97]);
export const filterLightNotificationInfo = toFilter([31, 32, 5493, 216, 90, 107]);

export const filterDarkPrimary = toFilter([97, 55, 2840, 180, 114, 103]);
export const filterDarkContrastLow = toFilter([20, 7, 421, 202, 97, 82]);
export const filterDarkContrastMedium = toFilter([54, 4, 229, 187, 91, 84]);
export const filterDarkContrastHigh = toFilter([68, 6, 108, 187, 104, 88]);
export const filterDarkNotificationSuccess = toFilter([59, 22, 1342, 86, 96, 88]);
export const filterDarkNotificationWarning = toFilter([72, 94, 303, 354, 89, 94]);
export const filterDarkNotificationError = toFilter([28, 34, 3133, 333, 95, 100]);
export const filterDarkNotificationInfo = toFilter([31, 32, 5493, 216, 90, 107]);
