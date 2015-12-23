import Ember from 'ember';
import layout from '../templates/components/mdl-icon-toggle';

import RippleMixin from '../mixins/ripple-mixin';

const CssClasses_ = MaterialIconToggle.prototype.CssClasses_;

/* global MaterialRadio */
export default Ember.Component.extend(RippleMixin, {
  layout: layout,
  classNames: ['mdl-icon-toggle', 'is-upgraded'],
  classNameBindings: [
    'checked:is-checked',
  ],
  tagName: 'label',
  attributeBindings: ['controlId:for'],
  CssClasses: CssClasses_,

  controlId: Ember.computed(function () {
    return this.get('elementId') + '_control';
  })


});
