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

/**
 * Maps the first section key of each logical group to its group label.
 * Sections without an entry belong to the preceding group (no extra header rendered).
 */
const SECTION_GROUP_HEADERS: Partial<Record<string, string>> = {
  news: 'Get Started', // designing, developing
  skills: 'AI',
  components: 'Core', // components, styles, tokens, patterns, templates, partials
  tailwindcss: 'Styling', // tailwindcss, scss, emotion, vanilla-extract
  'ag-grid': 'Integrations', // ag-grid
  'must-know': 'Resources', // must-know, help
};

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
        {Object.entries(sitemap).map(([path, category]) => {
          const groupLabel = SECTION_GROUP_HEADERS[path];

          return (
            <React.Fragment key={path}>
              {groupLabel && (
                <PHeading tag="h3" size="2xs" color="contrast-medium" className="mt-static-md first:mt-0">
                  {groupLabel}
                </PHeading>
              )}
              <PAccordion
                compact={true}
                className="[&>:not([slot]):not(:last-child)]:mb-static-sm"
                open={openSections[path]}
                onUpdate={handleAccordionUpdate(path)}
              >
                <PHeading slot="summary" tag="h4" size="small" weight="semibold">
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
                        active={pathname?.includes(`${page.path}/`)}
                        onClick={() => onNavigate()}
                        className={'w-full ps-static-sm'}
                      >
                        <Link href={link} aria-current={pathname?.includes(`${page.path}/`) ? 'page' : undefined}>
                          {page.name}
                        </Link>
                      </PLinkPure>
                    );
                  })}
              </PAccordion>
            </React.Fragment>
          );
        })}
      </nav>
      <PDivider className="my-fluid-lg" />
      <footer className="flex flex-col gap-fluid-md">
        {pdsVersion.all.length > 1 && <VersionSelect pdsVersion={pdsVersion} />}
        <PLinkPure
          className="self-start"
          href="https://brand.porsche.com"
          target="_blank"
          icon="external"
          aria={{
            'aria-label': 'brand.porsche.com - Porsche Brand Guide',
            'aria-description': 'External link, opens in new tab',
          }}
        >
          brand.porsche.com
        </PLinkPure>
        <PText size="xx-small" color="contrast-medium">
          © {new Date().getFullYear()} Dr. Ing. h.c. F. Porsche AG.
          <ul className="flex flex-col gap-fluid-xs mt-fluid-xs">
            <li>
              <PLinkPure color="contrast-medium" size="2xs" icon="none" underline={true}>
                <Link href="https://brand.porsche.com/d/aXCSDnXaTiSY">Privacy Policy</Link>
              </PLinkPure>
            </li>
            <li>
              <PLinkPure color="contrast-medium" size="2xs" icon="none" underline={true}>
                <Link href="https://brand.porsche.com/d/S5pRV9qVeHyf">Legal Notice</Link>
              </PLinkPure>
            </li>
            <li>
              <PLinkPure color="contrast-medium" size="2xs" icon="none" underline={true}>
                <Link href="/license">License</Link>
              </PLinkPure>
            </li>
            <li>
              <PLinkPure color="contrast-medium" size="2xs" icon="none" underline={true}>
                <Link href="/accessibility-statement">Accessibility Statement</Link>
              </PLinkPure>
            </li>
          </ul>
        </PText>
      </footer>
    </>
  );
};
