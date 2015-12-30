import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('menus');
  this.route('layout');
  this.route('progress');
  this.route('toggles');
  this.route('buttons');
  this.route('sliders');
  this.route('tables');
  this.route('text-fields');
  this.route('badges');
  this.route('cards');
});

export default Router;
