var fs = require('fs'),
  readline = require('readline');

const iconInputFile = './../../core/ui-kit/src/modules/icon/icon.css',
  iconMapOutputFile = './src/lib/atoms/icon/iconMap.ts'

let iconMap= {}

var rd = readline.createInterface({
  input: fs.createReadStream(iconInputFile),
//  output: process.stdout,
  console: false
});
var i = 0


  rd.on('line', function(line) {
    //console.log(line);
    i++
    if(line.includes('.') && line.includes('{')&& line.includes(':')){
      let startIndex = line.indexOf('.') +1
      let endIndex = line.indexOf(':')
      let startIndexIcon = line.indexOf('--') +2
      let attr = line.substring(startIndexIcon, endIndex).replace(/-/g, "_")
      if(!isNaN(attr[0])) attr = 'n'+attr
      iconMap[attr.replace(/-/g, "_")] = 'icon ' + line.substring(startIndex, endIndex)
    }
    //arr.push('['+i+']: '+line+i+'- --- -- ')
    // console.log('['+i+']: '+line+i+'- --- -- ')
  })
    .on('close', () => {
      console.log('Have a great day!');
      writeFile()
      process.exit(0);
    });

function writeFile(){
  fs.writeFileSync(iconMapOutputFile, 'export enum PuiIcon {'+ Object.keys(iconMap)[0] +"= '"+iconMap[Object.keys(iconMap)[0]] + "',", (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });
  Object.keys(iconMap).forEach(function (key, index) {
    if(index>1){
      fs.appendFileSync(iconMapOutputFile, Object.keys(iconMap)[index] +"= '"+iconMap[Object.keys(iconMap)[index]] + "',", (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    }
  })
  fs.appendFileSync(iconMapOutputFile, '}', (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });

}
function createObj(obj){
  Object.keys(obj).forEach(key,function(){

  })
}
