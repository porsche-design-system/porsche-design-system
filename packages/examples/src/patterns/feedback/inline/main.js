// Behaviour of the inline feedback pattern: which of the two steps – the question or the confirmation – is shown.
//
// The banner and the stylesheet come with the generated entry this file is inlined into, so neither is repeated here.
// No data is sent anywhere: the submission is simulated, so the flow can be reviewed end to end.

const question = document.getElementById('feedback-question');
const form = document.getElementById('feedback-form');
const rating = document.getElementById('feedback-rating');
const comment = document.getElementById('feedback-comment');
const submit = document.getElementById('feedback-submit');
const thanks = document.getElementById('feedback-thanks');
const thanksHeading = document.getElementById('feedback-thanks-heading');
const restart = document.getElementById('feedback-restart');

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
  // Move focus to the confirmation so keyboard and screen reader users are informed.
  thanksHeading.focus();
};

const restartFeedback = () => {
  rating.value = '';
  comment.value = '';
  submit.loading = false;
  submit.hidden = true;
  comment.hidden = true;
  thanks.hidden = true;
  question.hidden = false;
  form.hidden = false;
  // Return focus to the question so the flow is re-announced and can be repeated from the start.
  question.focus();
};

rating.addEventListener('change', revealCommentAndSubmit);
submit.addEventListener('click', () => {
  // Simulate a short server round-trip: show a loading spinner while "submitting",
  // then reveal the confirmation. In a real integration the request would happen here.
  submit.loading = true;
  window.setTimeout(showConfirmation, 1200);
});
restart.addEventListener('click', restartFeedback);
