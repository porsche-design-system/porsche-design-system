export const validatePartialUsage = (): void => {
  const { head } = document;

  // getFontLinks la-regular
  if (
    !Array.from(head.querySelectorAll('link[rel="preload"][as="font"]')).find((el) =>
      el.getAttribute('href').includes('porsche-next-w-la-regular')
    )
  ) {
    console.warn(
      `Please make sure to apply the 'getInitialFontLinks()' partial as described at https://designsystem.porsche.com/v2/partials/font-links`
    );
  }

  // getChunkLinks coreChunk check initial
  if (
    !Array.from(head.querySelectorAll('link[rel="preload"][as="script"][crossorigin]')).find((el) =>
      /cdn\.ui\.porsche\.c(om|n)\/porsche-design-system\/components\/porsche-design-system\.v(?:\d+\.){3}[\da-z]+\.js/.test(
        el.getAttribute('href')
      )
    )
  ) {
    console.warn(
      `Please make sure to apply the 'getChunkLinks()' partial as described at https://designsystem.porsche.com/v2/partials/font-links`
    );
  }

  if (!Array.from(head.querySelectorAll('link')).find((el) => el.getAttribute('href').includes('font-face.min'))) {
    console.warn(
      `Please make sure to apply the 'getFontFaceStylesheet()' partial as described at https://designsystem.porsche.com/v2/partials/font-face-stylesheet`
    );
  }
};
