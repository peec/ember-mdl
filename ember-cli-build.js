/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    snippetPaths: ['snippets']
    // Add options here
  });

  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  app.import('bower_components/material-design-lite/src/images/buffer.svg', {destDir: 'images'});
  app.import('bower_components/material-design-lite/src/images/tick.svg', {destDir: 'images'});
  app.import('bower_components/material-design-lite/src/images/tick-mask.svg', {destDir: 'images'});

  return app.toTree();
};
