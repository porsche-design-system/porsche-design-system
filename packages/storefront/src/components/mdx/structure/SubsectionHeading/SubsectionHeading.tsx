import type { PropsWithChildren } from 'react';
import { H3Anchored } from '../../elements/Typography';

/** A `###` heading a `TableOfContents` links to, which the plain Markdown `###` is not: it has no anchor. */
export const SubsectionHeading = ({ children }: PropsWithChildren) => <H3Anchored>{children}</H3Anchored>;
