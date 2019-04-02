var PluginSassDependencyCollector = {

  /**
   * The function defined as the onready callback within the plugin configuration.
   */
  init: function () {

    Panels.add({
      'id': 'sg-panel-auto-sass',
      'name': 'SCSS',
      'default': false,
      'templateID': 'pl-panel-template-code',
      'httpRequest': true,
      'httpRequestReplace': '.scss',
      'httpRequestCompleted': false,
      'prismHighlight': true,
      'language': 'sass',
      'keyCombo': 'ctrl+shift+z'
    });

  }
};