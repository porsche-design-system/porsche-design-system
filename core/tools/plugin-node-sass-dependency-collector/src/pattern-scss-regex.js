class PatternScssRegex {
  static findCssClasses() {
    return /class\s*=\s*['"]{1}([^"']+)['"]{1}/gi;
  }

  static checkCssClassUsage(cssClass) {
    return new RegExp("\\." + cssClass + "\\s*[,:{]{1}", "gi");
  }

  static anyWhitespace() {
    return /\s+/;
  }
}

module.exports = PatternScssRegex;