import Ember from 'ember';
import layout from '../templates/components/mdl-layout-header';
import LayoutComponent from './mdl-layout-inner';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['mdl-layout__header'],
  classNameBindings: [
      'animating:is-animating',
      'isCompact:is-compact',
      'castingShadow:is-casting-shadow',
      '_layoutComponent.isSeamedMode:mdl-layout__header--seamed',
      '_layoutComponent.isWaterfallMode:mdl-layout__header--waterfall',
      '_layoutComponent.isScrollMode:mdl-layout__header--scroll',
      'transparent:mdl-layout__header--transparent'

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
  castingShadow: Ember.computed('_layoutComponent.mode', function () {
    return this.get('_layoutComponent.mode') === 'standard';
  }),
  showDrawerButton: Ember.computed.alias('_layoutComponent.hasDrawer'),
  actions: {
    toggleMenu() {
      this.get('_layoutComponent').toggleProperty('drawerOpen');
    }
  },
  headerTransitionEndHandler_() {
    this.set('animating', false);
  },
  didInsertElement() {
    var lC = this.get('_layoutComponent');

    if (lC.get('isSeamedMode')) {
      this.get('element').addEventListener('transitionend',
          this.headerTransitionEndHandler_.bind(this));
    }


  },


});
