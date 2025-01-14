'use client';

import { navigation } from '@/components/common/Navigation';
import { PTabsBar, type TabsBarUpdateEventDetail } from '@porsche-design-system/components-react/ssr';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

const formatKey = (key: string) => {
  return key
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

export default function Tabs() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const onUpdate = (e: CustomEvent<TabsBarUpdateEventDetail>) => {
    setTabIndex(e.detail.activeTabIndex);
  };
  const pathname = usePathname();

  const tabs = useMemo(() => {
    if (!pathname) return null;

    // Remove leading and trailing slashes, then split into parts
    const keys = pathname
      .replace(/^\/|\/$/g, '') // Trim slashes
      .split('/') // Split into keys
      .map(formatKey); // Format each key

    // Redirect to the first tab if page has tabs
    if (keys.length === 2 && typeof navigation[keys[0]][keys[1]] !== 'string') {
      redirect(`${pathname}/${Object.values(navigation[keys[0]][keys[1]])[0]}`);
    }

    if (keys.length === 3) {
      const activeTabs = navigation[keys[0]][keys[1]];
      setTabIndex(Object.keys(activeTabs).indexOf(keys[2]));
      return activeTabs;
    }
  }, [pathname]);

  if (!tabs) {
    return null;
  }

  return (
    <PTabsBar activeTabIndex={tabIndex} onUpdate={onUpdate}>
      {Object.entries(tabs).map(([tab, href]) => (
        <Link key={tab} href={href as string}>
          {tab}
        </Link>
      ))}
    </PTabsBar>
  );
}
