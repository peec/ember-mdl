import Ember from 'ember';
import layout from '../templates/components/mdl-checkbox';
import RippleUtil from '../util/ripple';

const Constant_ = {
  TINY_TIMEOUT: 0.001
};

const CssClasses_ = {
  INPUT: 'mdl-checkbox__input',
  BOX_OUTLINE: 'mdl-checkbox__box-outline',
  FOCUS_HELPER: 'mdl-checkbox__focus-helper',
  TICK_OUTLINE: 'mdl-checkbox__tick-outline',
  RIPPLE_EFFECT: 'mdl-js-ripple-effect',
  RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
  RIPPLE_CONTAINER: 'mdl-checkbox__ripple-container',
  RIPPLE_CENTER: 'mdl-ripple--center',
  RIPPLE: 'mdl-ripple',
  IS_FOCUSED: 'is-focused',
  IS_DISABLED: 'is-disabled',
  IS_CHECKED: 'is-checked',
  IS_UPGRADED: 'is-upgraded'
};

/* global MaterialRadio */
export default Ember.Component.extend({
  layout: layout,
  classNames: ['mdl-checkbox', CssClasses_.IS_UPGRADED],
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
  onMouseUp_ (event) {
    window.setTimeout(function() {
      this.$().find('input').blur();
    }.bind(this), /** @type {number} */ (Constant_.TINY_TIMEOUT));
  },
  didInsertElement() {
    if (this.get('ripple')) {

      this.get('element').classList.add(CssClasses_.RIPPLE_IGNORE_EVENTS);
      this.rippleContainerElement_ = document.createElement('span');
      this.rippleContainerElement_.classList.add(CssClasses_.RIPPLE_CONTAINER);
      this.rippleContainerElement_.classList.add(CssClasses_.RIPPLE_EFFECT);
      this.rippleContainerElement_.classList.add(CssClasses_.RIPPLE_CENTER);
      this.boundRippleMouseUp = this.onMouseUp_.bind(this);
      this.rippleContainerElement_.addEventListener('mouseup', this.boundRippleMouseUp);

      var ripple = document.createElement('span');
      ripple.classList.add(CssClasses_.RIPPLE);

      this.rippleContainerElement_.appendChild(ripple);
      this.get('element').appendChild(this.rippleContainerElement_);
      new RippleUtil(this.get('element'));
      new RippleUtil(this.rippleContainerElement_);
    }
  }


});
