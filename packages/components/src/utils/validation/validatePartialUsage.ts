type PartialNames = 'getFontLink' | 'getComponentChunkLinks' | 'getLoaderScript';

export const validatePartialUsage = (): void => {
  validateGetFontLinksUsage();
  validateGetComponentChunkLinksUsage();
  validateGetLoaderScriptUsage();
};

const validateGetFontLinksUsage = (): void => {
  if (!document.querySelectorAll('link[rel=preload][as=font][href*=porsche-next-w-la-regular]')) {
    partialValidationWarning('getFontLink');
  }
};

const validateGetComponentChunkLinksUsage = (): void => {
  if (
    !Array.from(document.querySelectorAll('link[rel="preload"][as="script"][crossorigin]')).find((el) =>
      /cdn\.ui\.porsche\.c(om|n)\/porsche-design-system\/components\/porsche-design-system\.v(?:\d+\.){3}[\da-z]+\.js/.test(
        el.getAttribute('href')
      )
    )
  ) {
    partialValidationWarning('getComponentChunkLinks');
  }
};

const validateGetLoaderScriptUsage = (): void => {
  //     !Array.from(document.querySelectorAll('script')).find((el) => {
  //       const innerHTML = el.innerHTML;
  //
  //       return innerHTML.startsWith('var porscheDesignSystem;') && innerHTML.endsWith('porscheDesignSystem.load()');
  //     })
  if (!document.querySelector('script[data-pds-loader-script]')) {
    partialValidationWarning('getLoaderScript');
  }
};

const partialValidationWarning = (partialName: PartialNames): void => {
  const partialNameToLinkPathMap: Record<PartialNames, string> = {
    getFontLink: 'font-links',
    getComponentChunkLinks: 'component-chunk-links',
    getLoaderScript: 'loader-script',
  };

  console.warn(
    `You are not using '${partialName}()'. The Porsche Design System recommends the usage of the '${partialName}()' partial as described at https://designsystem.porsche.com/v2/partials/${partialNameToLinkPathMap[partialName]} to enhance performance and loading behavior`
  );
};
