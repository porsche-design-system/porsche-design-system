import type { PropsWithChildren } from 'react';
import Tabs from '@/components/common/Tabs';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <section
      id="main-content"
      aria-labelledby="main-heading"
      className="col-[wide] focus-visible:outline outline-focus outline-offset-2 rounded-xl"
      tabIndex={-1}
    >
      <Tabs />
      {children}
    </section>
  );
}
