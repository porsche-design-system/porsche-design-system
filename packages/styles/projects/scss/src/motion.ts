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
    $motion-duration-sm: ${motionDurationShort};
    $motion-duration-md: ${motionDurationModerate};
    $motion-duration-lg: ${motionDurationLong};
    $motion-duration-xl: ${motionDurationVeryLong};
    $motion-ease-in-out: ${motionEaseInOut};
    $motion-ease-in: ${motionEaseIn};
    $motion-ease-out: ${motionEaseOut};

    $pds-motion-duration-long: ${motionDurationLong}; /* alias (deprecated) */
    $pds-motion-duration-moderate: ${motionDurationModerate}; /* alias (deprecated) */
    $pds-motion-duration-short: ${motionDurationShort}; /* alias (deprecated) */
    $pds-motion-duration-very-long: ${motionDurationVeryLong}; /* alias (deprecated) */
    $pds-motion-easing-base: ${motionEaseInOut}; /* alias (deprecated) */
    $pds-motion-easing-in: ${motionEaseIn}; /* alias (deprecated) */
    $pds-motion-easing-out: ${motionEaseOut}; /* alias (deprecated) */
`;
};
