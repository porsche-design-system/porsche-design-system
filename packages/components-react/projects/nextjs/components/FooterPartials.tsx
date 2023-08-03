import {
  getBrowserSupportFallbackScript,
  getCookiesFallbackScript,
  getDSRPonyfill,
} from '@porsche-design-system/components-react/partials';

type Props = {
  cdn?: 'local' | 'auto' | 'cn';
};

export const FooterPartials = ({ cdn }: Props): JSX.Element => {
  return (
    <>
      {getDSRPonyfill({ format: 'jsx' })}
      {getBrowserSupportFallbackScript({ format: 'jsx', cdn: cdn === 'local' ? 'auto' : cdn })}
      {getCookiesFallbackScript({ format: 'jsx' })}
    </>
  );
};
