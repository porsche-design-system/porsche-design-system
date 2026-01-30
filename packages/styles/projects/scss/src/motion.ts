import {
  durationLg,
  durationMd,
  durationSm,
  durationXl,
  easeIn,
  easeInOut,
  easeOut,
} from '@porsche-design-system/tokens';

export const getMotionScss = () => {
  return `
    $duration-sm: ${durationSm};
    $duration-md: ${durationMd};
    $duration-lg: ${durationLg};
    $duration-xl: ${durationXl};

    $ease-in-out: ${easeInOut};
    $ease-in: ${easeIn};
    $ease-out: ${easeOut};

    $pds-motion-duration-long: ${durationLg}; /* alias (deprecated) */
    $pds-motion-duration-moderate: ${durationMd}; /* alias (deprecated) */
    $pds-motion-duration-short: ${durationSm}; /* alias (deprecated) */
    $pds-motion-duration-very-long: ${durationXl}; /* alias (deprecated) */
    $pds-motion-easing-base: ${easeInOut}; /* alias (deprecated) */
    $pds-motion-easing-in: ${easeIn}; /* alias (deprecated) */
    $pds-motion-easing-out: ${easeOut}; /* alias (deprecated) */
`;
};
