import { getDSRPonyfill } from '@porsche-design-system/components-react/partials';

export const BodyPartials = (): JSX.Element => {
  return <>{getDSRPonyfill({ format: 'jsx' })}</>;
};
