const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const Logger = require('./console-logger');
const PatternScssRegex = require('./pattern-scss-regex');

class PatternScssCollector {

  constructor(patternlab, pattern, stylesheets, options) {

    this.packageName = require('../package.json').name;

    this.options = _.merge({
      verbose: true,
      exclude: [],
      order: []
    }, options);

    this.warnings = {
      SCSS_SOURCES_DID_NOT_MATCH_ORDER_RULES: {
        occurrence: 0,
        affected: []
      },
      CSS_CLASS_USED_IN_PATTERN_IS_NOT_DEFINED_IN_ANY_SCSS_FILE: {
        occurrence: 0,
        affected: []
      },
      CSS_CLASS_USED_IN_PATTERN_IS_DEFINED_IN_MORE_THAN_ONE_SCSS_FILE: {
        occurrence: 0,
        affected: {}
      }
    };

    let stylesheetsWithoutExcludedOnes = this.stylesheetsWithoutExcludedOnes(stylesheets);
    let renderedPatternMarkup = this.getRenderedPatternMarkup(pattern);
    let cssClassesFoundInPattern = this.getGroupMatches(renderedPatternMarkup, PatternScssRegex.findCssClasses());
    let cssClassList = this.getClassesList(cssClassesFoundInPattern);
    let cssImports = this.getCssImports(cssClassList, stylesheetsWithoutExcludedOnes);
    let orderedCssImports = this.getOrderedCssImports(cssImports);
    let formattedCssImports = this.getFormattedCssImports(orderedCssImports);
    let sassFileOutput = patternlab.config.paths.public.patterns + pattern.getPatternLink(patternlab, 'custom', '.scss');

    this.writeScssDependencies(formattedCssImports, sassFileOutput);
    this.doLogging();
  }

  doLogging() {
    if (this.options.verbose) {
      if (
        !this.warnings.SCSS_SOURCES_DID_NOT_MATCH_ORDER_RULES.occurrence &&
        !this.warnings.CSS_CLASS_USED_IN_PATTERN_IS_NOT_DEFINED_IN_ANY_SCSS_FILE.occurrence &&
        !this.warnings.CSS_CLASS_USED_IN_PATTERN_IS_DEFINED_IN_MORE_THAN_ONE_SCSS_FILE.occurrence
      ) {
        Logger.success(this.packageName + ': SCSS resources were resolved successfully');
      } else {
        if (this.warnings.SCSS_SOURCES_DID_NOT_MATCH_ORDER_RULES.occurrence) {
          Logger.warn(this.packageName + ': Some resolved SCSS file(s) did not match SCSS source order rules, please provide a proper "plugin-node-sass-dependency-collector.config.json" configuration file. Affected files are listed below:');
          Logger.progress('\t' + this.warnings.SCSS_SOURCES_DID_NOT_MATCH_ORDER_RULES.affected.join('\n\t'));
        }

        if (this.warnings.CSS_CLASS_USED_IN_PATTERN_IS_NOT_DEFINED_IN_ANY_SCSS_FILE.occurrence) {
          Logger.warn(this.packageName + ': Some CSS classes that are used in pattern are not defined in any SCSS file. Affected CSS classes are listed below:');
          Logger.progress('\t' + this.warnings.CSS_CLASS_USED_IN_PATTERN_IS_NOT_DEFINED_IN_ANY_SCSS_FILE.affected.join('\n\t'));
        }

        if (this.warnings.CSS_CLASS_USED_IN_PATTERN_IS_DEFINED_IN_MORE_THAN_ONE_SCSS_FILE.occurrence) {
          Logger.warn(this.packageName + ': Some CSS classes that are used in pattern are defined in more than one SCSS file.');

          _.forEach(this.warnings.CSS_CLASS_USED_IN_PATTERN_IS_DEFINED_IN_MORE_THAN_ONE_SCSS_FILE.affected, (cssSources, cssClass) => {
            Logger.warn('CSS class: "' + cssClass + '", is used in following files:');
            Logger.progress('\t' + cssSources.join('\n\t'));
          });
        }
      }
    }
  }

  writeScssDependencies(scssDependencies, filename) {
    fs.outputFileSync(filename, scssDependencies);
  }

