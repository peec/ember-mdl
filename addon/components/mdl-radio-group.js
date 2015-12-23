import Ember from 'ember';
import layout from '../templates/components/mdl-radio-group';

export default Ember.Component.extend({
  layout: layout,
  radios: Ember.A([]),

  init() {
    this._super(...arguments);
    this.set('radios', Ember.A([]));
  },

  uncheckAllExcept(component) {
    var components = this.get('radios').filter((x) => x != component);
    components.forEach(function (c) {
      c.set('checked', false);
    });
  },
  registerRadio(component) {
    this.get('radios').addObject(component);
  }
});
