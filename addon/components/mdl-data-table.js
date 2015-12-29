import Ember from 'ember';
import layout from '../templates/components/mdl-data-table';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'table',
  classNames: ['mdl-data-table']
});
