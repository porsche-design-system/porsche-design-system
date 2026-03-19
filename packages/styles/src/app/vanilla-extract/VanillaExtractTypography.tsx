import {
  heading2Xl,
  heading3Xl,
  heading4Xl,
  heading5Xl,
  headingLarge,
  headingMedium,
  headingSmall,
  headingXl,
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
        <h2 className={heading5Xl}>Heading 5xl</h2>
        <h2 className={heading4Xl}>Heading 4xl</h2>
        <h2 className={heading3Xl}>Heading 3xl</h2>
        <h2 className={heading2Xl}>Heading 2xl</h2>
        <h3 className={headingXl}>Heading xl</h3>
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
