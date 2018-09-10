const fs = require('fs'),
  readline = require('readline'),
  path = require("path"),
  sass = require('node-sass');

const iconSCSSFilePath = path.join(__dirname, '..', '..', 'core/ui-kit/src/modules/icon/icon.scss'),
  iconInputFilePath = path.join(__dirname, '..', '..', 'core/ui-kit/src/modules/icon/icon.css'),
  iconMapOutputFile = './src/lib/atoms/icon/iconMap.ts';


main();
function main() {
  let map = parseSCSS(iconSCSSFilePath, iconInputFilePath);
  extractCSSclasses(map, iconMapOutputFile);
}

/**
 * parses SCSS file to CSS file and creates/ overwrites CSS file by specified path
 * @param inputSCSSPath {String} Path to SCSS file which should be parsed (use path.join(__dirname, '..','pathto/style.css))
 * @param outputCSSPath {String} Path to CSS output file
 * @return Object {Object}
 */
function parseSCSS(inputSCSSPath, outputCSSPath) {
  let inputSCSSFile = fs.readFileSync(inputSCSSPath).toString();

  let result = sass.renderSync({
    file: inputSCSSPath,
    data: inputSCSSFile,
    outputStyle: 'nested',
    outFile: outputCSSPath
  });

  return createMapFromString(result.css);
}

/**
 * Filters out the CSS classes of a String variable
 * @param {String} stringCSS
 * @return {object} map
 */
function createMapFromString(stringCSS){
  let re = new RegExp("(\\.(.{1}[\\w-_]+):)", "g");
  let matches = [];

  let map ={};
  while(matches=re.exec(stringCSS.toString())){
    let val = matches[2];
    let startIndexIcon = matches[2].indexOf('--') + 2;
    let attr = matches[2].substring(startIndexIcon).replace(/-/g, "_").toUpperCase();
    if(!isNaN(attr[0])) attr = 'N' + attr;
    map[attr] = val;
  }
  return map;
}

/**
 * Write the enum line by line to a typescript file
 * @param outputEnumTS {String} Path to output enum typescript file
 * @param classMap {Object} Object containing css classes and belonging css attributes
 */
function extractCSSclasses(classMap, outputEnumTS) {
  fs.writeFileSync(outputEnumTS, "export enum PuiIcon {" + Object.keys(classMap)[0] + "= '" + classMap[Object.keys(classMap)[0]] + "',", (err) => {
    if (err) throw err;
  });
  Object.keys(classMap).forEach(function (key, index) {
    if (index > 1) {
      fs.appendFileSync(outputEnumTS, Object.keys(classMap)[index] + "= '" + classMap[Object.keys(classMap)[index]] + "',", (err) => {
        if (err) throw err;
      });
    }
  });
  fs.appendFileSync(outputEnumTS, '}', (err) => {
    if (err) throw err;
  });
}

