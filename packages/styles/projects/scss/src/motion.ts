import {
  motionDurationLong,
  motionDurationModerate,
  motionDurationShort,
  motionDurationVeryLong,
  motionEaseIn,
  motionEaseInOut,
  motionEaseOut,
} from '@porsche-design-system/tokens';

export const getMotionScss = () => {
  return `
    $pds-motion-duration-long: ${motionDurationLong};
    $pds-motion-duration-moderate: ${motionDurationModerate};
    $pds-motion-duration-short: ${motionDurationShort};
    $pds-motion-duration-very-long: ${motionDurationVeryLong};
    $pds-motion-easing-base: ${motionEaseInOut};
    $pds-motion-easing-in: ${motionEaseIn};
    $pds-motion-easing-out: ${motionEaseOut};
`;
};
