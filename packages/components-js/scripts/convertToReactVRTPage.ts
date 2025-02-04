import { convertToReact } from '@porsche-design-system/shared/utils/convertToReact';
import { pascalCase } from 'change-case';
import { byAlphabet, comment, iconsRegEx, templateRegEx } from './generateVRTPages';

export type ReactCharacteristics = {
  usesSetAllReady: boolean;
  usesComponentsReady: boolean;
  usesToast: boolean;
  isIconPage: boolean;
  usesQuerySelector: boolean;
  usesPrefixing: boolean;
};

export const convertToReactVRTPage = (
  fileName: string,
  fileContent: string,
  template: string,
  style: string,
  script: string,
  toastText: string,
  characteristics: ReactCharacteristics
): { fileName: string; fileContent: string } => {
  const { usesSetAllReady, usesComponentsReady, usesToast, isIconPage, usesQuerySelector, usesPrefixing } =
    characteristics;

  // imports
  const reactImports = [
    ...((usesSetAllReady || usesQuerySelector) && !isIconPage && !usesToast ? ['useEffect'] : []),
    ...(usesSetAllReady ? ['useState'] : []),
  ]
    .sort(byAlphabet)
    .join(', ');

  const componentImports = Array.from(fileContent.matchAll(/<(?:[a-z-]*)(p-[\w-]+)/g))
    .map(([, tagName]) => tagName)
    .filter((tagName, index, arr) => arr.findIndex((t) => t === tagName) === index)
    .map((tagName) => pascalCase(tagName));

  const pdsImports = [...componentImports, ...(usesPrefixing ? ['PorscheDesignSystemProvider'] : [])]
    .filter((x) => x && x !== 'PToast')
    .sort(byAlphabet)
    .join(', ');

  const imports = [
    pdsImports && `import { ${pdsImports} } from '@porsche-design-system/components-react';`,
    reactImports && `import { ${reactImports} } from 'react';`,
    isIconPage && `import { ICON_NAMES } from '@porsche-design-system/icons';`,
    (usesSetAllReady || usesComponentsReady) && `import { pollComponentsReady } from '../../pollComponentsReady';`,
    usesToast && `import { Toast } from '../../components';`,
  ]
    .filter(Boolean)
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
    fileContent = fileContent.replace(/<[a-z-]*p-toast/, `$& text="${toastText.slice(1, -1)}"`);
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

  // comments
  fileContent = fileContent
    .replace(/<!-- /g, '{/* ') // convert html comments
    .replace(/ -->/g, ' */}'); // convert html comments

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
    .replace(/(<input[^>]*?) c(hecked)/g, '$1 defaultC$2') // for checkbox + radio
    .replace(/alt=""/g, 'alt={""}');

  fileContent = fileContent.replace(/(\n +)(<(?:strong|em|b|i)>)/g, "$1{' '}$2"); // for forced whitespace

  // inject PorscheDesignSystemProvider
  if (fileContent.match(/<div data-prefix="my-prefix".*>/)) {
    fileContent = fileContent
      .replace(/<div data-prefix="my-prefix".*>[\s\S]*?\n<\/div>/g, (match) =>
        match.replace(
          match,
          `<PorscheDesignSystemProvider prefix="${prefix}">\n  ${match.replace(
            /(\n)(.)/g,
            '$1  $2' // fix indentation
          )}\n</PorscheDesignSystemProvider>`
        )
      )
      .replace(/ data-prefix="my-prefix"/g, ''); // get rid of marker
  } else {
    if (prefix) {
      throw new Error(`Using prefix without wrapping <div data-prefix="my-prefix"> is not supported for "${fileName}"`);
    }
  }

  fileContent = fileContent.replace(/(\n)([ <>]+)/g, '$1      $2'); // fix indentation

  fileContent = `${comment}
${imports}

export const ${pascalCase(fileName)}Page = (): JSX.Element => {${componentLogic}
  return (
    <>${styleJsx}
      ${convertToReact(fileContent).replace(/<PToast/g, '<Toast')}
    </>
  );
};
`;

  fileName = `${pascalCase(fileName)}.tsx`;

  return { fileName, fileContent };
};
