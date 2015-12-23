import Ember from 'ember';
import layout from '../templates/components/mdl-checkbox';

import RippleMixin from '../mixins/ripple-mixin';

const CssClasses_ = MaterialCheckbox.prototype.CssClasses_;

/* global MaterialRadio */
export default Ember.Component.extend(RippleMixin, {
  layout: layout,
  classNames: ['mdl-checkbox', CssClasses_.IS_UPGRADED],
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
