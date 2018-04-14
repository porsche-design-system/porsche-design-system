const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const Logger = require('./console-logger');
const PatternScssRegex = require('./pattern-scss-regex');

class PatternScssCollector {

  constructor(patternlab, pattern, stylesheets, options) {

    this.options = _.merge({
      exclude: [],
      order: []
    }, options);

    let renderedPatternMarkup = this.getRenderedPatternMarkup(pattern);
    let cssClassesFoundInPattern = this.getGroupMatches(renderedPatternMarkup, PatternScssRegex.findCssClasses());
    let cssClassList = this.getClassesList(cssClassesFoundInPattern);
    let cssImports = this.getCssImports(cssClassList, stylesheets);
    let orderedCssImports = this.getOrderedCssImports(cssImports);
    let formattedCssImports = this.getFormattedCssImports(orderedCssImports);
    let sassFileOutput = patternlab.config.paths.public.patterns + pattern.getPatternLink(patternlab, 'custom', '.scss');

    this.writeScssDependencies(formattedCssImports, sassFileOutput);

    Logger.info('Pattern dependencies:\n'+ formattedCssImports);
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
        Logger.warn('WARNING: css source(s) of '+ this.options.stylesheetPackage +' didn\'t match order rules of plugin-node-sass-dependency-collector:\n\t>>> '+ unorderedCssClassList.join('\n\t>>> '));
      }
    }

    return orderedCssClassList;
  }

  isCssClassUsedInStylesheet(cssClass, stylesheet) {
    return PatternScssRegex.checkCssClassUsage(cssClass).test(stylesheet);
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
      let found = 0;
      stylesheets.forEach((stylesheet) => {
        if (!this.isScssFileIgnored(stylesheet.source) && this.isCssClassUsedInStylesheet(cssClass, stylesheet.css)) {
          found = found + 1;
          cssImports.push(stylesheet.source);
        }
      });

      if (found === 0) {
        Logger.warn('WARNING: css class that is used in pattern couldn\'t be found in '+ this.options.stylesheetPackage +' sources\n\t>>> ".'+ cssClass +'"');
      } else if (found > 1) {
        Logger.info('INFO: css class that is used in pattern was found '+ found +'x in '+ this.options.stylesheetPackage +' sources\n\t>>> ".'+ cssClass +'"');
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
