import {
  getBrowserSupportFallbackScript,
  getCookiesFallbackScript,
  getDSRPonyfill,
} from '@porsche-design-system/components-react/partials';

export const BodyPartials = (): JSX.Element => {
  return (
    <>
      {getDSRPonyfill({ format: 'jsx' })}
      {getBrowserSupportFallbackScript({ format: 'jsx' })}
      {getCookiesFallbackScript({ format: 'jsx' })}
    </>
  );
};
