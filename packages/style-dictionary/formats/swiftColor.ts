/**
 * This custom format creates an extension of the SwiftUI Color
 * class and adds all the color tokens as static variables so that
 * you can reference a color token like: `Color.backgroundPrimary`.
 *
 * @example
 * ```swift
 * Text("Hello, World!")
 *   .backgroundColor(Color.backgroundPrimary)
 *   .foregroundColor(Color.fontPrimary)
 * ```
 */
export const extendSwiftUIColor = ({ dictionary, options }) => {
  return (
    `import SwiftUI

class DarkModeDesignTokens {}
let bundle = Bundle(for: DarkModeDesignTokens.self)

extension Color {\n` +
    dictionary.allProperties
      .map((token) => {
        return `  public static var ${token.name}: Color {
    return Color.init("${token.name}", bundle: bundle)
  }`;
      })
      .join(`\n`) +
    `\n}`
  );
};
