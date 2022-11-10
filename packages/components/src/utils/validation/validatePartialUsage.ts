export const validatePartialUsage = (): void => {
  const { head, body } = document;

  validateGetFontLinksUsage(head);
  validateGetComponentChunkLinksUsage(head);
  validateGetLoaderScriptUsage(body);
};

const validateGetFontLinksUsage = (documentHead: HTMLElement): void => {
  if (
    !Array.from(documentHead.querySelectorAll('link[rel="preload"][as="font"]')).find((el) =>
      el.getAttribute('href').includes('porsche-next-w-la-regular')
    )
  ) {
    partialValidationWarning('getFontLink');
  }
};

const validateGetComponentChunkLinksUsage = (documentHead: HTMLElement): void => {
  if (
    !Array.from(documentHead.querySelectorAll('link[rel="preload"][as="script"][crossorigin]')).find((el) =>
      /cdn\.ui\.porsche\.c(om|n)\/porsche-design-system\/components\/porsche-design-system\.v(?:\d+\.){3}[\da-z]+\.js/.test(
        el.getAttribute('href')
      )
    )
  ) {
    partialValidationWarning('getComponentChunkLinks');
  }
};

const validateGetLoaderScriptUsage = (documentBody: HTMLElement): void => {
  if (
    !Array.from(documentBody.querySelectorAll('script')).find((el) => {
      const innerHTML = el.innerHTML;

      return innerHTML.startsWith('var porscheDesignSystem;') && innerHTML.endsWith('porscheDesignSystem.load()');
    })
  ) {
    partialValidationWarning('getLoaderScript');
  }
};

type PartialNames = 'getFontLink' | 'getComponentChunkLinks' | 'getLoaderScript';

const partialValidationWarning = (partialName: PartialNames): void => {
  const partialNameToLinkMap: Record<PartialNames, string> = {
    getFontLink: 'font-links',
    getComponentChunkLinks: 'component-chunk-links',
    getLoaderScript: 'loader-script',
  };

  console.warn(
    `You are not using '${partialName}()'. The Porsche Design System recommends the usage of the '${partialName}()' partial as described at https://designsystem.porsche.com/v2/partials/${partialNameToLinkMap[partialName]} to enhance performance and loading behavior`
  );
};
