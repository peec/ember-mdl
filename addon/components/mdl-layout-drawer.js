import Ember from 'ember';
import layout from '../templates/components/mdl-layout-drawer';
import LayoutComponent from './mdl-layout-inner';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['mdl-layout__drawer'],
  classNameBindings: [
      'isOpen:is-visible',
      'largeScreen:mdl-layout--large-screen-only',
      'smallScreen:mdl-layout--small-screen-only'
  ],
  _layoutComponent: Ember.computed(function () {
    return this.nearestOfType(LayoutComponent);
  }),
  init() {
    this._super(...arguments);
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.get('_layoutComponent').registerComponent(this);
    });
  },
  isOpen: Ember.computed.alias('_layoutComponent.drawerOpen')
});
