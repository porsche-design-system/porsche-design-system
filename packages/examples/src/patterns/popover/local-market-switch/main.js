// Behaviour of the popover pattern: which of the two disclosures of the header is open, and in which container.
//
// The navigation and the hero video are wired up by the shared snippets (`assets/header.js`, `assets/video.js`), which
// the build inlines into this page's entry because the markup renders the ids they are registered for. Only what is
// specific to this pattern is written here.
//
// Both popovers and the sheet are used in *controlled* mode: `open` is set from here, so the page always knows which
// one is showing and can mirror it onto the `aria-expanded` of the trigger. In uncontrolled mode the component owns
// that state and the page could not keep the two triggers mutually exclusive.

const marketPopover = document.getElementById('market-popover');
const marketButton = document.getElementById('market-button');
const marketDismiss = document.getElementById('market-dismiss');
const profilePopover = document.getElementById('profile-popover');
const profileSheet = document.getElementById('profile-sheet');
const profileButton = document.getElementById('profile-button');

// A panel anchored to a header icon has no room below `s`, so the profile menu is a sheet there and a popover above.
const desktopQuery = window.matchMedia('(min-width: 480px)');

// Keeps a trigger's `aria-expanded` in sync with the disclosure it controls. `hide-label` only hides the label
// visually, so the button keeps its accessible name and only the state has to be announced.
const setExpanded = (button, isExpanded) => {
  button.aria = { 'aria-expanded': isExpanded };
};

/** The profile menu, in whichever container the current viewport calls for. Closing covers both. */
const setProfileOpen = (isOpen) => {
  const useSheet = isOpen && !desktopQuery.matches;
  profilePopover.open = isOpen && !useSheet;
  profileSheet.open = useSheet;
  setExpanded(profileButton, isOpen);
};

const setMarketOpen = (isOpen) => {
  marketPopover.open = isOpen;
  setExpanded(marketButton, isOpen);
};

// The market switch is the message the page offers on load; the profile menu waits to be asked for.
setMarketOpen(true);
setProfileOpen(false);

marketButton.addEventListener('click', () => {
  const isOpen = !marketPopover.open;
  setProfileOpen(false);
  setMarketOpen(isOpen);
});

marketDismiss.addEventListener('click', (e) => {
  setMarketOpen(false);
  // Return focus to the trigger for keyboard activation only: pressing Enter/Space synthesizes a click with `detail`
  // 0, while pointer clicks report `detail >= 1`. Without it the dismissed panel takes the focused button with it and
  // the next Tab restarts at the top of the page.
  if (e.detail === 0) {
    marketButton.focus();
  }
});

profileButton.addEventListener('click', () => {
  const isOpen = !(profilePopover.open || profileSheet.open);
  setMarketOpen(false);
  setProfileOpen(isOpen);
});

// Escape, a click outside or focus leaving the panel request a close in controlled mode – the components restore
// focus to the trigger themselves, so only the state has to be written back.
marketPopover.addEventListener('dismiss', () => setMarketOpen(false));
profilePopover.addEventListener('dismiss', () => setProfileOpen(false));
profileSheet.addEventListener('dismiss', () => setProfileOpen(false));

// Crossing the breakpoint moves an open profile menu into the other container instead of closing it.
desktopQuery.addEventListener('change', () => setProfileOpen(profilePopover.open || profileSheet.open));
