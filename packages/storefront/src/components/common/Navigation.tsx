import {
  type AccordionUpdateEventDetail,
  PAccordion,
  PDivider,
  PHeading,
  PLinkPure,
  PText,
} from '@porsche-design-system/components-react/ssr';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { VersionSelect } from '@/components/common/VersionSelect';
import type { PDSVersionGroup } from '@/models/pdsVersion';
import { type Routes, sitemap } from '@/sitemap';
import { getPathnameRoutes } from '@/utils/pathname';

const initialAccordionState = Object.keys(sitemap).reduce<Record<keyof Routes, boolean>>((acc, section) => {
  acc[section] = false;
  return acc;
}, {});

type NavigationProps = {
  readonly pdsVersion: PDSVersionGroup;
  readonly onNavigate: () => void;
};

export const Navigation = ({ pdsVersion, onNavigate }: NavigationProps) => {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<{ [key: keyof typeof sitemap]: boolean }>(initialAccordionState);

  const handleAccordionUpdate = (section: string) => (e: CustomEvent<AccordionUpdateEventDetail>) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: e.detail.open,
    }));
  };

  // Open section in which current page is
  useEffect(() => {
    if (pathname) {
      const { keys } = getPathnameRoutes(pathname);
      if (keys[0]) {
        setOpenSections((prevState) => ({
          ...prevState,
          [keys[0]]: true,
        }));
      }
    }
  }, [pathname]);

  return (
    <>
      <nav aria-label="Main" className="flex flex-col gap-static-sm">
        {Object.entries(sitemap).map(([path, category]) => (
          <PAccordion
            key={path}
            compact={true}
            className={`${['Components', 'Tokens', 'Must Know'].includes(category.name as string) ? 'mt-static-md ' : ''}[&>:not([slot]):not(:last-child)]:mb-static-sm`}
            open={openSections[path]}
            onUpdate={handleAccordionUpdate(path)}
          >
            <PHeading slot="summary" tag="h3" size="small">
              {category.name as string}
            </PHeading>
            {category.subPaths &&
              Object.entries(category.subPaths).map(([_, page]) => {
                // If page has subPaths (tabs) link to first tab
                const link = page.subPaths ? Object.values(page.subPaths)[0].path : page.path;
                return (
                  <PLinkPure
                    key={link}
                    icon="none"
                    stretch={true}
                    active={pathname?.includes(`${page.path}/`)}
                    onClick={() => onNavigate()}
                  >
                    <Link href={link}>{page.name}</Link>
                  </PLinkPure>
                );
              })}
          </PAccordion>
        ))}
      </nav>
      <PDivider className="my-fluid-lg" />
      <footer className="flex flex-col gap-fluid-md">
        {pdsVersion.all.length > 1 && <VersionSelect pdsVersion={pdsVersion} />}
        <PLinkPure className="self-start" href="https://brand.porsche.com" target="_blank" icon="external">
          brand.porsche.com
        </PLinkPure>
        <PText size="xx-small" color="contrast-medium">
          © 2025 Dr. Ing. h.c. F. Porsche AG.
          <ul className="flex flex-col gap-fluid-xs mt-fluid-xs">
            <li>
              <Link href="https://brand.porsche.com/d/aXCSDnXaTiSY">Privacy Policy</Link>
            </li>
            <li>
              <Link href="https://brand.porsche.com/d/S5pRV9qVeHyf">Legal Notice</Link>
            </li>
            <li>
              <Link href="/license">License</Link>
            </li>
            <li>
              <Link href="/accessibility-statement">Accessibility Statement</Link>
            </li>
          </ul>
        </PText>
      </footer>
    </>
  );
};
