import {
  heading2Xl,
  heading2Xs,
  heading3Xl,
  heading4Xl,
  heading5Xl,
  headingLg,
  headingMd,
  headingSm,
  headingXl,
  headingXs,
  text2Xl,
  text2Xs,
  text3Xl,
  text4Xl,
  text5Xl,
  textLg,
  textMd,
  textSm,
  textXl,
  textXs,
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
        <h4 className={headingLg}>Heading lg</h4>
        <h5 className={headingMd}>Heading md</h5>
        <h6 className={headingSm}>Heading sm</h6>
        <h6 className={headingXs}>Heading xs</h6>
        <h6 className={heading2Xs}>Heading 2xs</h6>
      </div>
      <div className={vanillaExtractTypographyWrapper}>
        <p className={text5Xl}>Text 5xl</p>
        <p className={text4Xl}>Text 4xl</p>
        <p className={text3Xl}>Text 3xl</p>
        <p className={text2Xl}>Text 2xl</p>
        <p className={textXl}>Text xl</p>
        <p className={textLg}>Text lg</p>
        <p className={textMd}>Text md</p>
        <p className={textSm}>Text sm</p>
        <p className={textXs}>Text xs</p>
        <p className={text2Xs}>Text 2xs</p>
      </div>
    </>
  );
};
