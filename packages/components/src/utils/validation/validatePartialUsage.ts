export const validatePartialUsage = (): void => {
  const { head } = document;

  if (
    !Array.from(head.querySelectorAll('link')).find((el) =>
      el.getAttribute('href').includes('porsche-next-w-la-regular')
    )
  ) {
    console.warn(
      `Please make sure to apply the 'getInitialFontLinks()' partial as described at https://designsystem.porsche.com/v2/partials/font-links`
    );
  }
};
