import Ember from 'ember';
import layout from '../templates/components/mdl-layout-content';
import LayoutComponent from './mdl-layout-inner';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['mdl-layout__content'],
  _layoutComponent: Ember.computed(function () {
    return this.nearestOfType(LayoutComponent);
  }),
  didInsertElement() {
    if (this.get('_layoutComponent').get('mode') === 'waterfall') {

      this.get('element').addEventListener('scroll',
          this.contentScrollHandler_.bind(this));
    }
  },
  contentScrollHandler_() {
    var header_ = this.get('_layoutComponent').get('headerComponent');
    
    if (header_.get('animating')) {
      return;
    }

    if (this.get('element').scrollTop > 0 && !header_.get('isCompact')) {
      header_.set('castingShadow', true);
      header_.set('isCompact', true);
      header_.set('animating', true);
    } else if (this.get('element').scrollTop <= 0 &&
        header_.get('isCompact')) {
      header_.set('castingShadow', false);
      header_.set('isCompact', false);
      header_.set('animating', true);
    }
  }
});
