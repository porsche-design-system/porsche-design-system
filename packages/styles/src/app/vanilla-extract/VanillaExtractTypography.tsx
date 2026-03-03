import {
  displayLarge,
  displayMedium,
  displaySmall,
  headingLarge,
  headingMedium,
  headingSmall,
  headingXLarge,
  headingXXLarge,
  textLarge,
  textMedium,
  textSmall,
  textXLarge,
  textXSmall,
  textXXSmall,
  vanillaExtractTypographyWrapper,
} from './typography.css';

export const VanillaExtractTypography = () => {
  return (
    <>
      <div className={vanillaExtractTypographyWrapper}>
        <h1 className={displayLarge}>Display lg</h1>
        <h2 className={displayMedium}>Display md</h2>
        <h2 className={displaySmall}>Display sm</h2>
      </div>
      <div className={vanillaExtractTypographyWrapper}>
        <h2 className={headingXXLarge}>Heading 2xl</h2>
        <h3 className={headingXLarge}>Heading xl</h3>
        <h4 className={headingLarge}>Heading lg</h4>
        <h5 className={headingMedium}>Heading md</h5>
        <h6 className={headingSmall}>Heading sm</h6>
      </div>
      <div className={vanillaExtractTypographyWrapper}>
        <p className={textXLarge}>text xl</p>
        <p className={textLarge}>text lg</p>
        <p className={textMedium}>text md</p>
        <p className={textSmall}>text sm</p>
        <p className={textXSmall}>text xs</p>
        <p className={textXXSmall}>text 2xs</p>
      </div>
    </>
  );
};
