import { pascalCase } from 'change-case';
import { convertToReact } from '@porsche-design-system/storefront/src/utils/convertToReact';
import { byAlphabet, iconsRegEx, templateRegEx } from './generateVRTPages';

type Characteristics = {
  usesSetAllReady: boolean;
  usesComponentsReady: boolean;
  usesToast: boolean;
  isIconPage: boolean;
  usesQuerySelector: boolean;
  usesPrefixing: boolean;
  isOverviewPage: boolean;
};

export const convertToReactVRTPage = (
  fileName: string,
  fileContent: string,
  template: string,
  style: string,
  script: string,
  toastText: string,
  characteristics: Characteristics
): { fileName: string; fileContent: string } => {
  const {
    usesSetAllReady,
    usesComponentsReady,
    usesToast,
    isIconPage,
    usesQuerySelector,
    usesPrefixing,
    isOverviewPage,
  } = characteristics;

  const comment = '/* Auto Generated File */';

  // imports
  const reactImports = [
    (usesSetAllReady || usesQuerySelector) && !isIconPage && 'useEffect',
    usesSetAllReady && 'useState',
  ]
    .filter((x) => x)
    .sort(byAlphabet)
    .join(', ');

  const componentImports = Array.from(fileContent.matchAll(/<(?:[a-z-]*)(p-[\w-]+)/g))
    .map(([, tagName]) => tagName)
    .filter((tagName, index, arr) => arr.findIndex((t) => t === tagName) === index)
    .map((tagName) => pascalCase(tagName));
  const pdsImports = [
    ...componentImports,
    usesPrefixing && 'PorscheDesignSystemProvider',
    usesToast && 'useToastManager',
  ]
    .filter((x) => x)
    .sort(byAlphabet)
    .join(', ');

  const imports = [
    `import { ${pdsImports} } from '@porsche-design-system/components-react';`,
    reactImports && `import { ${reactImports} } from 'react';`,
    isIconPage && `import { ICON_NAMES } from '@porsche-design-system/assets';`,
    (usesSetAllReady || usesComponentsReady) && `import { pollComponentsReady } from '../pollComponentsReady';`,
  ]
    .filter((x) => x)
    .join('\n');

  // implementation
  style = style?.trim();
  const styleConst = style ? `const style = \`\n  ${style}\n\`;` : '';
  const styleJsx = style ? '\n      <style dangerouslySetInnerHTML={{ __html: style }} />\n' : '';

  if (usesComponentsReady) {
    script = script.replace('componentsReady', 'pollComponentsReady');
  }

  let useStateOrEffect = '';

  if (usesSetAllReady) {
    useStateOrEffect = `const [allReady, setAllReady] = useState(false);
useEffect(() => {
  pollComponentsReady().then(() => {
    setAllReady(true);
  });
}, []);`;
  } else if (usesToast) {
    useStateOrEffect = `const { addMessage } = useToastManager();
useEffect(() => {
  addMessage({ text: ${toastText} });
}, [addMessage]);`;
  } else if (!isIconPage && usesQuerySelector) {
    useStateOrEffect = `useEffect(() => {
  ${script}
}, []);`;
  }

  const componentLogic = [useStateOrEffect, styleConst]
    .filter((x) => x)
    .join('\n\n')
    .replace(/^(.)/, '\n$1') // leading new line if there is any content
    .replace(/(.)$/, '$1\n') // trailing new line if there is any content
    .replace(/(\n)(.)/g, '$1  $2'); // fix indentation

  // conditional template rendering
  template = template
    ?.replace(/( *)<template/g, '$1{allReady && (\n$1<div') // add condition and replace opening tag
    .replace(/( *)<\/template>/g, '$1</div>\n$1)}') // replace closing tag
    .replace(/(\n)( +<)/g, '$1  $2'); // fix indentation
  fileContent = fileContent.replace(templateRegEx, template);

  // prefixing
  const [, prefix] = fileContent.match(/<([\w-]+)-p-[\w-]+/) || [];
  if (usesPrefixing) {
    fileContent = fileContent.replace(new RegExp(`(<\/?)${prefix}-`, 'g'), '$1');
  }

  // icons
  if (isIconPage) {
    fileContent = fileContent.replace(
      iconsRegEx,
      `$1
  {ICON_NAMES.map((x) => (
    <PIcon key={x} name={x as any} size="inherit" color="inherit" aria-label={\`\${x} icon\`} />
  ))}
$2`
    );
  }

  // attribute conversion
  fileContent = fileContent
    .replace(/(<textarea.*)>\s*(.+?)\s*(<\/textarea>)/g, '$1 defaultValue="$2">$3')
    .replace(/(<input[^>]*?) v(alue=)/g, '$1 defaultV$2') // for input
    .replace(/(<input[^>]*?) c(hecked)/g, '$1 defaultC$2'); // for checkbox + radio

  fileContent = fileContent.replace(/(\n +)(<(?:strong|em)>)/g, "$1{' '}$2"); // for forced whitespace

  if (isOverviewPage) {
    // wrap right column with PorscheDesignSystemProvider
    let i = 0;
    fileContent = fileContent.replace(/\n\s\s<div style="flex: 1">[\s\S]*?\n\s\s<\/div>/g, (match) => {
      if (i === 1) {
        match = match
          .replace(match, `\n<PorscheDesignSystemProvider prefix="${prefix}">${match}\n</PorscheDesignSystemProvider>`)
          .replace(/(\n)(.)/g, '$1  $2'); // fix indentation
      }
      i++;
      return match;
    });
  }

  const fragmentTag = usesPrefixing && !isOverviewPage ? 'PorscheDesignSystemProvider' : '';
  fileContent = fileContent.replace(/(\n)([ <>]+)/g, '$1      $2');

  fileContent = `${comment}
${imports}

export const ${pascalCase(fileName)}Page = (): JSX.Element => {${componentLogic}
  return (
    <${fragmentTag}>${styleJsx}
      ${convertToReact(fileContent)}
    </${fragmentTag}>
  );
};
`;

  fileName = `${pascalCase(fileName)}.tsx`;

  return { fileName, fileContent };
};
