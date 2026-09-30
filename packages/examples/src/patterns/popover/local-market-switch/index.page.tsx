import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { HeroVideo } from '../../../_partials/HeroVideo.tsx';
import { Brand } from '../../../_partials/header/Brand.tsx';
import { HeaderBar } from '../../../_partials/header/HeaderBar.tsx';
import { MainNav } from '../../../_partials/header/MainNav.tsx';
import { Script } from '../../../_partials/Script.tsx';

/**
 * The scheme of the `overlay` header: it is handed to the elements lying on the hero, never to the `<header>`.
 *
 * The two popovers are anchored in the bar but open as dialogs on top of the *page*, so the class goes on their
 * trigger buttons only – on a wrapper it would cascade into the flyouts and open a dark panel on a light page. That
 * is the same rule `Header` follows when it passes a `scheme` to its blocks.
 */
const scheme = 'scheme-dark';

/**
 * Services, settings and the logout of the profile menu.
 *
 * Rendered twice – once in the popover, once in the sheet that replaces it below `s` – because the two are separate
 * disclosures rather than two states of one. Extracting the body keeps them from drifting apart; only the heading
 * differs, since the sheet places it in its `header` slot.
 */
const ProfileMenu = () => (
  <>
    <div class="grid gap-fluid-xs">
      <p-heading tag="h3" size="sm" color="contrast-medium">
        Services
      </p-heading>
      <div class="grid gap-static-xs">
        <p-link-pure class="py-static-xs" stretch="true" icon="none">
          <a href="#">My Porsche App</a>
        </p-link-pure>
        <p-link-pure class="py-static-xs" stretch="true" icon="none">
          <a href="#">
            Messages
            <p-tag class="ms-static-xs" variant="secondary" compact>
              3
            </p-tag>
          </a>
        </p-link-pure>
        <p-link-pure class="py-static-xs" stretch="true" icon="none">
          <a href="#">Find Connect Services</a>
        </p-link-pure>
      </div>
    </div>
    <div class="grid gap-fluid-xs">
      <p-heading tag="h3" size="sm" color="contrast-medium">
        Settings
      </p-heading>
      <div class="grid gap-static-xs">
        <p-link-pure class="py-static-xs" stretch="true" icon="none">
          <a href="#">Profile settings</a>
        </p-link-pure>
      </div>
    </div>
    <p-button type="button" variant="secondary" icon="none">
      Logout
    </p-button>
  </>
);

/**
 * The two disclosures of the bar, in the place `Header` puts its meta actions.
 *
 * `MetaActions` is not reused here: its affordances are plain buttons and links, while these two own a popover each –
 * which is what this pattern is about. The bar itself, the navigation and the brand still come from the header
 * blocks, so a popover is shown in a real header rather than in a rebuilt one.
 */
const MarketAndProfile = () => (
  <>
    <p-popover id="market-popover" class="[--p-popover-w:22rem]">
      <p-button-pure
        id="market-button"
        slot="button"
        class={`${scheme} p-static-xs -m-static-xs`}
        type="button"
        icon="globe"
        hide-label="true"
        aria="{ 'aria-expanded': true }"
      >
        Local Market
      </p-button-pure>
      <div class="grid gap-fluid-sm">
        <div class="flex gap-static-md items-start">
          <p-text>Do you want to switch to your local market for correct content and pricing?</p-text>
          <p-button-pure
            id="market-dismiss"
            class="shrink-0 p-static-xs -m-static-xs"
            type="button"
            icon="close"
            hide-label="true"
          >
            Dismiss market popover
          </p-button-pure>
        </div>
        <div class="flex flex-wrap gap-static-sm">
          <p-button type="button" compact="true">
            Go to Local Market
          </p-button>
          <p-button type="button" variant="secondary" compact="true">
            International
          </p-button>
        </div>
      </div>
    </p-popover>
    <p-popover
      id="profile-popover"
      class="[--p-popover-w:22rem] [--p-popover-px:var(--spacing-static-lg)] [--p-popover-py:var(--spacing-static-lg)]"
    >
      <p-button-pure
        id="profile-button"
        slot="button"
        class={`${scheme} p-static-xs -m-static-xs`}
        type="button"
        icon="user"
        hide-label="true"
        aria="{ 'aria-expanded': false }"
      >
        User
      </p-button-pure>
      <div class="grid gap-fluid-md">
        <p-heading tag="h2" size="md">
          Welcome, John Doe
        </p-heading>
        <ProfileMenu />
      </div>
    </p-popover>
  </>
);

