const partials = require('@porsche-design-system/components-angular/partials');

module.exports = (targetOptions, indexHtml) => {
  const partialContent = [
    partials.getInitialStyles(),
    partials.getFontLinks({ weights: ['regular', 'semi-bold', 'bold'] }),
    partials.getBrowserSupportFallbackScript(),
    partials.getCookiesFallbackScript(),
  ]
    .join('\n')
    .replace(/https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system/g, 'http://localhost:3001');

  indexHtml = indexHtml.replace(/(<\/head>)/, `\n${partialContent}$1`);
  console.log('injected partials');

  return indexHtml;
};
