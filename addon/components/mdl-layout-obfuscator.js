import Ember from 'ember';
import layout from '../templates/components/mdl-layout-obfuscator';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['mdl-layout__obfuscator'],
  classNameBindings: ['isActive:is-visible'],
  click() {
    this.sendAction('action');
  }
});
