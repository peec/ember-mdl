import Ember from 'ember';
import layout from '../templates/components/mdl-textfield';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['mdl-textfield', 'is-upgraded'],
  rows: 3,
  expand: false,
  type: 'text',
  classNameBindings: [
      'isFocus:is-focused',
      'isDirty:is-dirty',
      'inputHasError:is-invalid',
      'floating:mdl-textfield--floating-label',
      'expand:mdl-textfield--expandable'
  ],

  controlId: Ember.computed(function () {
    return this.get('elementId') + '_control';
  }),

  focusIn() {
    this.set('isFocus', true);
  },

  focusOut() {
    this.set('isFocus', false);
  },

  isDirty: Ember.computed('value', function () {
    return !!this.get('value');
  }),

  actions: {
    checkValid(val, e) {
      this.set('inputHasError', !e.target.validity.valid);
    },
    focusInput() {
      this.$().find('input').focus();
    }
  }


});
