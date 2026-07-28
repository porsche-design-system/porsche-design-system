'use client';

import { PTabsBar, type TabsBarUpdateEventDetail } from '@porsche-design-system/components-react/ssr';
import { type FrameworkWithNext, frameworkNameMap } from '@/models/framework';

type FrameworkTabsProps<T extends FrameworkWithNext> = {
  // The frameworks to offer, in display order.
  frameworks: readonly T[];
  framework: T;
  onFrameworkChange: (framework: T) => void;
  // Accessible name of the tab bar; must name what the selection applies to, since a page can carry
  // several independent framework tab bars.
  label: string;
  className?: string;
};

/** Framework selector shared by every code block that offers per-framework variants. */
export const FrameworkTabs = <T extends FrameworkWithNext>({
  frameworks,
  framework,
  onFrameworkChange,
  label,
  className,
}: FrameworkTabsProps<T>) => (
  <PTabsBar
    className={className ? `framework-select ${className}` : 'framework-select'}
    activeTabIndex={Math.max(frameworks.indexOf(framework), 0)}
    compact={true}
    background="surface"
    onUpdate={(e: CustomEvent<TabsBarUpdateEventDetail>) => onFrameworkChange(frameworks[e.detail.activeTabIndex])}
    aria={{ 'aria-label': label }}
  >
    {frameworks.map((f) => (
      <button key={f} type="button">
        {frameworkNameMap[f]}
      </button>
    ))}
  </PTabsBar>
);
