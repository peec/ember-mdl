import Ember from 'ember';
import layout from '../templates/components/mdl-switch';
import RippleUtil from '../util/ripple';


const CssClasses_ = {
  INPUT: 'mdl-switch__input',
  TRACK: 'mdl-switch__track',
  THUMB: 'mdl-switch__thumb',
  FOCUS_HELPER: 'mdl-switch__focus-helper',
  RIPPLE_EFFECT: 'mdl-js-ripple-effect',
  RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
  RIPPLE_CONTAINER: 'mdl-switch__ripple-container',
  RIPPLE_CENTER: 'mdl-ripple--center',
  RIPPLE: 'mdl-ripple',
  IS_FOCUSED: 'is-focused',
  IS_DISABLED: 'is-disabled',
  IS_CHECKED: 'is-checked'
};

/* global MaterialRadio */
export default Ember.Component.extend({
  layout: layout,
  classNames: ['mdl-switch', 'is-upgraded',],
  classNameBindings: [
    'checked:is-checked',
  ],
  ripple: true,
  tagName: 'label',
  attributeBindings: ['controlId:for'],
  CssClasses: CssClasses_,

  controlId: Ember.computed(function () {
    return this.get('elementId') + '_control';
  }),
  didInsertElement() {
    if (this.get('ripple')) {
      this.get('element').classList.add(
          CssClasses_.RIPPLE_IGNORE_EVENTS);
      this.rippleContainerElement_ = document.createElement('span');
      this.rippleContainerElement_.classList.add(
          CssClasses_.RIPPLE_CONTAINER);
      this.rippleContainerElement_.classList.add(CssClasses_.RIPPLE_EFFECT);
      this.rippleContainerElement_.classList.add(CssClasses_.RIPPLE_CENTER);
      this.rippleContainerElement_.addEventListener('mouseup', this.boundMouseUpHandler);

      var ripple = document.createElement('span');
      ripple.classList.add(CssClasses_.RIPPLE);

      this.rippleContainerElement_.appendChild(ripple);
      this.get('element').appendChild(this.rippleContainerElement_);
      new RippleUtil(this.get('element'));
      new RippleUtil(this.rippleContainerElement_);
    }
  }


});
