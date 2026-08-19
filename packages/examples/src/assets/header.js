// DO NOT USE IN PRODUCTION!
// EXAMPLE CODE FOR DEMONSTRATION PURPOSE ONLY.

// Behaviour of the header navigation: the menu button opens the drilldown, and the drilldown reports the level the
// user drilled into. Every header variant is built on that drilldown, so it is written once here and inlined into the
// `main.js` of every page rendering the menu button.

const navDrilldown = document.getElementById('nav-drilldown');
const navButton = document.getElementById('nav-button');

if (navButton && navDrilldown) {
  navButton.addEventListener('click', () => {
    navDrilldown.open = true;
  });

  // Closing is requested by the component (Escape, the close button, a click on the backdrop) – the open state is
  // owned by the page, so it has to be written back.
  navDrilldown.addEventListener('dismiss', (e) => {
    e.target.open = false;
  });

  navDrilldown.addEventListener('update', (e) => {
    e.target.activeIdentifier = e.detail.activeIdentifier;
  });
}
