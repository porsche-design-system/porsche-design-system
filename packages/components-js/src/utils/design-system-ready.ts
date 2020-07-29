// Export of event name to ensure easy imports
export const PORSCHE_DESIGN_SYSTEM_READY_EVENT = 'porscheDesignSystemReady';

export const designSystemReady = () => {
  // By creating a hidden div which gets removed after fonts are loaded we force the browser to load our font immediately.
  const hiddenFontLoader = document.createElement('div');
  hiddenFontLoader.id = 'p-font-loader';
  document.body.appendChild(hiddenFontLoader);
  // Some browsers need time to load the font. While loop crashes safari so we check it recursive
  (document as any).fonts.ready.then(() => {
    let i = 0;
    const checkForFonts = () => {
      if (i < 10 && !(document as any).fonts.check('1em "Porsche Next"')) {
        setTimeout(checkForFonts, 5);
      }
      i++;
    };
    checkForFonts();
    document.body.removeChild(hiddenFontLoader);
    document.dispatchEvent(new Event(PORSCHE_DESIGN_SYSTEM_READY_EVENT))
  });
};
