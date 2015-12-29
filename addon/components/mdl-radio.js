import Ember from 'ember';
import layout from '../templates/components/mdl-radio';
import RippleUtil from '../util/ripple';

const CssClasses_ = {
  IS_FOCUSED: 'is-focused',
  IS_DISABLED: 'is-disabled',
  IS_CHECKED: 'is-checked',
  IS_UPGRADED: 'is-upgraded',
  JS_RADIO: 'mdl-js-radio',
  RADIO_BTN: 'mdl-radio__button',
  RADIO_OUTER_CIRCLE: 'mdl-radio__outer-circle',
  RADIO_INNER_CIRCLE: 'mdl-radio__inner-circle',
  RIPPLE_EFFECT: 'mdl-js-ripple-effect',
  RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
  RIPPLE_CONTAINER: 'mdl-radio__ripple-container',
  RIPPLE_CENTER: 'mdl-ripple--center',
  RIPPLE: 'mdl-ripple'
};

/* global MaterialRadio */
export default Ember.Component.extend({
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
  },
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
