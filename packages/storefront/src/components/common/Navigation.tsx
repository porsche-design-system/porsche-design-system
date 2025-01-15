import { type Routes, sitemap } from '@/sitemap';
import { getPathnameRoutes } from '@/utils/pathname';
import { type AccordionUpdateEventDetail, PAccordion, PLinkPure } from '@porsche-design-system/components-react/ssr';
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
      {Object.entries(sitemap).map(([path, category]) => (
        <PAccordion
          key={path}
          heading={category.name}
          headingTag="h3"
          compact={true}
          className={['Components', 'Must Know'].includes(category.name) ? 'mt-sm' : ''}
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
                  active={pathname.includes(page.path)}
                >
                  <Link href={link}>{page.name}</Link>
                </PLinkPure>
              );
            })}
        </PAccordion>
      ))}
    </>
  );
};
