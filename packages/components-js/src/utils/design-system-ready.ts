// Export of event name to ensure easy imports
export const PORSCHE_DESIGN_SYSTEM_READY_EVENT = 'porscheDesignSystemReady';

export const designSystemReady = (): void => {
  // By creating a hidden div which gets removed after fonts are loaded we force the browser to load our font immediately, but only if there is no preloading set.
  let preloaded = true;
  const preLoaderId = 'p-font-loader';
  const hiddenStyleId = 'font-loader-style';
  if (!document.querySelector('link[rel="preload"][as="font"]')) {
    preloaded = false;
    const hiddenStyle = document.createElement('style');
    hiddenStyle.innerHTML = `
    #p-font-loader {font-family: "Porsche Next";
      font-weight: 100;
      visibility: hidden;
    }
    #p-font-loader::before{
      font-weight: 400;
      content: '';
    }
    #p-font-loader::after{
      font-weight: 600;
      content: '';
    }
    #p-font-loader::first-letter{
      font-weight: 700;
    }`;
    hiddenStyle.id = hiddenStyleId;
    const hiddenFontLoader = document.createElement('div');
    hiddenFontLoader.id = preLoaderId;

    document.head.append(hiddenStyle);
    document.body.appendChild(hiddenFontLoader);
  }
  // Some browsers need time to load the font. While loop crashes safari so we check it recursive
  (document as any).fonts.ready.then(() => {
    let i = 0;
    const checkForFonts = (): void => {
      if (i < 10 && !(document as any).fonts.check('1em "Porsche Next"')) {
        setTimeout(checkForFonts, 5);
      }
      i++;
    };
    checkForFonts();

    if (!preloaded) {
      document.body.removeChild(document.getElementById(preLoaderId));
      document.head.removeChild(document.getElementById(hiddenStyleId));
    }
    document.dispatchEvent(new Event(PORSCHE_DESIGN_SYSTEM_READY_EVENT));
  });
};
