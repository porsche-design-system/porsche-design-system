import SwiftUI

class DarkModeDesignTokens {}
let bundle = Bundle(for: DarkModeDesignTokens.self)

extension Color {
  public static var brand: Color {
    return Color.init("brand", bundle: bundle)
  }
  public static var base: Color {
    return Color.init("base", bundle: bundle)
  }
  public static var backgroundBase: Color {
    return Color.init("backgroundBase", bundle: bundle)
  }
  public static var backgroundSurface: Color {
    return Color.init("backgroundSurface", bundle: bundle)
  }
  public static var backgroundShading: Color {
    return Color.init("backgroundShading", bundle: bundle)
  }
  public static var contrastHigh: Color {
    return Color.init("contrastHigh", bundle: bundle)
  }
  public static var contrastMedium: Color {
    return Color.init("contrastMedium", bundle: bundle)
  }
  public static var contrastLow: Color {
    return Color.init("contrastLow", bundle: bundle)
  }
  public static var notificationSuccess: Color {
    return Color.init("notificationSuccess", bundle: bundle)
  }
  public static var notificationSuccessSoft: Color {
    return Color.init("notificationSuccessSoft", bundle: bundle)
  }
  public static var notificationWarning: Color {
    return Color.init("notificationWarning", bundle: bundle)
  }
  public static var notificationWarningSoft: Color {
    return Color.init("notificationWarningSoft", bundle: bundle)
  }
  public static var notificationError: Color {
    return Color.init("notificationError", bundle: bundle)
  }
  public static var notificationErrorSoft: Color {
    return Color.init("notificationErrorSoft", bundle: bundle)
  }
  public static var notificationNeutral: Color {
    return Color.init("notificationNeutral", bundle: bundle)
  }
  public static var notificationNeutralSoft: Color {
    return Color.init("notificationNeutralSoft", bundle: bundle)
  }
  public static var stateHover: Color {
    return Color.init("stateHover", bundle: bundle)
  }
  public static var stateActive: Color {
    return Color.init("stateActive", bundle: bundle)
  }
  public static var stateFocus: Color {
    return Color.init("stateFocus", bundle: bundle)
  }
  public static var stateDisabled: Color {
    return Color.init("stateDisabled", bundle: bundle)
  }
}