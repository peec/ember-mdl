import Ember from 'ember';
import layout from '../templates/components/mdl-switch';

import RippleMixin from '../mixins/ripple-mixin';

const CssClasses_ = MaterialSwitch.prototype.CssClasses_;

/* global MaterialRadio */
export default Ember.Component.extend(RippleMixin, {
  layout: layout,
  classNames: ['mdl-switch', 'is-upgraded',],
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
