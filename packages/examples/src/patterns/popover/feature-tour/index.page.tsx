import type { JSX } from 'preact';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Brand } from '../../../_partials/header/Brand.tsx';
import { HeaderBar } from '../../../_partials/header/HeaderBar.tsx';
import { Script } from '../../../_partials/Script.tsx';

/**
 * Icon names accepted by the PDS components, derived from the JSX typings – the same trick `MetaActions` uses, so a typo
 * is a compile error without importing the icon list.
 */
type IconName = NonNullable<JSX.IntrinsicElements['p-icon']['name']>;

type TourStep = {
  /** Accessible name of the affordance the coachmark is anchored to; `hide-label` only hides it visually. */
  label: string;
  icon: IconName;
  /** Only the menu button keeps its label from `s` upwards, exactly as in the real header. */
  hideLabel?: string;
  heading: string;
  copy: string;
};

/**
 * The tour, in the order it is walked through. The steps are data rather than four copies of the same markup: they
 * differ in their anchor and their copy only, and `Coachmark` derives the rest – the counter, whether there is a
 * "Back" and whether the primary action reads "Next" or "Done".
 */
const tourSteps: TourStep[] = [
  {
    label: 'Menu',
    icon: 'menu-lines',
    hideLabel: '{ base: true, s: false }',
    heading: 'Main navigation',
    copy: 'Open the menu to explore every section of the site.',
  },
  {
    label: 'Search',
    icon: 'search',
    heading: 'Search',
    copy: 'Find models, dealers and content from anywhere on the site.',
  },
  {
    label: 'Notifications',
    icon: 'bell',
    heading: 'Notifications',
    copy: 'Your latest updates and messages appear right here.',
  },
  {
    label: 'Your account',
    icon: 'user',
    heading: 'Your account',
    copy: 'Manage your profile, orders and settings from here.',
  },
];

type CoachmarkProps = {
  step: TourStep;
  /** Zero-based position in `tourSteps`; the counter and the wording of the actions follow from it. */
  index: number;
};

/**
 * One step of the tour: a popover anchored to the header affordance it explains.
 *
 * The controls carry `data-tour` instead of an id each. A tour has one set of actions repeated per step, so the
 * behaviour listens once on the document and reads the action off the activated control – three ids per step would be
 * twelve names to keep in sync for the same three buttons. The popovers themselves are marked with `data-tour-step`,
 * which is what puts them in order for the script.
 */
const Coachmark = ({ step: { label, icon, hideLabel = 'true', heading, copy }, index }: CoachmarkProps) => {
  const isLast = index === tourSteps.length - 1;

  return (
    <p-popover class="[--p-popover-w:20rem]" open={index === 0} data-tour-step>
      <p-button-pure slot="button" class="p-static-xs -m-static-xs" type="button" icon={icon} hide-label={hideLabel}>
        {label}
      </p-button-pure>
      <div class="grid gap-static-sm">
        <div class="flex items-center justify-between gap-static-md">
          <p-text size="xs" color="contrast-medium">{`Step ${index + 1} of ${tourSteps.length}`}</p-text>
          <p-button-pure
            class="shrink-0 p-static-xs -m-static-xs"
            type="button"
            icon="close"
            hide-label="true"
            data-tour="skip"
          >
            Dismiss tips
          </p-button-pure>
        </div>
        <p-heading tag="h2" size="sm" weight="semibold">
          {heading}
        </p-heading>
        <p-text>{copy}</p-text>
        <div class="flex gap-static-sm">
          {index > 0 && (
            <p-button type="button" variant="secondary" compact="true" data-tour="back">
              Back
            </p-button>
          )}
          <p-button type="button" compact="true" data-tour="next">
            {isLast ? 'Done' : 'Next'}
          </p-button>
        </div>
      </div>
    </p-popover>
  );
};

const [firstStep, ...remainingSteps] = tourSteps;

/**
 * Popover pattern – a sequence of coachmarks introducing the affordances of the header, one at a time.
 *
 * The header is composed from the shared blocks (`HeaderBar`, `Brand`) so the coachmarks are shown in a real bar; its
 * affordances are the anchors of the tour rather than working controls, which is why this variation does not go
 * through `Header` – there the meta actions are data, here each one owns a popover.
 *
 * Exactly one step is open at a time, so every popover is used in *controlled* mode and the script owns which. The
 * tour is restartable from the content below, because a guided tour that can only be seen once is not a pattern that
 * can be reviewed.
 */
