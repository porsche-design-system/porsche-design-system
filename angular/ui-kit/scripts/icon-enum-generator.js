/**
 * Fetching data from StdIn and resolves
 * the promise as soon as all data is
 * retrieved.
 */
async function getDataFromStdIn() {
  return new Promise((resolve, reject) => {
    let data = '';
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', (chunk) => {
      data += chunk;
    });

    process.stdin.on('error', (error) => {
      reject(error);
    });

    process.stdin.on('end', () => {
      resolve(data)
    });
  });
}

/**
 * Parses the selector prefix from nested scss source.
 * However it's highly dependent on the ui-kit scss
 * syntax with the 'global-class-prefix' and the block
 * selector.
 *
 * For example:
 * .#{$global-class-prefix}icon {
 * }
 *
 * Will return the string 'icon'.
 */

function getSelectorPrefix(data) {
  const match = data.match(/\.#\{\$global-class-prefix\}(.+)\s{/);
  if (match) {
    return match[1];
  }

  return null;
}

/**
 * Searches for all occurrences of selectors starting with
 * '&::before' and returns the nesting selector string.
 * This is highly dependent to the ui-kit icon scss syntax,
 * since all defined icons wrap a &::before selector to
 * set the actual icon content.
 *
 * For example:
 * &--delivery-adress {
 *   &::before {
 *     @include icon-delivery-adress;
 *   }
 * }
 *
 * &--arrow-back {
 *   &::before {
 *     @include icon-arrow-back;
 *   }
 * }
 *
 * will return:
 * [
 *  '--delivery-adress',
 *  '--arrow-back'
 * ]
 *
 */

function getSelectors(data) {
  const regex = /&(--[^\s]+)\s*\{\n\s*&::before/gm;
  const matches = [];
  let match;
  while(match = regex.exec(data)) {
    matches.push(match[1]);
  }

  return matches;
}

/**
 * This method is transforming a class string
 * to an screamingSnakeCase enum key. It removes
 * leading and trailing dashes and replaces other
 * dashes to underscores.
 *
 * For example:
 * The string '--arrow-back' is getting 'ARROW_BACK'.
 *
 * However, if the selector starts with a number,
 * it will prepend the string with an uppercase 'N'
 * to make it a valid javascript object key.
 * For example:
 * '--360-degree' is getting 'N360_DEGREE'
 *
 */
function transformSelectorToKey(selectorString) {
  const trimmed = selectorString.replace(/^-*|-*$/g, '');
  const snakeCase = trimmed.replace(/-/g, '_');
  const screamingSnakeCase = snakeCase.toUpperCase();

  if(!isNaN(screamingSnakeCase[0])) {
    return 'N' + screamingSnakeCase;
  }
  return screamingSnakeCase;
}

/**
 * This method loops over an array of selectors and generates
 * a map of enum keys value pairs. Where the value is the css
 * icon class. The class is prefixed by the selectorPrefix.
 *
 * For example:
 * [
 *   '--arrow-back',
 *   '--360-degree'
 * ]
 * with the selectorPrefix of 'icon' is transformed to:
 *
 * {
 *   ARROW_BACK: 'icon--arrow-back',
 *   N360_DEGREE: 'icon--360-degree'
 * }
 *
 */
function generateKeySelectorMap(selectorPrefix, selectors) {
  const map = {};
  for (const selector of selectors) {
    map[transformSelectorToKey(selector)] = selectorPrefix + selector;
  }

  return map;
}

/**
 * This method creates the ts enum code as string
 * from a map of enum keys value pairs. Where the
 * value is the css icon class.
 * For example:
 * {
 *   ARROW_BACK: 'icon--arrow-back',
 *   RFID_CARD: 'icon--rfid-card'
 * }
 *
 * Is processed to the string:
 * export enum PuiIcon {
 *   ARROW_BACK = 'icon--arrow-back',
 *   RFID_CARD = 'icon--rfid-card'
 * }
 */
function generateTsCode(map) {
  const enumItems = [];
  for(const key in map) {
    if(map.hasOwnProperty(key)) {
      enumItems.push(`  ${key} = '${map[key]}'`);
    }
  }

  return `export enum PuiIcon {\n${enumItems.join(`,\n`)}\n}`;
}

/**
 * Creates the enum ts source from scss code piped via
 * StdIn and outputs it to StdOut.
 * Check icon-enum-generator.spec.js for an example.
 */

(async () => {
  const data = await getDataFromStdIn();
  const selectors = getSelectors(data);
  const selectorPrefix = getSelectorPrefix(data);
  const map = generateKeySelectorMap(selectorPrefix, selectors);
  const generatedCode = generateTsCode(map);
  console.log(generatedCode);
})();
