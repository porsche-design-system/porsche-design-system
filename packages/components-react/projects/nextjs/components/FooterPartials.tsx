import { getDSRPonyfill } from '@porsche-design-system/components-react/partials';

export const FooterPartials = (): JSX.Element => {
  return <>{getDSRPonyfill({ format: 'jsx' })}</>;
};
