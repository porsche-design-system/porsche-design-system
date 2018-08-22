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

function getSelectorPrefix(data) {
  const match = data.match(/\.#\{\$global-class-prefix\}(.+)\s{/);
  if (match) {
    return match[1];
  }

  return null;
}

function getSelectors(data) {
  const regex = /&(--[^\s]+)\s*\{\n\s*&::before/gm;
  const matches = [];
  let match;
  while(match = regex.exec(data)) {
    matches.push(match[1]);
  }

  return matches;
}

function transformSelectorToKey(selectorString) {
  const trimmed = selectorString.replace(/^-*|-*$/g, '');
  const snakeCase = trimmed.replace(/-/g, '_');
  const screamingSnakeCase = snakeCase.toUpperCase();
  if(!isNaN(screamingSnakeCase[0])) {
    return 'N' + screamingSnakeCase;
  }

  return screamingSnakeCase;
}

function generateKeySelectorMap(selectorPrefix, selectors) {
  const map = {};
  for (const selector of selectors) {
    map[transformSelectorToKey(selector)] = selectorPrefix + selector;
  }

  return map;
}

function generateTsCode(map) {
  const enumItems = [];
  for(const key in map) {
    if(map.hasOwnProperty(key)) {
      enumItems.push(`  ${key} = '${map[key]}'`);
    }
  }

  return `export enum PuiIcon {\n${enumItems.join(`,\n`)}\n}`;
}

(async () => {
  const data = await getDataFromStdIn();
  const selectors = getSelectors(data);
  const selectorPrefix = getSelectorPrefix(data);
  const map = generateKeySelectorMap(selectorPrefix, selectors);
  const generatedCode = generateTsCode(map);
  await console.log(generatedCode);
})();
