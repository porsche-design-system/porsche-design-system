// Behaviour of the feature tour: exactly one coachmark is open at a time, and the sequence can be walked with the
// keyboard alone.
//
// Every step is used in *controlled* mode, so the open state lives here rather than in the components – that is what
// makes "open the next one and close the current one" a single, atomic step.

const steps = Array.from(document.querySelectorAll('[data-tour-step]'));
const restartButton = document.getElementById('restart-tour');

let current = 0;

// The controls of a step are only rendered once its popover is open, so focus is moved two frames later – one for the
// open state to apply, one for the panel to be laid out.
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

// Tells keyboard from pointer activation: pressing Enter or Space synthesizes a click with `detail` 0, while
// mouse and touch report `detail >= 1`. Focus is only pulled into the tour for keyboard users, so pointer users are
// not yanked into the coachmark they just opened.
const isKeyboardActivation = (event) => event.detail === 0;

// An index outside the range (-1) closes every step, which is how the tour ends.
const showStep = (index, moveFocus = false) => {
  current = index;
  for (const [i, step] of steps.entries()) {
    step.open = i === index;
  }
  // Without this, closing the current popover takes the activated button with it, focus falls back to <body> and the
  // next Tab restarts the tab order at the top of the page.
  if (moveFocus) {
    focusAfterRender(getPrimaryAction(steps[index]));
  }
};

// Ending the tour returns focus to the affordance the last step pointed at, so the user is left in the header they
// were just told about instead of at the start of the document.
const endTour = (moveFocus = false) => {
  const lastTrigger = getTrigger(steps[current]);
  showStep(-1);
  if (moveFocus) {
    lastTrigger?.focus();
  }
};

// The markup opens the first step; setting every step from here puts them all into controlled mode.
showStep(0);

// One listener for the controls of every step: the click is retargeted to the `p-button`/`p-button-pure` host at the
// shadow boundary, so the element carrying `data-tour` is what `closest()` finds.
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
