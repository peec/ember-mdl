import Ember from 'ember';
import layout from '../templates/components/mdl-radio';

import RippleMixin from '../mixins/ripple-mixin';

const CssClasses_ = MaterialRadio.prototype.CssClasses_;

/* global MaterialRadio */
export default Ember.Component.extend(RippleMixin, {
  layout: layout,
  classNames: ['mdl-radio', CssClasses_.IS_UPGRADED],
  classNameBindings: [
      'checked:is-checked',
  ],
  tagName: 'label',
  attributeBindings: ['controlId:for'],
  CssClasses: CssClasses_,

  controlId: Ember.computed(function () {
    return this.get('elementId') + '_control';
  }),


  currentName: Ember.computed('name', 'group.name', function () {
    return this.get('name') || (this.get('group') && this.get('group').get('name'));
  }),

  init() {
    this._super(...arguments);
    if (this.get('group')) {
      this.get('group').registerRadio(this);
    }
  },

  mouseUp() {
    this.toggleProperty('checked');
    var group = this.get('group');
    if (group) {
      group.uncheckAllExcept(this);
    }
  }


});
