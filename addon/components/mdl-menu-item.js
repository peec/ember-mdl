import Ember from 'ember';
import layout from '../templates/components/mdl-menu-item';
import RippleUtil from '../util/ripple';

const MdlMenuItem = Ember.Component.extend({
  layout: layout,
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
  }
});

MdlMenuItem.reopenClass({
  positionalParams: 'params'
});

export default MdlMenuItem;