'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const MAIN_CONTENT_ID = 'main-content';
const CONTENT_NAVIGATION_ID = 'content-navigation';

/**
 * Improves keyboard accessibility on client-side navigation.
 *
 * When the route changes (e.g. activating a link in the sidebar), focus would
 * otherwise remain on the activated link, forcing keyboard users to tab back
 * through the navigation to reach the content. This hook moves focus to the
 * main content section instead, so the next `Tab` continues within the page
 * content.
 *
 * Focus is intentionally not moved on the initial page load, only after
 * subsequent client-side navigations.
 *
 * Exception: when the navigation is triggered from within the content tabs-bar
 * (`#content-navigation`), focus is left on the activated tab so it doesn't jump
 * away from the control the user just used.
 */
export function useFocusMainContentOnRouteChange(): void {
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    // Skip the initial page load – only react to subsequent client-side navigations.
    if (previousPathname.current === null || previousPathname.current === pathname) {
      previousPathname.current = pathname;
      return;
    }
    previousPathname.current = pathname;

    // If the navigation originated from the content tabs-bar, keep focus on the
    // activated tab instead of moving it to the main content section.
    if (document.getElementById(CONTENT_NAVIGATION_ID)?.contains(document.activeElement)) {
      return;
    }

    // Defer one frame so the newly navigated page is committed to the DOM.
    const rafId = requestAnimationFrame(() => {
      const mainContent = document.getElementById(MAIN_CONTENT_ID);
      if (!mainContent) {
        return;
      }

      // Move focus without scrolling – navigation already resets the scroll position.
      mainContent.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname]);
}