  getOrderedCssImports(unorderedCssClassList, orderedCssClassList=[], i=0) {
    if (unorderedCssClassList.length > 0) {
      if (i < this.options.order.length) {
        let cssClassListWithoutReference = [];

        unorderedCssClassList.forEach((cssClassPath) => {
          if (new RegExp(this.options.order[i], 'i').test(cssClassPath)) {
            orderedCssClassList.push(cssClassPath);
          } else {
            cssClassListWithoutReference.push(cssClassPath);
          }
        });

        this.getOrderedCssImports(cssClassListWithoutReference, orderedCssClassList, i = i + 1);
      } else {
        unorderedCssClassList.forEach((cssClassPath) => {
          orderedCssClassList.push(cssClassPath);
        });

        this.warnings.SCSS_SOURCES_DID_NOT_MATCH_ORDER_RULES.occurrence++;
        this.warnings.SCSS_SOURCES_DID_NOT_MATCH_ORDER_RULES.affected = _.union(this.warnings.SCSS_SOURCES_DID_NOT_MATCH_ORDER_RULES.affected, unorderedCssClassList);
      }
    }

    return orderedCssClassList;
  }

  isCssClassUsedInStylesheet(cssClass, stylesheet) {
    return PatternScssRegex.checkCssClassUsage(cssClass).test(stylesheet);
  }

  stylesheetsWithoutExcludedOnes(stylesheets) {
    let data = [];

    stylesheets.forEach((stylesheet) => {
      if (!this.isScssFileIgnored(stylesheet.source)) {
        data.push(stylesheet);
      }
    });

    return data;
  }

  isScssFileIgnored(file) {
    let flag = false;
    this.options.exclude.forEach((exclude) => {
      if (new RegExp(exclude, 'i').test(file)) {
        flag = true;
      }
    });
    return flag;
  }

  getFormattedCssImports(cssClassList) {
    let cssImports = [];

    cssClassList.forEach((cssClassPath) => {
      if (cssClassPath.startsWith('./node_modules/')) {
        cssImports.push('@import \'' + cssClassPath.replace('./node_modules/', '~') + '\';');
      } else {
        cssImports.push('@import \'' + cssClassPath.replace('./', '~'+ require(path.resolve(process.cwd(), './package.json')).name +'/') + '\';');
      }
    });

    return cssImports.join("\n");
  }

  getCssImports(cssClassList, stylesheets) {
    let cssImports = [];

    cssClassList.forEach((cssClass) => {
      let sourcesFound = [];
      stylesheets.forEach((stylesheet) => {
        if (this.isCssClassUsedInStylesheet(cssClass, stylesheet.css)) {
          sourcesFound.push(stylesheet.source);
          cssImports.push(stylesheet.source);
        }
      });

      if (sourcesFound.length === 0) {
        this.warnings.CSS_CLASS_USED_IN_PATTERN_IS_NOT_DEFINED_IN_ANY_SCSS_FILE.occurrence++;
        this.warnings.CSS_CLASS_USED_IN_PATTERN_IS_NOT_DEFINED_IN_ANY_SCSS_FILE.affected.push(cssClass);
      } else if (sourcesFound.length > 1) {
        this.warnings.CSS_CLASS_USED_IN_PATTERN_IS_DEFINED_IN_MORE_THAN_ONE_SCSS_FILE.occurrence++;
        this.warnings.CSS_CLASS_USED_IN_PATTERN_IS_DEFINED_IN_MORE_THAN_ONE_SCSS_FILE.affected[cssClass] = sourcesFound;
      }
    });

    return _.uniq(cssImports);
  }

  getClassesList(cssClassesFoundInPattern) {
    let classList = [];

    cssClassesFoundInPattern.forEach((stringOfCssClasses) => {
      classList = _.concat(classList, stringOfCssClasses.split(PatternScssRegex.anyWhitespace()));
    });

    return _.uniq(_.compact(classList));
  }

  getRenderedPatternMarkup(pattern) {
    return pattern.patternPartialCode;
  }

  getGroupMatches(string, regex, index = 1) {
    let matches = [];
    let match;
    while (match = regex.exec(string)) {
      matches.push(match[index]);
    }
    return matches;
  }
}

module.exports = PatternScssCollector;
