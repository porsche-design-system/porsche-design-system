'use client';

import { PTabsBar, type TabsBarUpdateEventDetail } from '@porsche-design-system/components-react/ssr';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import { type FrameworkWithNext, frameworkNameMap, frameworks } from '@/models/framework';

type FrameworkTabsProps = {
  // Additionally offer a Next tab, for content that has a Next.js specific variant.
  next?: boolean;
  // Accessible name of the tab bar; must name what the selection applies to, since a page can carry
  // several framework tab bars.
  label: string;
  className?: string;
};

/**
 * Framework selector shared by every code block that offers per-framework variants. Selection is held
 * in the storefront-wide framework context, so every tab bar and code block stays in sync; components
 * that need the selection read it from `useStorefrontFramework` themselves.
 */
export const FrameworkTabs = ({ next, label, className }: FrameworkTabsProps) => {
  const { storefrontFramework, framework, setStorefrontFramework } = useStorefrontFramework();
  const options: readonly FrameworkWithNext[] = next ? [...frameworks, 'next'] : frameworks;
  // Next stays selected only while a page offers it, otherwise the framework it maps to takes over.
  const selectedFramework = options.includes(storefrontFramework) ? storefrontFramework : framework;

  return (
    <PTabsBar
      className={className ? `framework-select ${className}` : 'framework-select'}
      activeTabIndex={Math.max(options.indexOf(selectedFramework), 0)}
      compact={true}
      background="surface"
      onUpdate={(e: CustomEvent<TabsBarUpdateEventDetail>) => setStorefrontFramework(options[e.detail.activeTabIndex])}
      aria={{ 'aria-label': label }}
    >
      {options.map((option) => (
        <button key={option} type="button">
          {frameworkNameMap[option]}
        </button>
      ))}
    </PTabsBar>
  );
};
