import { PlaygroundDir } from '@/models';
import { fontFaceStyles, fontLinks, initialStyles, loaderScript, metaTagsAndIconLinksDemo } from '@/lib/partialResults';

export const getComponentExamplePage = (markup: string, dir: PlaygroundDir, globalStyles: string): string => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Porsche Design System</title>
    ${metaTagsAndIconLinksDemo}
    ${fontLinks}
    ${initialStyles}
    ${fontFaceStyles}
    <style>
      html, body { margin: 0; padding: 0; }
      ${globalStyles}
    </style>
  </head>
  <body dir="${dir}">
    ${markup}
    ${loaderScript}
  </body>
</html>`;
};
