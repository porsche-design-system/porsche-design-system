// Behaviour of the admin panel: the two sidebars of the canvas, the categories of its navigation, the tabs above the
// list, the search dialog and the color scheme switch.
//
// Every one of them is used in *controlled* mode: the components report what the user asked for and this page writes
// the new state back. That is what lets the sidebar affordance mirror its sidebar onto `aria-expanded` and the search
// dialog be opened from a button that is not part of it. None of these events bubbles, so each element is wired up
// itself rather than through a listener on a container.

const canvas = document.getElementById('admin-canvas');
const searchButton = document.getElementById('search-button');
const searchDialog = document.getElementById('search-dialog');
const settingsButton = document.getElementById('settings-button');
const sidebarNav = document.getElementById('sidebar-nav');
const modelTabs = document.getElementById('model-tabs');
const schemeSelect = document.getElementById('scheme-select');

// Keeps the affordance and the sidebar it opens in sync. `hide-label` only hides the label visually, so the button
// keeps its accessible name and only the state has to be announced.
const setSettingsOpen = (isOpen) => {
  canvas.sidebarEndOpen = isOpen;
  settingsButton.aria = { 'aria-expanded': isOpen };
};

canvas.addEventListener('sidebarStartUpdate', (e) => {
  canvas.sidebarStartOpen = e.detail.open;
});
canvas.addEventListener('sidebarEndDismiss', () => setSettingsOpen(false));
settingsButton.addEventListener('click', () => setSettingsOpen(!canvas.sidebarEndOpen));

// The navigation starts out beside the content where there is room for it, and collapsed below that, where the canvas
// turns it into a flyout on top of the page.
canvas.sidebarStartOpen = window.matchMedia('(min-width: 760px)').matches;

for (const accordion of sidebarNav.querySelectorAll('p-accordion')) {
  accordion.addEventListener('update', (e) => {
    accordion.open = e.detail.open;
  });
}

modelTabs.addEventListener('update', (e) => {
  modelTabs.activeTabIndex = e.detail.activeTabIndex;
});

searchButton.addEventListener('click', () => {
  searchDialog.open = true;
});

// Escape, a click outside or the close button request a close in controlled mode – the component restores focus to
// the element the dialog was opened from itself, so only the state has to be written back.
searchDialog.addEventListener('dismiss', () => {
  searchDialog.open = false;
});

// The color scheme is a class on the document element, so it reaches the sidebars as well – they are rendered on top
// of the page and would not be covered by a scheme set further down. The three class names appear nowhere in the
// markup, which is why they are listed here: Tailwind scans this file too and therefore emits all three.
const schemes = ['scheme-light', 'scheme-dark', 'scheme-light-dark'];

schemeSelect.addEventListener('change', (e) => {
  document.documentElement.classList.remove(...schemes);
  document.documentElement.classList.add(e.detail.value);
});
