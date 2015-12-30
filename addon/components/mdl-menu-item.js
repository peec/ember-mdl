import Ember from 'ember';
import layout from '../templates/components/mdl-menu-item';
import RippleUtil from '../util/ripple';

import MdlMenu from './mdl-menu';


const Keycodes_ = {
  ENTER: 13,
  ESCAPE: 27,
  SPACE: 32,
  UP_ARROW: 38,
  DOWN_ARROW: 40
};

const MdlMenuItem = Ember.Component.extend({
  layout: layout,
  Keycodes_: Keycodes_,
  tagName: 'li',
  _routing: Ember.inject.service('-routing'),
  tabindex: -1,
  CssClasses_: {
    ITEM_RIPPLE_CONTAINER: 'mdl-menu__item-ripple-container',
    RIPPLE_EFFECT: 'mdl-js-ripple-effect',
    RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
    RIPPLE: 'mdl-ripple'
  },
  attributeBindings: ['tabindex', 'disabled'],
  classNames: ['mdl-menu__item'],
  didInsertElement() {
    var item = this.get('element');


    var rippleContainer = document.createElement('span');
    rippleContainer.classList.add(this.CssClasses_.ITEM_RIPPLE_CONTAINER);

    var ripple = document.createElement('span');
    ripple.classList.add(this.CssClasses_.RIPPLE);
    rippleContainer.appendChild(ripple);

    item.appendChild(rippleContainer);
    item.classList.add(this.CssClasses_.RIPPLE_EFFECT);
    new RippleUtil(item);
  },
  click(e) {
    if (this.get('disabled')) {
      e.preventDefault();
      return;
    }
    this.sendAction('action', this.get('attrs'), e);
    if (this.get('params')) {
      var routing = this.get('_routing');
      var route = this.get('params')[0];
      var params = this.get('params').slice(1);

      routing.transitionTo(route, params);
    }
  },
  keyDown(jqEvt) {
    var evt = jqEvt.originalEvent;
    var currentIndex = this.get('menuContainer').get('currentIndex');
    var menuSize = this.get('menuContainer').get('enabledMenuItems').length;
    if (evt.keyCode === this.Keycodes_.UP_ARROW) {
      evt.preventDefault();
      if (currentIndex > 0) {
        this.get('menuContainer').set('currentIndex', currentIndex - 1);
      } else {
        this.get('menuContainer').set('currentIndex', menuSize - 1);
      }
    } else if (evt.keyCode === this.Keycodes_.DOWN_ARROW) {
      evt.preventDefault();
      if (menuSize > currentIndex + 1) {
        this.get('menuContainer').set('currentIndex', currentIndex + 1);
      } else {
        this.get('menuContainer').set('currentIndex', 0);
      }
    } else if (evt.keyCode === this.Keycodes_.SPACE ||
        evt.keyCode === this.Keycodes_.ENTER) {
      evt.preventDefault();
      // Send mousedown and mouseup to trigger ripple.
      var e = new MouseEvent('mousedown');
      evt.target.dispatchEvent(e);
      e = new MouseEvent('mouseup');
      evt.target.dispatchEvent(e);
      // Send click.
      evt.target.click();
    } else if (evt.keyCode === this.Keycodes_.ESCAPE) {
      evt.preventDefault();
      this.get('menuContainer').hide();
    }
  },
  init() {
    this._super(...arguments);
    this.get('menuContainer').registerMenuItem(this);
  },
  menuContainer: Ember.computed(function () {
    return this.nearestOfType(MdlMenu);
  })
});

MdlMenuItem.reopenClass({
  positionalParams: 'params'
});

export default MdlMenuItem;