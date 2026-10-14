import type { ExampleMeta } from '../../../../lib/meta.ts';
import { description, PersonalizedMailing } from '../PersonalizedMailing.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Personalized mailing: No video',
  description: `${description} It opens on a giant title the vehicle is pulled up into – for a lighter page, or when no footage is available.`,
};

/** Personalized mailing – the `no-video` variant, opening on a giant title instead of a video. */
const Page = () => <PersonalizedMailing meta={meta} variant="no-video" />;

export default Page;