/**
 * Popover pattern – a message shown next to the affordance it belongs to, and a menu that changes container with the
 * viewport.
 *
 * Two things are demonstrated at once: a popover that is open on load (the market switch, which the page offers
 * rather than waits to be asked for) and a popover that becomes a `p-sheet` below `s`, where a panel anchored to a
 * header icon has no room left. Both are used in *controlled* mode, so the page owns which one is open – see
 * the script at the end of the page.
 */
const Page = () => (
  <PatternPage
    title="Popover 1"
    description="Popover on load next to the header affordance it belongs to, becoming a sheet on narrow viewports."
    beforeMain={
      // The fade keeps the contrast of the affordances over an arbitrary video – as in the `overlay` header, whose
      // bar, navigation and brand this pattern is built from.
      <header class="z-1 grid-template absolute inset-x-0 before:absolute before:inset-[0_0_-60px_0] before:-z-1 before:pointer-events-none before:bg-fade-to-b">
        <HeaderBar
          start={<MainNav currentPage="home" scheme={scheme} />}
          center={<Brand scheme={scheme} />}
          end={<MarketAndProfile />}
        />
      </header>
    }
    afterMain={
      // Last element of the body, like every dialog: it is opened from the header but is not part of the bar.
      <p-sheet id="profile-sheet" aria="{ 'aria-label': 'User profile' }">
        <p-heading slot="header" tag="h2" size="lg">
          Welcome, John Doe
        </p-heading>
        <div class="grid gap-fluid-md">
          <ProfileMenu />
        </div>
      </p-sheet>
    }
  >
    <main id="main" class="grid-template">
      <section class="scheme-dark z-0 col-full grid grid-cols-subgrid items-end h-[clamp(480px,80vh,1000px)]">
        <HeroVideo>
          <div class="z-1 col-extended row-span-full mb-fluid-lg">
            <p-heading tag="h1" size="3xl">
              <span class="text-md block">Pattern</span>
              Popover
            </p-heading>
          </div>
        </HeroVideo>
      </section>
    </main>
    <Script>{
      /* language=JavaScript */ `
      // Behaviour of the popover pattern: which of the two disclosures of the header is open, and in which container.
      //
      // The navigation and the hero video bring their own behaviour, rendered by the partials they are built from. Only
      // what is specific to this pattern is written here.
      //
      // Both popovers and the sheet are used in *controlled* mode: "open" is set from here, so the page always knows
      // which one is showing and can mirror it onto the "aria-expanded" of the trigger. In uncontrolled mode the
      // component owns that state and the page could not keep the two triggers mutually exclusive.

      const marketPopover = document.getElementById('market-popover');
      const marketButton = document.getElementById('market-button');
      const marketDismiss = document.getElementById('market-dismiss');
      const profilePopover = document.getElementById('profile-popover');
      const profileSheet = document.getElementById('profile-sheet');
      const profileButton = document.getElementById('profile-button');

      // A panel anchored to a header icon has no room below "s", so the profile menu is a sheet there and a popover
      // above.
      const desktopQuery = window.matchMedia('(min-width: 480px)');

      // Keeps a trigger's "aria-expanded" in sync with the disclosure it controls. "hide-label" only hides the label
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
        // Return focus to the trigger for keyboard activation only: pressing Enter/Space synthesizes a click with
        // "detail" 0, while pointer clicks report "detail >= 1". Without it the dismissed panel takes the focused
        // button with it and the next Tab restarts at the top of the page.
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
    `
    }</Script>
  </PatternPage>
);

export default Page;
