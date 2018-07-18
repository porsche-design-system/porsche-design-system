var fs = require('fs'),
  readline = require('readline'),
  path = require("path"),
  sass = require('node-sass');

const iconSCSSFilePath = path.join(__dirname, '..', '..', 'core/ui-kit/src/modules/icon/icon.scss'),
  iconInputFilePath = path.join(__dirname, '..', '..', 'core/ui-kit/src/modules/icon/icon.css'),
  iconMapOutputFile = './src/lib/atoms/icon/iconMap.ts'


main()

function main(){
  parseSCSS(iconSCSSFilePath, iconInputFilePath)
  extractCSSclasses(iconInputFilePath,iconMapOutputFile)
}

/**
 * parses SCSS file to CSS file and creates/ overwrites CSS file by specified path
 * @param inputSCSSPath {String} Path to SCSS file which should be parsed (use path.join(__dirname, '..','pathto/style.css))
 * @param outputCSSPath {String} Path to CSS output file
 */
function parseSCSS(inputSCSSPath, outputCSSPath) {
  let inputSCSSFile = fs.readFileSync(inputSCSSPath).toString()

  var result = sass.renderSync({
    file: inputSCSSPath,
    data: inputSCSSFile,
    outputStyle: 'compressed',
    outFile: outputCSSPath
  })
  fs.writeFileSync(iconInputFilePath, result.css)
}

/**
 * Extracts the css classes and create output Enum for easy access in Angular Apps
 * @param inputCSSPath {String} Path to input CSS file
 * @param outputEnumTS {String} Path to output enum typescript file
 */
function extractCSSclasses(inputCSSPath, outputEnumTS) {
  let classMap = {}
  let rd = readline.createInterface({
    input: fs.createReadStream(inputCSSPath),
    console: false
  });

  rd.on('line', function (line) {
    if (line.includes('.') && line.includes('{') && line.includes(':')) {
      let startIndex = line.indexOf('.') + 1
      let endIndex = line.indexOf(':')
      let startIndexIcon = line.indexOf('--') + 2
      let attr = line.substring(startIndexIcon, endIndex).replace(/-/g, "_")
      if (!isNaN(attr[0])) attr = 'n' + attr
      classMap[attr.replace(/-/g, "_")] = 'icon ' + line.substring(startIndex, endIndex)
    }
  }).on('close', () => {
    writeFile(outputEnumTS, classMap)
    console.log('You successFully created ' + outputEnumTS + '\nHave a great day!');
    process.exit(0);
  });
}


/**
 * Write the enum line by line to a typescript file
 * @param outputEnumTS {String} Path to output enum typescript file
 * @param classMap {Object} Object containing css classes and belonging css attributes
 */
function writeFile(outputEnumTS,classMap) {
  fs.writeFileSync(outputEnumTS, 'export enum PuiIcon {' + Object.keys(classMap)[0] + "= '" + classMap[Object.keys(classMap)[0]] + "',", (err) => {
    if (err) throw err;
  });
  Object.keys(classMap).forEach(function (key, index) {
    if (index > 1) {
      fs.appendFileSync(outputEnumTS, Object.keys(classMap)[index] + "= '" + classMap[Object.keys(classMap)[index]] + "',", (err) => {
        if (err) throw err;
      });
    }
  })
  fs.appendFileSync(outputEnumTS, '}', (err) => {
    if (err) throw err;
  });
}

