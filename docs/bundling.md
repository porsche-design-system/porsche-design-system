# Bundling 23.02.22

| Option                         | UMD | CJS | CJS with esModule: false | ESM | ESM with type: module |comment
| ------------------------------ | --- | --- | ------------------------ | --- | --------------------- |--------
| treeshakable                   | ✗   | ✗   | ✗                        | ✓   |                       |                 
| compatibility node -e          | ✓   | ✓   |                          | ✗   |                       |                 
| compatibility ts-node          | ✓   | ✓   |                          | ✗   |   ✗                   | ESM with type module works only with NODE_OPTIONS='--loader ts-node/esm --experimental-specifier-resolution=node'.  
| compatibility create-react-app | ✓   | ✓   |                          | ✓   |                       |
| compatibility nextJS           | ✓   | ✓   |                          | ✓   |                       |
| compatibility Angular CLI      | ✓   | ✓   |                          | ✗   |                       |
| compatibility Stencil          | ✓   | ✓   |                          |     |   ✓                   |
| compatibility Vue CLI          | ✓   | ✓   |                          |     |   ✓                   |
| compatibility Jest             | ✓   | ✓   |                          |     |   ✗                   |


## Conclusion:

### ESM type module (too early)
ESM with type module works in ts-node with following configuration: https://github.com/TypeStrong/ts-node#commonjs-vs-native-ecmascript-modules
This also causes follow-up work in our scripts e.g. __dirname is not defined in ES module scope. Could be fixed via https://www.kindacode.com/article/node-js-using-__dirname-and-__filename-with-es-modules/
Also using `type: module` causes discrepancy in our typechecking and runtime errors:
- e.g. AbstractWrapperGenerator throws typing errors with unused parameters.
- fontFaceStyles uses `preset()` which throws `TypeError: preset is not a function` at runtime

Jest does not work with ESM only build. We get the same error `SyntaxError: Unexpected token 'export'` as in ts-node without flags.
Maybe we can make it work by passing flags / changing configuration, but this would mean our consumers would also have to do so.

### ESM
If we provide only ESM, it can`t be used due to Syntax Errors like Unexpected token 'export' in jest, ts-node and node and vanillaJs.
On the other hand we need to provide an ESM bundle, because it is treeshakeable. ESM is the future, but we are too early at the moment.

### CJS
Not treeshakable but works with node / ts-node and jest, therefore it can be used vor anything build time related.

### UMD
Universal build which works everywhere but is not treeshakable, so it is usually only used as fallback.  

#### Choosen solution
We provide a CJS build for build time tasks and an ESM build on top to ensure treeshakeability and should be used for every browser-related build.