const Page = () => (
  <PatternPage
    title="Popover 3"
    description="A sequence of coachmarks walking through the affordances of the header, one step at a time."
    beforeMain={
      <header class="grid-template border-b border-contrast-lower">
        <HeaderBar
          start={<Coachmark step={firstStep} index={0} />}
          center={<Brand />}
          end={remainingSteps.map((step, index) => <Coachmark key={step.label} step={step} index={index + 1} />)}
        />
      </header>
    }
  >
    <main id="main" class="grid-template">
      <section class="col-wide my-fluid-lg grid gap-fluid-md">
        <p-heading tag="h1" size="xl">
          Feature tour
        </p-heading>
        <p-text>
          On first visit, a sequence of popovers walks the user through the key areas of the interface, one step at a
          time. Only a single step is open at once.
        </p-text>
        <p-button class="justify-self-start" id="restart-tour" type="button" variant="secondary" icon="refresh">
          Restart tour
        </p-button>
      </section>
    </main>
    <Script>{
      /* language=JavaScript */ `
      // Behaviour of the feature tour: exactly one coachmark is open at a time, and the sequence can be walked with the
      // keyboard alone.
      //
      // Every step is used in *controlled* mode, so the open state lives here rather than in the components – that is
      // what makes "open the next one and close the current one" a single, atomic step.

      const steps = Array.from(document.querySelectorAll('[data-tour-step]'));
      const restartButton = document.getElementById('restart-tour');

      let current = 0;

      // The controls of a step are only rendered once its popover is open, so focus is moved two frames later – one for
      // the open state to apply, one for the panel to be laid out.
      const focusAfterRender = (element) => {
        if (!element) {
          return;
        }
        requestAnimationFrame(() => requestAnimationFrame(() => element.focus()));
      };

      /** The affordance a step is anchored to, which is also where focus returns when the tour ends. */
      const getTrigger = (step) => step?.querySelector('[slot="button"]');
      /** The primary action of a step – the natural place to land, so the tour can be continued from the keyboard. */
      const getPrimaryAction = (step) => step?.querySelector('[data-tour="next"]');

      // Tells keyboard from pointer activation: pressing Enter or Space synthesizes a click with "detail" 0, while
      // mouse and touch report "detail >= 1". Focus is only pulled into the tour for keyboard users, so pointer users
      // are not yanked into the coachmark they just opened.
      const isKeyboardActivation = (event) => event.detail === 0;

      // An index outside the range (-1) closes every step, which is how the tour ends.
      const showStep = (index, moveFocus = false) => {
        current = index;
        for (const [i, step] of steps.entries()) {
          step.open = i === index;
        }
        // Without this, closing the current popover takes the activated button with it, focus falls back to <body> and
        // the next Tab restarts the tab order at the top of the page.
        if (moveFocus) {
          focusAfterRender(getPrimaryAction(steps[index]));
        }
      };

      // Ending the tour returns focus to the affordance the last step pointed at, so the user is left in the header
      // they were just told about instead of at the start of the document.
      const endTour = (moveFocus = false) => {
        const lastTrigger = getTrigger(steps[current]);
        showStep(-1);
        if (moveFocus) {
          lastTrigger?.focus();
        }
      };

      // The markup opens the first step; setting every step from here puts them all into controlled mode.
      showStep(0);

      // One listener for the controls of every step: the click is retargeted to the "p-button"/"p-button-pure" host at
      // the shadow boundary, so the element carrying "data-tour" is what "closest()" finds.
      document.addEventListener('click', (e) => {
        const control = e.target.closest?.('[data-tour]');
        if (!control) {
          return;
        }

        const viaKeyboard = isKeyboardActivation(e);

        switch (control.getAttribute('data-tour')) {
          case 'next':
            if (current + 1 < steps.length) {
              showStep(current + 1, viaKeyboard);
            } else {
              endTour(viaKeyboard);
            }
            break;
          case 'back':
            showStep(Math.max(0, current - 1), viaKeyboard);
            break;
          case 'skip':
            endTour(viaKeyboard);
            break;
        }
      });

      // Escape or a click outside the current step ends the tour. The component restores focus to its own trigger on
      // keyboard dismissal, so nothing is forced here.
      for (const step of steps) {
        step.addEventListener('dismiss', () => endTour());
      }

      // A tour that can only be seen once cannot be reviewed, so this example offers it again.
      restartButton.addEventListener('click', (e) => showStep(0, isKeyboardActivation(e)));
    `
    }</Script>
  </PatternPage>
);

export default Page;
