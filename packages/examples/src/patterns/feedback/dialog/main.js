// Behaviour of the feedback dialog pattern: whether the modal is open, and which of its two steps is showing.
//
// The banner and the stylesheet come with the generated entry this file is inlined into, so neither is repeated here.
// No data is sent anywhere: the submission is simulated, so the flow can be reviewed end to end.
//
// `p-modal` is used in *controlled* mode – `open` is set from here, which is what allows the reset to wait for the
// closing animation instead of running while the dialog is still visible.

const trigger = document.getElementById('feedback-trigger');
const modal = document.getElementById('feedback-modal');
const closeButton = document.getElementById('feedback-close');
const question = document.getElementById('feedback-question');
const form = document.getElementById('feedback-form');
const rating = document.getElementById('feedback-rating');
const comment = document.getElementById('feedback-comment');
const submit = document.getElementById('feedback-submit');
const thanks = document.getElementById('feedback-thanks');
const thanksHeading = document.getElementById('feedback-thanks-heading');

const openModal = () => {
  modal.open = true;
};

const closeModal = () => {
  modal.open = false;
};

// Resetting the flow so the next open starts fresh is deferred until the modal
// is fully hidden. The `motionHiddenEnd` event fires once the close animation has
// finished, preventing the content from visibly snapping back mid-transition.
const resetFeedback = () => {
  rating.value = '';
  comment.value = '';
  thanks.hidden = true;
  question.hidden = false;
  comment.hidden = true;
  form.hidden = false;
  submit.loading = false;
  submit.hidden = true;
  closeButton.hidden = true;
};

// Choosing a rating reveals the optional free-text field and the submit button.
const revealCommentAndSubmit = () => {
  comment.hidden = false;
  submit.hidden = false;
};

// Reveal the confirmation once the "submission" has completed.
const showConfirmation = () => {
  submit.loading = false;
  form.hidden = true;
  question.hidden = true;
  thanks.hidden = false;
  closeButton.hidden = false;
  // Move focus to the confirmation so keyboard and screen reader users are informed.
  thanksHeading.focus();
};

trigger.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
modal.addEventListener('dismiss', closeModal);
modal.addEventListener('motionHiddenEnd', resetFeedback);
rating.addEventListener('change', revealCommentAndSubmit);
submit.addEventListener('click', () => {
  // Simulate a short server round-trip: show a loading spinner while "submitting",
  // then reveal the confirmation. In a real integration the request would happen here.
  submit.loading = true;
  window.setTimeout(showConfirmation, 1200);
});
