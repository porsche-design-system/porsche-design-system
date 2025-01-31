import { type Routes, sitemap } from '@/sitemap';
import { getPathnameRoutes } from '@/utils/pathname';
import {
  type AccordionUpdateEventDetail,
  PAccordion,
  PDivider,
  PLinkPure,
  PText,
} from '@porsche-design-system/components-react/ssr';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const initialAccordionState = Object.keys(sitemap).reduce<Record<keyof Routes, boolean>>((acc, section) => {
  acc[section] = false;
  return acc;
}, {});

export const Navigation = () => {
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
    const { keys } = getPathnameRoutes(pathname);
    if (keys[0]) {
      setOpenSections((prevState) => ({
        ...prevState,
        [keys[0]]: true,
      }));
    }
  }, [pathname]);

  return (
    <>
      <nav aria-label="Main">
        {Object.entries(sitemap).map(([path, category]) => (
          <PAccordion
            key={path}
            heading={category.name as string}
            headingTag="h3"
            compact={true}
            className={['Components', 'Must Know'].includes(category.name as string) ? 'mt-sm' : ''}
            open={openSections[path]}
            onUpdate={handleAccordionUpdate(path)}
          >
            {category.subPaths &&
              Object.entries(category.subPaths).map(([_, page]) => {
                // If page has subPaths (tabs) link to first tab
                const link = page.subPaths ? Object.values(page.subPaths)[0].path : page.path;
                return (
                  <PLinkPure
                    className="my-static-xs inline-block"
                    key={link}
                    icon="none"
                    stretch={true}
                    active={pathname.includes(`${page.path}/`)}
                  >
                    <Link href={link}>{page.name}</Link>
                  </PLinkPure>
                );
              })}
          </PAccordion>
        ))}
      </nav>
      <PDivider className="my-lg" />
      <footer className="flex flex-col gap-md">
        <PLinkPure className="self-start" href="https://brand.porsche.com" target="_blank" icon="external">
          brand.porsche.com
        </PLinkPure>
        <PText size="xx-small" color="contrast-medium">
          © 2025 Dr. Ing. h.c. F. Porsche AG.
          <ul className="flex flex-col gap-xs mt-xs">
            <li>
              <Link href="https://brand.porsche.com/d/aXCSDnXaTiSY">Privacy Policy</Link>
            </li>
            <li>
              <Link href="https://brand.porsche.com/d/S5pRV9qVeHyf">Legal Notice</Link>
            </li>
            <li>
              <Link href="/license">License</Link>
            </li>
          </ul>
        </PText>
      </footer>
    </>
  );
};
