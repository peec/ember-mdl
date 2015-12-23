import Ember from 'ember';
import layout from '../templates/components/mdl-button';
import RippleMixin from '../mixins/ripple-mixin';


export default Ember.Component.extend(RippleMixin, {
  tagName: 'button',
  layout: layout,
  classNames:  ['mdl-button'],
  classNameBindings: [
      'fab:mdl-button--fab',
      'colored:mdl-button--colored',
      'raised:mdl-button--raised',
      'accent:mdl-button--accent'
  ],
  buttonBlurHandler(event) {
    if (event) {
      this.$().blur();
    }
  },
  mouseUp(event) {
    this.buttonBlurHandler(event);
  },
  mouseLeave(event) {
    this.buttonBlurHandler(event);
  }
});
