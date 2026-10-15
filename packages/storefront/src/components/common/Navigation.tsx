import { componentMeta } from '@porsche-design-system/component-meta';
import {
  type AccordionUpdateEventDetail,
  PAccordion,
  PDivider,
  PHeading,
  PLinkPure,
  PText,
} from '@porsche-design-system/components-react/ssr';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { DocsLink } from '@/components/common/DocsLink';
import { VersionSelect } from '@/components/common/VersionSelect';
import type { DocsHref } from '@/links';
import type { PDSVersionGroup } from '@/models/pdsVersion';
import { getLandingPath, getPath, type Page, sitemap } from '@/sitemap';
import { getFlags } from '@/utils/getFlags';
import { getPathnameRoutes } from '@/utils/pathname';

const initialAccordionState = Object.keys(sitemap).reduce<Record<string, boolean>>((acc, section) => {
  acc[section] = false;
  return acc;
}, {});

/**
 * Maps the first section key of each logical group to its group label.
 * Sections without an entry belong to the preceding group (no extra header rendered).
 */
const SECTION_GROUP_HEADERS: Partial<Record<string, string>> = {
  news: 'Get Started', // designing, developing
  skills: 'AI (experimental)',
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
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(initialAccordionState);

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
      {pdsVersion.all.length > 1 && <VersionSelect pdsVersion={pdsVersion} />}
      <nav aria-label="Main" className="mt-fluid-md flex flex-col gap-static-sm">
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
                  {category.name}
                </PHeading>
                {Object.entries(category.pages).map(([pageKey, page]: [string, Page]) => {
                  const link = getLandingPath(path, pageKey);
                  const isCurrent = pathname?.includes(`${getPath(path, pageKey)}/`);
                  return (
                    <PLinkPure
                      key={link}
                      icon="none"
                      active={isCurrent}
                      onClick={() => onNavigate()}
                      className={'w-full ps-static-sm'}
                    >
                      <DocsLink href={link as DocsHref} aria-current={isCurrent ? 'page' : undefined}>
                        {page.name}
                        {page.tagName && <> {getFlags(componentMeta[page.tagName])}</>}
                      </DocsLink>
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
                <DocsLink href="https://brand.porsche.com/d/aXCSDnXaTiSY">Privacy Policy</DocsLink>
              </PLinkPure>
            </li>
            <li>
              <PLinkPure color="contrast-medium" size="2xs" icon="none" underline={true}>
                <DocsLink href="https://brand.porsche.com/d/S5pRV9qVeHyf">Legal Notice</DocsLink>
              </PLinkPure>
            </li>
            <li>
              <PLinkPure color="contrast-medium" size="2xs" icon="none" underline={true}>
                <DocsLink href="/license">License</DocsLink>
              </PLinkPure>
            </li>
            <li>
              <PLinkPure color="contrast-medium" size="2xs" icon="none" underline={true}>
                <DocsLink href="/accessibility-statement">Accessibility Statement</DocsLink>
              </PLinkPure>
            </li>
          </ul>
        </PText>
      </footer>
    </>
  );
};
