import { componentsReady } from '@porsche-design-system/components-js';

// Behaviour of the priority navigation: keep the bar on one line by moving the entries that no longer fit into the
// "More" popover, and back out again when there is room.
//
// The popover is used in *controlled* mode – `open` is set from here, even to `false` on load – so the page always
// knows whether it is expanded and can mirror that onto the `aria-expanded` of its trigger.

const navBar = document.getElementById('nav-bar');
const moreTrigger = document.getElementById('more-trigger');
const morePopover = document.getElementById('more-popover');
const moreButton = document.getElementById('more-button');
const overflowList = document.getElementById('overflow-list');

const fits = () => navBar.scrollWidth <= navBar.clientWidth;

const setExpanded = (isExpanded) => {
  moreButton.aria = { 'aria-expanded': isExpanded };
};

const setOpen = (isOpen) => {
  morePopover.open = isOpen;
  setExpanded(isOpen);
};

setOpen(false);

moreButton.addEventListener('click', () => setOpen(!morePopover.open));

// Escape, a click outside or focus leaving the panel request a close in controlled mode.
morePopover.addEventListener('dismiss', () => setOpen(false));

// The trigger has to be shown to reserve its own width while measuring; it is taken out again only once the popover
// ends up empty. A trigger that is no longer there cannot be expanded, so its state is reset with it.
const syncTrigger = () => {
  moreTrigger.hidden = overflowList.children.length === 0;
  if (moreTrigger.hidden && morePopover.open) {
    setOpen(false);
  }
};

// Incremental and idempotent: instead of emptying the popover on every resize (which makes an open one flicker), only
// the minimum number of entries is moved. When the boundary does not change, no DOM mutation happens at all – so an
// open popover stays perfectly still.
const recalc = () => {
  // Show the trigger, so its width is accounted for while measuring.
  moreTrigger.hidden = false;

  // Too wide → push entries from the end of the bar into the popover until the bar fits again.
  while (!fits()) {
    const lastVisible = moreTrigger.previousElementSibling;
    if (!lastVisible) {
      break; // Nothing left to collapse.
    }
    overflowList.insertBefore(lastVisible, overflowList.firstChild);
  }

  // Room to spare → try pulling entries back out, one at a time. If the pulled entry no longer fits, put it straight
  // back and stop, which is what keeps the boundary from oscillating.
  while (overflowList.firstElementChild) {
    navBar.insertBefore(overflowList.firstElementChild, moreTrigger);
    if (!fits()) {
      overflowList.insertBefore(moreTrigger.previousElementSibling, overflowList.firstChild);
      break;
    }
  }

  syncTrigger();
};

// The entries are `p-link-pure` elements, so their width is only final once the components have upgraded – measuring
// before that would collapse entries that do fit.
componentsReady(navBar).then(recalc);

// Coalesce bursts of resize events into a single measurement per animation frame.
//
// A ResizeObserver can fire many times in quick succession (e.g. while the user drags the window edge, dozens of
// callbacks per second). Running the layout-reading `recalc` on every single one is wasteful and can cause visible
// jitter, so at most one run per frame is scheduled:
//   - `pendingFrame` holds the id of a pending requestAnimationFrame, or `null` when none is scheduled.
//   - The first event schedules a frame; any further events arriving before it runs are ignored, because a recalc is
//     already queued and will read the *latest* layout when it executes.
//   - Inside the frame `pendingFrame` is reset first, so the next burst can schedule a fresh run.
//
// Skipping events is safe: the observer is only a "something changed" signal – it never feeds a size into `recalc`,
// which re-measures the live layout itself. Do not capture a width here and pass it in, as that would drop data on
// the skipped events.
let pendingFrame = null;
const scheduleRecalc = () => {
  if (pendingFrame !== null) {
    return; // A recalc is already queued for the next frame.
  }
  pendingFrame = requestAnimationFrame(() => {
    pendingFrame = null;
    recalc();
  });
};

new ResizeObserver(scheduleRecalc).observe(navBar);
