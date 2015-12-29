import Ember from 'ember';
import layout from '../templates/components/mdl-slider';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['mdl-slider__container'],
  min: 0,
  max: 100,
  tabindex: 0,

  isLowestValue: Ember.computed('value', 'min', function () {
    return parseInt(this.get('value'), 10) === parseInt(this.get('min'), 10);
  }),

  fraction: Ember.computed('value', 'min', 'max', function () {
    return ((this.get('value') || 0) - this.get('min')) / (this.get('max') - this.get('min'));
  }),

  lowerStyle: Ember.computed('value', function () {
    var fraction = this.get('fraction');
    return new Ember.Handlebars.SafeString(`flex: ${fraction}`);
  }),
  upperStyle: Ember.computed('value', function () {
    var fraction = 1 - this.get('fraction');
    return new Ember.Handlebars.SafeString(`flex: ${fraction}`);
  }),

  mouseUp(event) {
    event.target.blur();
  }

});
