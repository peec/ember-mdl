import Ember from 'ember';
import layout from '../templates/components/mdl-badge';

// <span class="mdl-badge" data-badge="4">Inbox</span>
export default Ember.Component.extend({
  layout: layout,
  tagName: 'span',
  classNames: ['mdl-badge'],
  classNameBindings: ['icon:material-icons'],
  attributeBindings: ['data-badge'],
  'data-badge': Ember.computed.alias('badge')
});
