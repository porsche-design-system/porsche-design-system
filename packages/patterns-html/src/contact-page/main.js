// Dummy behaviour: no backend, just an accessible confirmation message.
document.querySelector('.contact-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const status = document.getElementById('form-status');

  if (!form.checkValidity()) {
    status.textContent = 'Please complete all required fields.';
    form.querySelector(':invalid')?.focus();
    return;
  }

  status.textContent = 'Thanks! This is a demo, so nothing was sent.';
  form.reset();
});
