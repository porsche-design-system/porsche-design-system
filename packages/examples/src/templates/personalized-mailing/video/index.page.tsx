import type { ExampleMeta } from '../../../../lib/meta.ts';
import { description, PersonalizedMailing } from '../PersonalizedMailing.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Personalized mailing: Video',
  description: `${description} It opens on a full bleed video of the vehicle and greets the customer by name.`,
};

/** Personalized mailing – the `video` variant, opening on a full bleed video of the configured vehicle. */
const Page = () => <PersonalizedMailing meta={meta} variant="video" />;

export default Page;
