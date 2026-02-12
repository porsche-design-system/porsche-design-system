import {
  vanillaExtractMotionEaseIn,
  vanillaExtractMotionEaseInOut,
  vanillaExtractMotionEaseOut,
  vanillaExtractMotionLong,
  vanillaExtractMotionModerate,
  vanillaExtractMotionShort,
  vanillaExtractMotionVeryLong,
  vanillaExtractMotionWrapper,
} from './motion.css';

export const VanillaExtractMotion = () => (
  <div className={vanillaExtractMotionWrapper}>
    <div className={vanillaExtractMotionShort}>Duration Short</div>
    <div className={vanillaExtractMotionModerate}>Duration Moderate</div>
    <div className={vanillaExtractMotionLong}>Duration Long</div>
    <div className={vanillaExtractMotionVeryLong}>Duration Very Long</div>
    <div className={vanillaExtractMotionEaseInOut}>Ease In Out</div>
    <div className={vanillaExtractMotionEaseIn}>Ease In</div>
    <div className={vanillaExtractMotionEaseOut}>Ease Out</div>
  </div>
);
