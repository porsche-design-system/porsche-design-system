export const escapeHashCharacter = (colorString: string): string => {
  return colorString.replace('#', '%23');
};
