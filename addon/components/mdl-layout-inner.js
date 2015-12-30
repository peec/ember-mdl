import Ember from 'ember';
import layout from '../templates/components/mdl-layout-inner';
import LayoutDrawerComponent from './mdl-layout-drawer';
import LayoutHeaderComponent from './mdl-layout-header';
import LayoutContainerComponent from './mdl-layout';

var Constant_ = {
  MAX_WIDTH: '(max-width: 1024px)',
  TAB_SCROLL_PIXELS: 100,

  MENU_ICON: '&#xE5D2;',
  CHEVRON_LEFT: 'chevron_left',
  CHEVRON_RIGHT: 'chevron_right'
};

/*global window*/

export default Ember.Component.extend({
  layout: layout,
  classNames: ['mdl-layout', 'is-upgraded'],
  classNameBindings: [
      'hasDrawer:has-drawer',
      'headerComponent.fixed:mdl-layout--fixed-header',
      'drawerComponent.fixed:mdl-layout--fixed-drawer',
      'smallScreen:is-small-screen'
  ],
  drawerOpen: false,
  isSeamedMode: Ember.computed.equal('mode', 'seamed'),
  isWaterfallMode: Ember.computed.equal('mode', 'waterfall'),
  isScrollMode: Ember.computed.equal('mode', 'scroll'),
  isStandardMode: Ember.computed.equal('mode', 'standard'),


  init() {
    this._super(...arguments);
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.get('containerComponent').get('_subComponents').pushObject(this);
    });
  },
  containerComponent: Ember.computed(function () {
    return this.nearestOfType(LayoutContainerComponent);
  }),
  registerComponent(component) {
    this.get('containerComponent').get('_subComponents').pushObject(component);
  },
  hasDrawer: Ember.computed('containerComponent._subComponents.[]', function () {
    return this.get('containerComponent').get('_subComponents').filter(a => a instanceof LayoutDrawerComponent).length > 0;
  }),
  drawerComponent: Ember.computed('containerComponent._subComponents.[]', function () {
    return this.get('containerComponent').get('_subComponents').filter(a => a instanceof LayoutDrawerComponent)[0];
  }),
  headerComponent: Ember.computed('containerComponent._subComponents.[]', function () {
    return this.get('containerComponent').get('_subComponents').filter(a => a instanceof LayoutHeaderComponent)[0];
  }),
  actions: {
    closeDrawer() {
      this.set('drawerOpen', false);
    },
    toggleMenu() {
      this.toggleProperty('drawerOpen');
    }
  },
  didInsertElement() {

    this.screenSizeMediaQuery_ = window.matchMedia(
        /** @type {string} */ (Constant_.MAX_WIDTH));
    this.screenSizeMediaQuery_.addListener(this.screenSizeHandler_.bind(this));
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.screenSizeHandler_();
    });
  },

  screenSizeHandler_() {
    if (this.screenSizeMediaQuery_.matches) {
      console.log('-small-screen');
      this.set('smallScreen', true);
    } else {
      this.set('smallScreen', false);
      // Collapse drawer (if any) when moving to a large screen size.
      if (this.get('drawerComponent')) {
        this.set('drawerOpen', false);
      }
    }
  }
});
