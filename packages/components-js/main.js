import './style.scss';

document.querySelectorAll('p-flyout').forEach((el) => el.addEventListener('dismiss', (e) => (e.target.open = false)));
document.querySelectorAll('p-modal').forEach((el) => el.addEventListener('dismiss', (e) => (e.target.open = false)));

const updateBackgroundOpacity = (opacity) => {
  document.querySelector('p-canvas > [slot="background"]').style.opacity = opacity;
};

const updateTemplate = (id) => {
  document.querySelectorAll('p-canvas > :not(template):not([slot])').forEach((el) => el.remove());
  document.querySelector('p-canvas').appendChild(document.querySelector(`template${id}`).content.cloneNode(true));
};

const scrollToBottom = () => {
  setTimeout(() => {
    window.scrollTo({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });
  }, 40);
};

const updateLayout = (hash) => {
  switch (hash) {
    case '#template-chat':
      updateBackgroundOpacity(0.3);
      updateTemplate('#template-chat');
      scrollToBottom();
      break;
    default:
      updateBackgroundOpacity(1);
      updateTemplate('#template-intro');
      break;
  }
};

window.addEventListener('hashchange', () => updateLayout(window.location.hash));
updateLayout(window.location.hash);
