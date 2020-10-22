import * as fs from "fs";
import * as path from "path";

// Rename import
const filePathWrapper = './projects/components-wrapper/src/lib/components-wrapper.component.ts';

fs.readFile(filePathWrapper, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  const result = data.replace(/@porsche-design-system\/components/g, './component-types');

  fs.writeFile(filePathWrapper, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

const filePathTypes = '../components/component-types.d.ts';
const filePathLib = './projects/components-wrapper/src/lib/component-types.d.ts';

fs.copyFile(filePathTypes, filePathLib, (err) =>  {if (err) {
  console.log("Error Found:", err);
}});
