import {
  VanillaExtractMediaQueryMax,
  VanillaExtractMediaQueryMin,
  VanillaExtractMediaQueryMinMax,
  VanillaExtractWrapper,
} from './media-query.css';

export const VanillaExtractMediaQuery = () => {
  return (
    <div className={VanillaExtractWrapper}>
      <p className={VanillaExtractMediaQueryMin}>Media Query Min:</p>
      <p className={VanillaExtractMediaQueryMax}>Media Query Max:</p>
      <p className={VanillaExtractMediaQueryMinMax}>Media Query Min Max:</p>
    </div>
  );
};
