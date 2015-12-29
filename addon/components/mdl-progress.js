import Ember from 'ember';
import layout from '../templates/components/mdl-progress';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['mdl-progress', 'is-upgraded'],
  classNameBindings: [
      'indeterminate:mdl-progress__indeterminate'
  ],
  indeterminate: false,
  buffer: 100,
  progress: 0,

  progressbar: Ember.computed('progress', function () {
    return new Ember.Handlebars.SafeString(`width: ${this.get('progress')}%;`);
  }),
  auxbar: Ember.computed('buffer', function () {
    var p = 100 - this.get('buffer');
    return new Ember.Handlebars.SafeString(`width: ${p}%;`);
  }),
  bufferbar: Ember.computed('buffer', function () {
    return new Ember.Handlebars.SafeString(`width: ${this.get('buffer')}%;`);
  })

});
