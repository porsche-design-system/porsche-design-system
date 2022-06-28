/**
 * This custom format creates an extension of the SwiftUI Image
 * class and adds all the image tokens as static variables so that
 * you can reference an image like: `Image.logo`.
 *
 * @example
 * ```swift
 * Image.logo
 * ```
 */
export const extendSwiftUIImage = ({ dictionary, options }) => {
  return (
    `import SwiftUI

extension Image {\n` +
    dictionary.allProperties
      .map((token) => {
        return `  public static var ${token.name}: Image {
    return Image.init("${token.name}", bundle: bundle)
  }`;
      })
      .join(`\n`) +
    `\n};`
  );
};
