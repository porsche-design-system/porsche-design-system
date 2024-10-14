import './style.scss';

document.querySelectorAll('p-flyout').forEach((el) => el.addEventListener('dismiss', (e) => (e.target.open = false)));
document.querySelectorAll('p-modal').forEach((el) => el.addEventListener('dismiss', (e) => (e.target.open = false)));

const modalRulesElement = document.getElementById('modal-rules');
const modalRemovePluginElement = document.getElementById('modal-remove-plugin');
const modalDeleteChatElement = document.getElementById('modal-delete-chat');
const flyoutPluginsElement = document.getElementById('flyout-plugins');

document.querySelectorAll('[data-onclick]').forEach((el) => {
  // const showModalRemovePlugin = () => (modalRemovePluginElement.open = true);
  // const dismissModalRemovePlugin = () => (modalRemovePluginElement.open = false);
  el.addEventListener('click', (e) => {
    switch (e.target.getAttribute('data-onclick')) {
      case 'show-flyout-plugins':
        flyoutPluginsElement.open = true;
        break;
      case 'show-modal-rules':
        modalRulesElement.open = true;
        break;
      case 'dismiss-modal-rules':
        modalRulesElement.open = false;
        break;
      case 'show-modal-remove-plugin':
        modalRemovePluginElement.open = true;
        break;
      case 'dismiss-modal-remove-plugin':
        modalRemovePluginElement.open = false;
        break;
      case 'remove-plugin':
        e.target.loading = true;
        // simulates an API call
        setTimeout(() => {
          e.target.loading = false;
          modalRemovePluginElement.open = false;
        }, 1000);
        break;
      case 'show-modal-delete-chat':
        modalDeleteChatElement.open = true;
        break;
      case 'dismiss-modal-delete-chat':
        modalDeleteChatElement.open = false;
        break;
      case 'delete-chat':
        e.target.loading = true;
        // simulates an API call
        setTimeout(() => {
          e.target.loading = false;
          modalDeleteChatElement.open = false;
        }, 1000);
        break;
    }
  });
});
